import { router, usePage } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'
import { RequestPayload, VisitHelperOptions } from '@inertiajs/core'

type Query = string | number | boolean | Query[] | undefined
type QueryObject = Record<string, Query>

const castValue = (value: unknown): Query => {
  if (Array.isArray(value)) return value.map(castValue)

  if (typeof value !== 'string') return value as Query

  if (value === 'true') return true
  if (value === 'false') return false
  if (value.trim() !== '' && /^-?\d+(\.\d+)?$/.test(value)) return Number(value)

  return value
}

export const useSearchParams = () => {
  const { url } = usePage()

  const [pathname, search] = useMemo(() => {
    const [path, qs = ''] = url.split('?')
    return [path || '', qs]
  }, [url])

  const qs = useMemo(() => new URLSearchParams(search), [search])

  /**
   * Parses the query parameters from the URL and returns them as an object.
   * Supports both single and array query parameters. For example, `tags[]=1&tags[]=2` will be parsed as `{ tags: [1, 2] }`.
   *
   * @returns An object representing the query parameters, where keys are parameter names and values are their corresponding values (string, number, boolean, array, or undefined).
   *
   * @example
   * // For URL: /search?query=example&page=2&tags[]=1&tags[]=2
   * const searchParams = useSearchParams();
   * console.log(searchParams.query);
   * // Output: { query: 'example', page: 2, tags: [1, 2] }
   *
   * // For URL: /search?archived=true&count=10
   * const searchParams = useSearchParams();
   * console.log(searchParams.query);
   * // Output: { archived: true, count: 10 }
   */
  const query = useMemo(() => {
    const entries: QueryObject = {}

    for (const [key, value] of qs.entries()) {
      const isArrayQuery = key.endsWith('[]')

      if (isArrayQuery) {
        const arrayKey = key.slice(0, -2)
        const current = entries[arrayKey]

        if (Array.isArray(current)) {
          entries[arrayKey] = [...current, castValue(value)]
        } else {
          entries[arrayKey] = [castValue(value)]
        }
      } else {
        entries[key] = castValue(value)
      }
    }

    return entries
  }, [qs])

  /**
   * Retrieves the value of a specific query parameter by its key.
   *
   * @param key The name of the query parameter to retrieve.
   * @returns The value of the specified query parameter, which can be a string, number, boolean, array, or undefined if the parameter does not exist.
   *
   * @example
   * // For URL: /search?query=example&page=2
   * const searchParams = useSearchParams();
   * console.log(searchParams.get('query')); // Output: 'example'
   * console.log(searchParams.get('page')); // Output: 2
   * console.log(searchParams.get('nonexistent')); // Output: undefined
   */
  const get = useCallback(
    (key: string) => {
      return query[key]
    },
    [query]
  )

  /**
   * Sets the search parameters and navigates to the specified path.
   * Defaults to the current path if no path is provided, and defaults to preserving state and replacing the current history entry.
   *
   * This function does not replace the existing query parameters but merges them
   * with the new ones provided in the payload.
   *
   * For replacing the entire query parameters, use the `reset` function instead.
   *
   * @param payload An object containing the query parameters to set.
   * @param path The URL path to navigate to (default is the current path).
   * @param options Additional options for the visit (e.g., preserveState, replace).
   *
   * @example
   * ```tsx
   * const searchParams = useSearchParams();
   *
   * // To set new query parameters to the current page
   * searchParams.set({ search: 'example', page: 2 });
   *
   * // To set search parameters and navigate to a different page
   * searchParams.set({ search: 'example' }, '/search');
   *
   * // To set search parameters with additional options
   * searchParams.set({ search: 'example' }, '', { preserveState: true });
   * ```
   */
  const set = useCallback(
    <T extends RequestPayload>(payload: T, path = '', options: VisitHelperOptions<T> = {}) => {
      router.get(
        path || pathname,
        { ...query, ...payload },
        { preserveState: true, replace: true, ...options }
      )
    },
    [query, pathname]
  )

  /**
   * Resets the search parameters to the specified payload and navigates to the specified path.
   * This function replaces all existing query parameters with the new ones provided in the payload.
   * Defaults to the current path if no path is provided, and defaults to preserving state and replacing the current history entry.
   *
   * @param payload An object containing the query parameters to set.
   * @param path The URL path to navigate to (default is the current path).
   * @param options Additional options for the visit (e.g., preserveState, replace).
   *
   * @example:
   * ```tsx
   * const searchParams = useSearchParams();
   *
   * // To reset query parameters to the current page
   * searchParams.reset({ search: 'example', page: 1 });
   */
  const reset = useCallback(
    <T extends RequestPayload>(payload: T, path = '', options: VisitHelperOptions<T> = {}) => {
      router.get(path || pathname, payload, { preserveState: true, replace: true, ...options })
    },
    [pathname]
  )

  /**
   * Clears all search parameters and navigates to the specified path.
   * Defaults to the current path if no path is provided, and defaults to preserving state and replacing the current history entry.
   *
   * @param path The URL path to navigate to (default is the current path).
   * @param options Additional options for the visit (e.g., preserveState, replace).
   *
   * @example
   * ```tsx
   * const searchParams = useSearchParams();
   *
   * // To clear all query parameters on the current page
   * searchParams.clear();
   *
   * // To clear all query parameters and navigate to a different page
   * searchParams.clear('/search');
   *
   * // To clear all query parameters with additional options
   * searchParams.clear('', { preserveState: true });
   * ```
   */
  const clear = useCallback(
    (path = '', options: VisitHelperOptions = {}) => {
      router.get(path || pathname, {}, { preserveState: true, replace: true, ...options })
    },
    [pathname]
  )

  return {
    query,
    get,
    set,
    reset,
    clear,
  }
}
