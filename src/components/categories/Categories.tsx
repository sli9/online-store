import React, {useState} from "react"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import styles from "./Categories.module.scss"


export const Categories = () => {
    const categories = ['all', 'sports', 'tourer', 'sport-tour', 'cruiser', 'tour-enduro']
    const [activeCategory, setActiveCategory] = useState(0)

    return <Stack className={styles.categoriesGroup} direction={"row"} spacing={1}>
            {categories.map((c, index) => (<Chip key={index}
                                                 label={c}
                                                 variant={activeCategory === index ? "filled" : "outlined"}
                                                 size={activeCategory === index ? "medium" : "small"}
                                                 onClick={() => {setActiveCategory(index)}}
            />))}
        </Stack>
}