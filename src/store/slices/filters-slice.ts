import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategoriesType} from "../../components/categories";
import {SortType} from "../../components/Sort";

type FilterType = {
    category: CategoriesType
    sortIndex: {
        index: string
        sortBy: string
    }
}

const slice = createSlice({
    name: 'filter',
    initialState: {category: 'all', sortIndex: {index: '', sortBy: ''}} as FilterType,
    reducers: {
        filterByCategory(state, action: PayloadAction<{ value: CategoriesType }>) {
            state.category = action.payload.value
        },
        setSortIndex(state, action: PayloadAction<{ value: SortType }>) {
            state.sortIndex.index = action.payload.value.index
            state.sortIndex.sortBy = action.payload.value.sortBy
        },
    },
})

export const {filterByCategory, setSortIndex} = slice.actions
export const filterReducer = slice.reducer