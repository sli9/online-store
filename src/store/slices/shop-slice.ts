import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {shopAPI} from "../../apiFirebase/FirebaseConfig";

export const getMoto = createAsyncThunk<ItemMotoType[], undefined, { rejectValue: string }>
('shop/getMoto', async (data, {rejectWithValue}) => {
    try {
        const res = await shopAPI.getMoto()
        if (!res) {
            return rejectWithValue(`We don't have moto`)
        }
        const filteredRes = res.docs.map((m) => ({id: m.id, ...m.data()}))
        return filteredRes as ItemMotoType[]
    } catch (err) {
        console.error(err)
        const knownError = err as Error
        return rejectWithValue(knownError.message)
    }

})

export type ItemMotoType = {
    id: string,
    title: string,
    img: string,
    type: string,
    price: number,
}

const slice = createSlice({
    name: 'shop',
    initialState: [] as Array<ItemMotoType>,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getMoto.fulfilled, (state, action) => {
            return action.payload?.map((m) => ({...m}))
        })
    }
})

export const shopReducer = slice.reducer
