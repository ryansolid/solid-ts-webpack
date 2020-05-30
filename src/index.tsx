import { render } from "solid-js/dom";
import { CounterProvider, useCounter } from "./counter-store";

const MiddleComponent = () => <NestedComponent />;

const NestedComponent = () => {
  const [counter, { increment, decrement }] = useCounter();
  return (
    <>
      <p>{counter.count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
};

const App = () => (
  <CounterProvider count={7}>
    <MiddleComponent />
  </CounterProvider>
);

render(App, document.body);
