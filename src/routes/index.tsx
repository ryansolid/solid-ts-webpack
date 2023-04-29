import { lazy } from 'solid-js';
import { Routes, Route, Navigate, useNavigate, useLocation } from '@solidjs/router';

const Home = lazy(() => import('../views/HomePage'));
const About = lazy(() => import('../views/AboutPage'));

export default () => (
    <Routes>
        {/* Redirect to home */}
        <Route
            path="/"
            element={<Navigate href="/home" />}
        />
        <Route
            path="/home"
            component={Home}
        />
        <Route
            path="/about"
            component={About}
        />
    </Routes>
);
