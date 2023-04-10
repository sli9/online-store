import React, {FC} from "react"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import styles from "./Categories.module.scss"

type CategoriesPropsType = {
    activeIndex: number
    onClickHandler: (index: number) => void
}

export const Categories: FC<CategoriesPropsType> = ({activeIndex, onClickHandler}) => {
    const categories = ['all', 'sport', 'tourer', 'sport-tour', 'cruiser', 'tour-enduro', 'street']

    return <Stack className={styles.categoriesGroup} direction={"row"} spacing={1}>
        {categories.map((c, index) => (<Chip key={index}
                                             label={c}
                                             variant={activeIndex === index ? "filled" : "outlined"}
                                             size={activeIndex === index ? "medium" : "small"}
                                             onClick={() => {
                                                 onClickHandler(index)
                                             }}
        />))}
    </Stack>
}