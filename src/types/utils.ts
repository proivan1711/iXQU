export type ToUnknown<T> = {
  [K in keyof T]: unknown;
};
