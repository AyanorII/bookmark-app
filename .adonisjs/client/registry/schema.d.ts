/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'new_account.create': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
    }
  }
  'new_account.store': {
    methods: ["POST"]
    pattern: '/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
    }
  }
  'session.create': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
    }
  }
  'session.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
    }
  }
  'api_sessions.store': {
    methods: ["POST"]
    pattern: '/api/sessions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api_sessions_controller').default['store']>>>
    }
  }
  'bookmarks.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/bookmarks'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bookmarks_controller').default['index']>>>
    }
  }
  'bookmarks.store': {
    methods: ["POST"]
    pattern: '/api/bookmarks'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/bookmark').createBookmarkValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/bookmark').createBookmarkValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bookmarks_controller').default['store']>>>
    }
  }
  'bookmarks.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/bookmarks/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bookmarks_controller').default['show']>>>
    }
  }
  'bookmarks.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/bookmarks/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/bookmark').updateBookmarkValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/bookmark').updateBookmarkValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bookmarks_controller').default['update']>>>
    }
  }
  'bookmarks.destroy': {
    methods: ["DELETE"]
    pattern: '/api/bookmarks/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bookmarks_controller').default['destroy']>>>
    }
  }
  'bookmarks.togglePin': {
    methods: ["PATCH"]
    pattern: '/api/bookmarks/:id/pin'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bookmarks_controller').default['togglePin']>>>
    }
  }
  'bookmarks.toggleArchive': {
    methods: ["PATCH"]
    pattern: '/api/bookmarks/:id/archive'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bookmarks_controller').default['toggleArchive']>>>
    }
  }
  'bookmarks.incrementViewCount': {
    methods: ["PATCH"]
    pattern: '/api/bookmarks/:id/view'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bookmarks_controller').default['incrementViewCount']>>>
    }
  }
  'bookmarks.updateTags': {
    methods: ["PUT"]
    pattern: '/api/bookmarks/:id/tags'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/bookmark').updateBookmarkTagsValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/bookmark').updateBookmarkTagsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bookmarks_controller').default['updateTags']>>>
    }
  }
  'api_tags.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/tags'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['index']>>>
    }
  }
  'api_tags.store': {
    methods: ["POST"]
    pattern: '/api/tags'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/tag').createTagValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/tag').createTagValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['store']>>>
    }
  }
  'api_tags.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/tags/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/tag').createTagValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/tag').createTagValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['update']>>>
    }
  }
  'api_tags.destroy': {
    methods: ["DELETE"]
    pattern: '/api/tags/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['destroy']>>>
    }
  }
  'api_sessions.destroy': {
    methods: ["DELETE"]
    pattern: '/api/sessions/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api_sessions_controller').default['destroy']>>>
    }
  }
  'session.destroy': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
    }
  }
}
