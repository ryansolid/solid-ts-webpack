import { lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

const Home = lazy(() => import('../views/HomePage'));

export default () => (
    <Routes>
        <Route path="/" component={Home} />
    </Routes>
);
