/**
 * @description 路由守卫组件
 */

import { Navigate, Outlet } from '@solidjs/router';

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

/**
 * 路由守卫
 * @param props 路由守卫属性
 * @returns 元素
 */
const RouteGuard = (props: GuardedRouteProps) => {
    return <>{props.isRouteAccessible ? <Outlet /> : <Navigate href={props.redirectRoute as string} />}</>;
};

export default RouteGuard;
