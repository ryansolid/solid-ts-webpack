import { render } from 'solid-js/web';
import App from './App';

const injected = document.querySelector('#app');
if (injected) {
    render(() => <App />, injected as HTMLElement);
}
