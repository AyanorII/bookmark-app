import Bookmark from '#models/bookmark'
import Tag from '#models/tag'
import { type UpdateBookmarkValidator, type CreateBookmarkValidator } from '#validators/bookmark'
import db from '@adonisjs/lucid/services/db'
import urlMetadata from 'url-metadata'
import { type Data } from '../../.adonisjs/client/data.js'
import { type TransactionClientContract } from '@adonisjs/lucid/types/database'
import string from '@adonisjs/core/helpers/string'

export type BookmarkListFilters = {
  archived?: boolean
  tags?: number[]
  search?: string
  sort?: 'added' | 'visited' | 'views'
  pinned?: boolean
}

export class BookmarkService {
  static async listForUser(userId: number, filters: BookmarkListFilters = {}) {
    const query = Bookmark.query()
      .where('user_id', userId)
      .orderBy('is_pinned', 'desc')
      .preload('tags')

    if (typeof filters.archived === 'boolean') {
      query.andWhere('is_archived', filters.archived)
    }

    if (filters.tags?.length) {
      query.whereHas('tags', (tagsQ) => tagsQ.whereIn('tags.id', filters.tags!))
    }

    if (filters.search) {
      query.andWhere('title', 'like', `%${filters.search}%`)
    }

    if (filters.sort) {
      switch (filters.sort) {
        case 'added': {
          query.orderBy('created_at', 'desc')
          break
        }

        case 'visited': {
          query.orderBy('last_viewed_at', 'desc')
          break
        }

        case 'views': {
          query.orderBy('view_count', 'desc')
          break
        }
      }
    }

    return query
  }

  static async createBookmark(userId: number, data: CreateBookmarkValidator) {
    const metadata = await this.getURLMetadata(data.url)

    const favicon = metadata.favicons?.[0]?.href
      ? this.getFaviconURL(metadata.favicons[0].href, data.url)
      : null

    return db.transaction(async (trx) => {
      const bookmark = await Bookmark.create(
        {
          ...data,
          title: data.title || metadata.title || data.url,
          description: data.description || metadata.description,
          favicon,
          userId,
        },
        { client: trx }
      )

      if (data.tags?.length) {
        const tagIds = await this.resolveTagIds(userId, data.tags, trx)
        await bookmark.related('tags').sync(tagIds, false, trx)
        await bookmark.load('tags')
      }

      return bookmark
    })
  }

  static async updateBookmark(bookmark: Bookmark, data: UpdateBookmarkValidator) {
    return db.transaction(async (trx) => {
      bookmark.useTransaction(trx)

      if (data.url && data.url !== bookmark.url) {
        const metadata = await this.getURLMetadata(data.url)

        const favicon = metadata.favicons?.[0]?.href
          ? this.getFaviconURL(metadata.favicons[0].href, data.url)
          : null

        bookmark.favicon = favicon
      }

      const { tags, ...rest } = data

      bookmark.merge(rest)

      if (tags) {
        const tagIds = await this.resolveTagIds(bookmark.userId!, tags, trx)
        await bookmark.related('tags').sync(tagIds, true, trx)
      }

      await bookmark.load('tags')

      return bookmark
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                               Private methods                              */
  /* -------------------------------------------------------------------------- */
  /**
   * Fetches metadata for a given URL, including title, description, and favicons.
   * If fetching metadata fails, it returns default empty values to ensure bookmark
   * creation can proceed without interruption.
   * @param url The URL for which to fetch metadata.
   * @returns An object containing the title, description, and favicons of the URL.
   * @throws Will log an error if metadata fetching fails, but will not throw an exception to the caller.
   */
  private static async getURLMetadata(url: string): Promise<UrlMetadata> {
    let metadata: UrlMetadata = {
      title: '',
      description: '',
      favicons: [],
    }

    try {
      metadata = (await urlMetadata(url)) as UrlMetadata
    } catch (error) {
      console.error('Failed to fetch metadata for URL:', url, error)
      return metadata
    }

    return metadata
  }

  /**
   * Constructs a full URL for the favicon based on the provided favicon path and
   * the base URL of the bookmark. If the favicon is already an absolute URL, it returns it as is.
   * Otherwise, it attempts to construct the full URL using the origin of the base URL. If URL construction fails,
   * it logs the error and returns null.
   * @param favicon The favicon path, which can be either an absolute URL or a relative path.
   * @param baseUrl The base URL of the bookmark, used to construct the full favicon URL if the favicon is a relative path.
   * @returns The full URL of the favicon, or null if construction fails.
   */
  private static getFaviconURL(favicon: string, baseUrl: string): string | null {
    if (favicon.startsWith('http')) return favicon

    try {
      const url = new URL(baseUrl)
      return `${url.origin}${favicon.startsWith('/') ? '' : '/'}${favicon}`
    } catch (error) {
      console.error('Failed to construct favicon URL:', error)
      return null
    }
  }

  /**
   * Resolves an array of tag names to their corresponding tag IDs for a given user. If a tag does not exist, it will be created.
   * This method runs within a database transaction to ensure atomicity of tag creation and retrieval.
   * @param userId The ID of the user for whom to resolve tag IDs.
   * @param inputs An array of tag names to resolve.
   * @param trx The database transaction client to use for queries and operations.
   * @returns An array of tag IDs corresponding to the provided tag names.
   */
  private static async resolveTagIds(
    userId: number,
    inputs: (CreateBookmarkValidator | UpdateBookmarkValidator)['tags'],
    trx: TransactionClientContract
  ): Promise<Data.Tag['id'][]> {
    const tags = await Tag.fetchOrCreateMany(
      'slug',
      inputs?.map((name) => {
        return { name, slug: string.slug(name.toLowerCase()), userId }
      }) || [],
      { client: trx }
    )

    return tags.map((tag) => tag.id)
  }
}

export type UrlMetadata = {
  title: string
  description: string
  favicons: { rel: string; type: undefined; href: string; sizes: string }[]
}
