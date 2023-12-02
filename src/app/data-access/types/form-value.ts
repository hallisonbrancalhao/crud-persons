export type FormValue<T> = Partial<{
  [K in keyof T]: T[K] | null;
}>;
