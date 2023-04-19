import React, {FC} from "react"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import styles from "./Categories.module.scss"

type CategoriesPropsType = {
    activeCategory: CategoriesType
    onClickHandler: (category: CategoriesType) => void
}
export type CategoriesType =
    'all'
    | 'sport'
    | 'tourer'
    | 'sport-tour'
    | 'cruiser'
    | 'tour-enduro'
    | 'street'

export const Categories: FC<CategoriesPropsType> = ({activeCategory, onClickHandler}) => {
    const categories: CategoriesType[] = ['all', 'sport', 'tourer', 'sport-tour', 'cruiser', 'tour-enduro', 'street']

    return <Stack className={styles.categoriesGroup} direction={"row"} spacing={1}>
        {categories.map((c, index) => (<Chip key={index}
                                             label={c}
                                             variant={activeCategory === categories[index] ? "filled" : "outlined"}
                                             size={activeCategory === categories[index] ? "medium" : "small"}
                                             onClick={() => {
                                                 onClickHandler(c)
                                             }}
        />))}
    </Stack>
}