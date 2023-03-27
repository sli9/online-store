import {CART_ROUTE, LOGIN_ROUTE, MAIN_ROUTE} from "../utils/constants";
import {Login} from "../pages/auth/Login";
import {Cart} from "../pages/Cart";
import {FC} from "react";
import {Main} from "../pages/main/Main";

type RouteType = {
    path: string
    Component: FC
}

export const publicRoutes: Array<RouteType> = [
    {
        path: LOGIN_ROUTE,
        Component: Login,
    },
    {
        path: MAIN_ROUTE,
        Component: Main,
    },
]
export const withAuthRoutes: Array<RouteType> = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    },
    {
        path: CART_ROUTE,
        Component: Cart,
    },

]