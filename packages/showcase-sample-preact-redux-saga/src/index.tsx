/** @jsx h */
import { h, render } from "preact";
import { useCallback } from "preact/hooks";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createAppStore, increment } from "./ducks";

const mountPoint = document.querySelector(".app");
const store = createAppStore();

const App = () => {
  const count = useSelector<number, number>(state => state);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  return (
    <div>
      <p>count {count}</p>
      <button onClick={onClick}>Increment</button>
    </div>
  );
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountPoint
);
