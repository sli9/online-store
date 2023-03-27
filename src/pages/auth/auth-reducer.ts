import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../apiFirebase/FirebaseConfig";

type UserType = {
    uid: string
    displayName: string
    email: string
    photoURL: string
}

export const login = createAsyncThunk<UserType, undefined, { rejectValue: string }>
('auth/login', async (data, thunkAPI) => {
    try {
        const res = await authAPI.login()
        const {uid, displayName, email, photoURL} = res.user
        return {uid, displayName, email, photoURL} as UserType
    } catch (err) {
        console.error(err)
        const knownError = err as Error
        return thunkAPI.rejectWithValue(knownError.message)
    }
})
export const logout = createAsyncThunk('auth/logout', async (data, thunkAPI) => {
    try {
        await authAPI.logout()
        return
    } catch (err) {
        console.error(err)
        const knownError = err as Error
        return thunkAPI.rejectWithValue(knownError.message)
    }
})
const slice = createSlice({
    name: 'auth',
    initialState: {
        user: {} as UserType,
        isAuth: false,
    },
    reducers: {
        setIsAuth(state, action: PayloadAction<{ value: boolean }>) {
            state.isAuth = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            return {user: action.payload, isAuth: true}
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isAuth = false
        })
    }
})

export const authReducer = slice.reducer
export const {setIsAuth} = slice.actions

