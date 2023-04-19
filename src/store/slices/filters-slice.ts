import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategoriesType} from "../../components/categories";

type FilterType = {
    category: CategoriesType
    sortIndex: string
}

const slice = createSlice({
    name: 'filter',
    initialState: {category: 'all', sortIndex: ''} as FilterType,
    reducers: {
        filterByCategory(state, action: PayloadAction<{ value: CategoriesType }>) {
            state.category = action.payload.value
        },
        setSortIndex(state, action: PayloadAction<{ value: string }>) {
            state.sortIndex = action.payload.value
        },
    },
})

export const {filterByCategory, setSortIndex} = slice.actions
export const filterReducer = slice.reducer