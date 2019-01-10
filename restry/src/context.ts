import { Block } from "./block";

export type Context = {
  [id: number]: any;
};

let nextContextId = 0;

export function createContext<T>(defaultValue: T) {
  const contextId = ++nextContextId;
  return {
    provider: (value: T, block: Block<any>) => (context: Context) =>
      block({ ...context, [contextId]: value }),
    consumer: (context: Context): T => context[contextId] || defaultValue
  };
}
