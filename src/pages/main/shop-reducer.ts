import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
    price: number
}

const slice = createSlice({
    name: 'shop',
    initialState: [] as Array<ItemMotoType>,
    reducers: {
        sortByPrice(state) {
            state.sort((a, b) => {
                return a.price - b.price
            })
        },
        sortByAlphabet(state) {
            state.sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
        },
        filterByCategory(state, action: PayloadAction<{ value: string }>) {
            debugger
            state.filter(s => s.type === action.payload.value)
        }
    },
    extraReducers: builder => {
        builder.addCase(getMoto.fulfilled, (state, action) => {
            return action.payload?.map((m) => ({...m}))
        })
    }
})

export const shopReducer = slice.reducer
export const {sortByPrice, sortByAlphabet, filterByCategory} = slice.actions