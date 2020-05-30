import { createState, createContext, useContext, Component } from "solid-js";

type CounterStore = [
  { count: number },
  { increment?: () => void; decrement?: () => void }
];

const CounterContext = createContext<CounterStore>([{ count: 0 }, {}]);

export const CounterProvider: Component<{ count: number }> = props => {
  const [state, setState] = createState({ count: props.count || 0 }),
    store: CounterStore = [
      state,
      {
        increment() {
          setState("count", c => c + 1);
        },
        decrement() {
          setState("count", c => c - 1);
        }
      }
    ];

  return (
    <CounterContext.Provider value={store}>
      {props.children}
    </CounterContext.Provider>
  );
};

export function useCounter() {
  return useContext(CounterContext);
}
