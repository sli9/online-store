import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {filterReducer} from "./slices/filters-slice";
import {authReducer} from "./slices/auth-slise";
import {shopReducer} from "./slices/shop-slice";

const rootReducer = combineReducers({
    auth: authReducer,
    shop: shopReducer,
    filter: filterReducer,
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