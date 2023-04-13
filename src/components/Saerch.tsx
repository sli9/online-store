import React from "react"
import {styled} from "@mui/material/styles";
import TextField from '@mui/material/TextField'

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
    return <SearchInput label="Search moto..." id="custom-css-outlined-input"
                        size={'small'}/>
}