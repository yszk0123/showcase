import { createStore } from "redux";

enum Type {
  INCREMENT = "INCREMENT"
}

type Action = { type: Type };

export const increment = () => ({ type: Type.INCREMENT });

const reducer = (state = 0, action: Action) => {
  switch (action.type) {
    case Type.INCREMENT:
      return state + 1;
    default:
      return state;
  }
};

export function createAppStore() {
  const store = createStore(reducer);
  return store;
}
