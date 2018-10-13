let nextContextId = 0;

const createContext = defaultValue => {
  const contextId = ++nextContextId;
  return {
    provider: (value, block) => context =>
      block({ ...context, [contextId]: value }),
    consumer: context => context[contextId] || defaultValue
  };
};

export { createContext };
