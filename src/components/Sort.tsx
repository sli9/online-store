import React, {FC} from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";

type SortPropsType = {
    sortValue: string
    onChangeHandler: (e: SelectChangeEvent) => void
}

export const Sort: FC<SortPropsType> = React.memo(function ({sortValue, onChangeHandler}) {

    return (
        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
            <InputLabel id="select-sort-label">Sort by</InputLabel>
            <Select
                labelId="select-sort-label"
                id="select-standard"
                label="Sort by"
                value={sortValue}
                onChange={(e: SelectChangeEvent) => {
                    onChangeHandler(e)
                }}
            >
                <MenuItem value={'0'}>Price <span>&#8681;</span></MenuItem>
                <MenuItem value={'1'}>Price <span> &#8679;</span></MenuItem>
                <MenuItem value={'2'}>Alphabet (A-Z)</MenuItem>
                <MenuItem value={'3'}>Alphabet (Z-A)</MenuItem>
            </Select>
        </FormControl>
    )
})