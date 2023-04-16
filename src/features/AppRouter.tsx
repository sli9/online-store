import React, {useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom"
import {publicRoutes, withAuthRoutes} from "../helpers/routes";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/constants";
import {useAppDispatch, useAppSelector} from "../store/store";
import {auth} from "../apiFirebase/FirebaseConfig";
import {onAuthStateChanged} from "firebase/auth";
import {setIsAuth} from "../store/slices/auth-slise";

export const AppRouter = ({}) => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setIsAuth({value: true}))
            }
        })
    }, [])

    return isAuth ? (
            <Routes>
                {withAuthRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                <Route path={'*'} element={<Navigate to={MAIN_ROUTE}/>}/>
            </Routes>
        ) :
        (<Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path={'*'} element={<Navigate to={LOGIN_ROUTE}/>}/>
        </Routes>)
}