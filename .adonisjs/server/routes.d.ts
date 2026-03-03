import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'api_sessions.store': { paramsTuple?: []; params?: {} }
    'bookmarks.index': { paramsTuple?: []; params?: {} }
    'bookmarks.store': { paramsTuple?: []; params?: {} }
    'bookmarks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.togglePin': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.toggleArchive': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.incrementViewCount': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.updateTags': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api_tags.index': { paramsTuple?: []; params?: {} }
    'api_tags.store': { paramsTuple?: []; params?: {} }
    'api_tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api_tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api_sessions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'bookmarks.index': { paramsTuple?: []; params?: {} }
    'bookmarks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api_tags.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'bookmarks.index': { paramsTuple?: []; params?: {} }
    'bookmarks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api_tags.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'api_sessions.store': { paramsTuple?: []; params?: {} }
    'bookmarks.store': { paramsTuple?: []; params?: {} }
    'api_tags.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'bookmarks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.updateTags': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api_tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'bookmarks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.togglePin': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.toggleArchive': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.incrementViewCount': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api_tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'bookmarks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api_tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api_sessions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}