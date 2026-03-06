import { useMutation } from '@tanstack/react-query'
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { TuyauMutationOptionsOut } from '@tuyau/react-query'

type InferInput<T> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends TuyauMutationOptionsOut<infer I, {}, any, any> ? I : never
type InferError<T> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends TuyauMutationOptionsOut<any, infer E, any, any> ? E : never
type InferOutput<T> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends TuyauMutationOptionsOut<any, any, infer O, any> ? O : never
type InferContext<T> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends TuyauMutationOptionsOut<any, any, any, infer C> ? C : never

type UnwrapData<T> = T extends { data: infer D } ? D : T
type CallbackKeys = 'mutationFn' | 'onSuccess' | 'onError' | 'onSettled' | 'onMutate'

export type TuyauMutationOpts<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TBase extends TuyauMutationOptionsOut<any, any, any, any>,
  TErrorOverride = InferError<TBase>,
  TVariables = InferInput<TBase>,
  TData = UnwrapData<InferOutput<TBase>>,
  TContext = InferContext<TBase>,
> = Omit<UseMutationOptions<TData, TErrorOverride, TVariables, TContext>, 'mutationFn'>

export function useTuyauMutation<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TBase extends TuyauMutationOptionsOut<any, any, any, any>,
  // allow overriding the error type if you want a narrower one
  TError = InferError<TBase>,
  TVariables = InferInput<TBase>,
  TWrapped = InferOutput<TBase>,
  TData = UnwrapData<TWrapped>,
  TContext = InferContext<TBase>,
>(
  base: TBase,
  opts?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables, TContext> {
  // Strip Tuyau callbacks (typed for wrapped output)
  const { mutationFn, onSuccess, onError, onSettled, onMutate, ...rest } = base

  if (!mutationFn) {
    throw new Error('Tuyau mutationOptions() is missing mutationFn (route not generated?)')
  }

  return useMutation<TData, TError, TVariables, TContext>({
    // keep mutationKey and other non-callback options from Tuyau
    ...(rest as Omit<TBase, CallbackKeys>),

    // allow caller callbacks typed for unwrapped output
    ...opts,

    mutationFn: async (variables: TVariables, ctx) => {
      const res = await mutationFn(variables, ctx)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (res as any)?.data ?? (res as any)
    },
  })
}
