import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk"
import {authReducer} from "../components/auth/auth-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {shopReducer} from "../components/main/shop-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    shop: shopReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
//@ts-ignore
window.store = store