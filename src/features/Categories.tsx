import React, {useState} from "react"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export const Categories = () => {
    const categories = ['all', 'sports', 'tourer', 'sport-tour', 'cruiser', 'tour-enduro']
    const [activeCategory, setActiveCategory] = useState(0)

    return <div style={{margin: '10px auto'}}>
        <Stack style={{alignItems: "center"}} direction={"row"} spacing={1}>
            {categories.map((c, index) => (<Chip key={index}
                                                 label={c}
                                                 variant={activeCategory === index ? "filled" : "outlined"}
                                                 size={activeCategory === index ? "medium" : "small"}
                                                 onClick={() => {setActiveCategory(index)}}
            />))}
        </Stack>
    </div>
}