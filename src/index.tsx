import { render } from "solid-js/dom";
import { CounterProvider, useCounter } from "./counter-store";
import "solid-styled-jsx";

const MiddleComponent = () => <NestedComponent />;

const NestedComponent = () => {
  const [counter, { increment, decrement }] = useCounter();
  return (
    <>
      <p>{counter.count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <style jsx dynamic>{`
        p {
          color: ${counter.count > 10 ? "red" : "blue"};
        }
      `}</style>
    </>
  );
};

const App = () => (
  <CounterProvider count={7}>
    <MiddleComponent />
  </CounterProvider>
);

render(App, document.body);
