import React, { useCallback } from "react";
import { render } from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createAppStore, hello, increment, incrementDebounce } from "./ducks";

const mountPoint = document.querySelector(".app");
const store = createAppStore();

const App = () => {
  const count = useSelector<number, number>(state => state);
  const dispatch = useDispatch();
  const onHello = useCallback(() => {
    dispatch(hello());
  }, [dispatch]);
  const onIncrement = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);
  const onIncrementDebounce = useCallback(() => {
    dispatch(incrementDebounce());
  }, [dispatch]);

  return (
    <div>
      <p>count {count}</p>
      <button onClick={onHello}>Hello</button>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onIncrementDebounce}>Increment (debounce)</button>
    </div>
  );
};

render(
  // @ts-ignore
  <Provider store={store}>
    <App />
  </Provider>,
  mountPoint
);
