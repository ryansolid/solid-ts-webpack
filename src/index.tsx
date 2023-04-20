import { render } from 'solid-js/web';
import { Router, hashIntegration } from '@solidjs/router';
import App from './views/App';

const injected = document.querySelector('#app');
if (injected) {
    render(() => (
        <Router source={hashIntegration()}>
            <App />
        </Router>
    ), injected);
}
