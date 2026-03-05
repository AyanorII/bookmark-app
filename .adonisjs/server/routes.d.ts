import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'github.redirect': { paramsTuple?: []; params?: {} }
    'providers.github': { paramsTuple?: []; params?: {} }
    'api_sessions.store': { paramsTuple?: []; params?: {} }
    'bookmarks.index': { paramsTuple?: []; params?: {} }
    'bookmarks.store': { paramsTuple?: []; params?: {} }
    'bookmarks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.pin': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.archive': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.view': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.tags': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.index': { paramsTuple?: []; params?: {} }
    'tags.store': { paramsTuple?: []; params?: {} }
    'tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api_sessions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'github.redirect': { paramsTuple?: []; params?: {} }
    'providers.github': { paramsTuple?: []; params?: {} }
    'bookmarks.index': { paramsTuple?: []; params?: {} }
    'bookmarks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.index': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'github.redirect': { paramsTuple?: []; params?: {} }
    'providers.github': { paramsTuple?: []; params?: {} }
    'bookmarks.index': { paramsTuple?: []; params?: {} }
    'bookmarks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.index': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'api_sessions.store': { paramsTuple?: []; params?: {} }
    'bookmarks.store': { paramsTuple?: []; params?: {} }
    'tags.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'bookmarks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.tags': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'bookmarks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.pin': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.archive': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.view': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'bookmarks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api_sessions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}