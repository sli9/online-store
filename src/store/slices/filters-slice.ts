import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type FilterType = {
    categoryIndex: number
    sortIndex: string
}

const slice = createSlice({
    name: 'filter',
    initialState: {categoryIndex: 0, sortIndex: ''} as FilterType,
    reducers: {
        filterByCategory(state, action: PayloadAction<{ value: number }>) {
            state.categoryIndex = action.payload.value
        },
        setSortIndex(state, action: PayloadAction<{ value: string }>) {
            state.sortIndex = action.payload.value
        },
    },
})

export const {filterByCategory, setSortIndex} = slice.actions
export const filterReducer = slice.reducer