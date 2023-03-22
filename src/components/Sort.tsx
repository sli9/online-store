import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

export const Sort = () => {
    const [sortOption, setSortOption] = useState('0')

    return (
        <FormControl variant="standard" sx={{m: 1, minWidth: 120}} style={{flexDirection: 'row'}}>
            <span style={{margin: 'auto 10px'}}>Sort by:</span>
            <Select
                labelId="select-sort-label"
                id="select-sort"
                value={sortOption}
                onChange={(e: SelectChangeEvent) => {setSortOption(e.target.value)}}
            >
                <MenuItem value={0}>Price</MenuItem>
                <MenuItem value={1}>Alphabet</MenuItem>
            </Select>
        </FormControl>
    )
}