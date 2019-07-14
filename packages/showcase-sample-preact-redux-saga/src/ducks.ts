import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { call, debounce, put, takeEvery } from "redux-saga/effects";

const DEBOUNCE = 1000;

enum Type {
  HELLO = "HELLO",
  INCREMENT = "INCREMENT",
  INCREMENT_DELAY = "INCREMENT_DELAY",
  INCREMENT_DEBOUNCE = "INCREMENT_DEBOUNCE"
}

type Action = { type: Type };

export const hello = () => ({ type: Type.HELLO });
export const increment = () => ({ type: Type.INCREMENT });
export const incrementDebounce = () => ({ type: Type.INCREMENT_DEBOUNCE });

const reducer = (state = 0, action: Action) => {
  switch (action.type) {
    case Type.INCREMENT:
      return state + 1;
    default:
      return state;
  }
};

function getMessage(name: string) {
  return `Hello, ${name}!`;
}

type Saga<T = unknown> = Generator<unknown, void, T>;

function* helloSaga(): Saga<string> {
  const message = yield call(getMessage, "world");
  console.log(message);
}

function* incrementSaga(): Saga {
  yield put(increment());
}

function* incrementDebounceSaga(): Saga {
  yield debounce(DEBOUNCE, Type.INCREMENT_DEBOUNCE, incrementSaga);
}

function* saga(): Saga {
  yield takeEvery(Type.HELLO, helloSaga);
  yield* incrementDebounceSaga();
}

export function createAppStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(saga);
  return store;
}
