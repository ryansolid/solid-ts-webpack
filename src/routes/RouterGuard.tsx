/**
 * @description 路由守卫组件
 */

import { Navigate, Outlet } from '@solidjs/router';
import { JSX } from 'solid-js';

interface GuardedRouteProps {
    /**
     * Permission check for route
     * @default false
     */
    isRouteAccessible?: boolean;
    /**
     * Route to be redirected to
     * @default '/'
     */
    redirectRoute?: string;
}

export default function (props: GuardedRouteProps): JSX.Element {
    const { isRouteAccessible, redirectRoute = '' } = props;
    return isRouteAccessible ? <Outlet /> : <Navigate href={redirectRoute} />;
}
