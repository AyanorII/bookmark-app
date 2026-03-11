import type { SimplePaginatorContract } from '@adonisjs/lucid/types/querybuilder'

export type PaginationMeta = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  hasMorePages: boolean
}

export function getPaginationMeta(paginator: SimplePaginatorContract<unknown>): PaginationMeta {
  return {
    total: paginator.total,
    perPage: paginator.perPage,
    currentPage: paginator.currentPage,
    lastPage: paginator.lastPage,
    firstPage: paginator.firstPage,
    hasMorePages: paginator.hasMorePages,
  }
}
