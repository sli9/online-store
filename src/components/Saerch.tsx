import React, {useContext} from "react"
import {styled} from "@mui/material/styles";
import TextField from '@mui/material/TextField'
import {SearchContext, SearchContextType} from "../app/App";

const SearchInput = styled(TextField)({
    '& label, & label.Mui-focused': {
        paddingTop: '5px',
        color: 'orangered',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        color: '#fff',
        letterSpacing: '1.5px',
        '& fieldset': {
            borderColor: '#fff',
        },
        '&:hover fieldset': {
            border: '#fff solid 2px',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff',
        },
    },
});


export const Search = () => {
    const {searchValue, setSearchValue} = useContext(SearchContext) as SearchContextType

    return <SearchInput label="Search moto..." id="custom-css-outlined-input"
                        size={'small'}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
    />
}