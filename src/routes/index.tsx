import { lazy } from 'solid-js';
import { Routes, Route, Navigate } from '@solidjs/router';

const Home = lazy(() => import('@/views/HomePage'));
const About = lazy(() => import('@/views/AboutPage'));

export default () => (
    <Routes>
        {/* Redirect to home */}
        <Route
            path="/"
            element={<Navigate href="/home" />}
        />

        <Route path="/">
            <Route
                path="home"
                component={Home}
            />
            <Route
                path="about"
                component={About}
            />
        </Route>
    </Routes>
);
