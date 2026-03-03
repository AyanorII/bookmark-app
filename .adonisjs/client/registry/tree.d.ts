/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  apiSessions: {
    store: typeof routes['api_sessions.store']
    destroy: typeof routes['api_sessions.destroy']
  }
  bookmarks: {
    index: typeof routes['bookmarks.index']
    store: typeof routes['bookmarks.store']
    show: typeof routes['bookmarks.show']
    update: typeof routes['bookmarks.update']
    destroy: typeof routes['bookmarks.destroy']
    togglePin: typeof routes['bookmarks.togglePin']
    toggleArchive: typeof routes['bookmarks.toggleArchive']
    incrementViewCount: typeof routes['bookmarks.incrementViewCount']
  }
}
