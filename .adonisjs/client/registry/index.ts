/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'github.redirect': {
    methods: ["GET","HEAD"],
    pattern: '/github/redirect',
    tokens: [{"old":"/github/redirect","type":0,"val":"github","end":""},{"old":"/github/redirect","type":0,"val":"redirect","end":""}],
    types: placeholder as Registry['github.redirect']['types'],
  },
  'providers.github': {
    methods: ["GET","HEAD"],
    pattern: '/github/callback',
    tokens: [{"old":"/github/callback","type":0,"val":"github","end":""},{"old":"/github/callback","type":0,"val":"callback","end":""}],
    types: placeholder as Registry['providers.github']['types'],
  },
  'api_sessions.store': {
    methods: ["POST"],
    pattern: '/api/sessions',
    tokens: [{"old":"/api/sessions","type":0,"val":"api","end":""},{"old":"/api/sessions","type":0,"val":"sessions","end":""}],
    types: placeholder as Registry['api_sessions.store']['types'],
  },
  'bookmarks.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/bookmarks',
    tokens: [{"old":"/api/bookmarks","type":0,"val":"api","end":""},{"old":"/api/bookmarks","type":0,"val":"bookmarks","end":""}],
    types: placeholder as Registry['bookmarks.index']['types'],
  },
  'bookmarks.store': {
    methods: ["POST"],
    pattern: '/api/bookmarks',
    tokens: [{"old":"/api/bookmarks","type":0,"val":"api","end":""},{"old":"/api/bookmarks","type":0,"val":"bookmarks","end":""}],
    types: placeholder as Registry['bookmarks.store']['types'],
  },
  'bookmarks.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/bookmarks/:id',
    tokens: [{"old":"/api/bookmarks/:id","type":0,"val":"api","end":""},{"old":"/api/bookmarks/:id","type":0,"val":"bookmarks","end":""},{"old":"/api/bookmarks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['bookmarks.show']['types'],
  },
  'bookmarks.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/bookmarks/:id',
    tokens: [{"old":"/api/bookmarks/:id","type":0,"val":"api","end":""},{"old":"/api/bookmarks/:id","type":0,"val":"bookmarks","end":""},{"old":"/api/bookmarks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['bookmarks.update']['types'],
  },
  'bookmarks.destroy': {
    methods: ["DELETE"],
    pattern: '/api/bookmarks/:id',
    tokens: [{"old":"/api/bookmarks/:id","type":0,"val":"api","end":""},{"old":"/api/bookmarks/:id","type":0,"val":"bookmarks","end":""},{"old":"/api/bookmarks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['bookmarks.destroy']['types'],
  },
  'bookmarks.pin': {
    methods: ["PATCH"],
    pattern: '/api/bookmarks/:id/pin',
    tokens: [{"old":"/api/bookmarks/:id/pin","type":0,"val":"api","end":""},{"old":"/api/bookmarks/:id/pin","type":0,"val":"bookmarks","end":""},{"old":"/api/bookmarks/:id/pin","type":1,"val":"id","end":""},{"old":"/api/bookmarks/:id/pin","type":0,"val":"pin","end":""}],
    types: placeholder as Registry['bookmarks.pin']['types'],
  },
  'bookmarks.archive': {
    methods: ["PATCH"],
    pattern: '/api/bookmarks/:id/archive',
    tokens: [{"old":"/api/bookmarks/:id/archive","type":0,"val":"api","end":""},{"old":"/api/bookmarks/:id/archive","type":0,"val":"bookmarks","end":""},{"old":"/api/bookmarks/:id/archive","type":1,"val":"id","end":""},{"old":"/api/bookmarks/:id/archive","type":0,"val":"archive","end":""}],
    types: placeholder as Registry['bookmarks.archive']['types'],
  },
  'bookmarks.view': {
    methods: ["PATCH"],
    pattern: '/api/bookmarks/:id/view',
    tokens: [{"old":"/api/bookmarks/:id/view","type":0,"val":"api","end":""},{"old":"/api/bookmarks/:id/view","type":0,"val":"bookmarks","end":""},{"old":"/api/bookmarks/:id/view","type":1,"val":"id","end":""},{"old":"/api/bookmarks/:id/view","type":0,"val":"view","end":""}],
    types: placeholder as Registry['bookmarks.view']['types'],
  },
  'bookmarks.tags': {
    methods: ["PUT"],
    pattern: '/api/bookmarks/:id/tags',
    tokens: [{"old":"/api/bookmarks/:id/tags","type":0,"val":"api","end":""},{"old":"/api/bookmarks/:id/tags","type":0,"val":"bookmarks","end":""},{"old":"/api/bookmarks/:id/tags","type":1,"val":"id","end":""},{"old":"/api/bookmarks/:id/tags","type":0,"val":"tags","end":""}],
    types: placeholder as Registry['bookmarks.tags']['types'],
  },
  'tags.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/tags',
    tokens: [{"old":"/api/tags","type":0,"val":"api","end":""},{"old":"/api/tags","type":0,"val":"tags","end":""}],
    types: placeholder as Registry['tags.index']['types'],
  },
  'tags.store': {
    methods: ["POST"],
    pattern: '/api/tags',
    tokens: [{"old":"/api/tags","type":0,"val":"api","end":""},{"old":"/api/tags","type":0,"val":"tags","end":""}],
    types: placeholder as Registry['tags.store']['types'],
  },
  'tags.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/tags/:id',
    tokens: [{"old":"/api/tags/:id","type":0,"val":"api","end":""},{"old":"/api/tags/:id","type":0,"val":"tags","end":""},{"old":"/api/tags/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tags.update']['types'],
  },
  'tags.destroy': {
    methods: ["DELETE"],
    pattern: '/api/tags/:id',
    tokens: [{"old":"/api/tags/:id","type":0,"val":"api","end":""},{"old":"/api/tags/:id","type":0,"val":"tags","end":""},{"old":"/api/tags/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tags.destroy']['types'],
  },
  'api_sessions.destroy': {
    methods: ["DELETE"],
    pattern: '/api/sessions/:id',
    tokens: [{"old":"/api/sessions/:id","type":0,"val":"api","end":""},{"old":"/api/sessions/:id","type":0,"val":"sessions","end":""},{"old":"/api/sessions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['api_sessions.destroy']['types'],
  },
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
