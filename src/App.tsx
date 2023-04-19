import { createSignal, createMemo } from 'solid-js';
import '@/_index.scss';

export default () => {
    const [count, setCount] = createSignal<number>(0);

    function addOne(): void {
        setCount(prev => ++prev);
    }

    const doubleCount = createMemo(() => count() * 2);

    return (
        <div class="hello-world">
            <input type="button" value="add one" onClick={addOne} />
            <p class="show">{count()}</p>
            <p class="memo">{doubleCount()}</p>
        </div>
    )
};
