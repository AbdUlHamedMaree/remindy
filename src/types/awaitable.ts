export type Awaitable<T = void> = T | Promise<T>;

export type AwaitableNoop<T = void> = () => Awaitable<T>;
