declare namespace Core {
  type InputCallType<TInput, TReturn> = (input: TInput) => Promise<TReturn>;
}
