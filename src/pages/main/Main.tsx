import React, {useCallback, useContext, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Sort} from "../../components/Sort";
import Box from '@mui/material/Box';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../apiFirebase/FirebaseConfig";
import Container from "@mui/material/Container";
import styles from "./Main.module.scss"
import {SelectChangeEvent} from "@mui/material/Select";
import {SearchContext, SearchContextType} from "../../app/App"
import {getMoto} from "../../store/slices/shop-slice";
import {filterByCategory, setSortIndex} from "../../store/slices/filters-slice";
import {Categories, CategoriesType} from "../../components/categories";


export const Main = React.memo(function () {
    const motoList = useAppSelector(state => state.shop)
    const {category, sortIndex} = useAppSelector(state => state.filter)
    const [user, loading, error] = useAuthState(auth)
    const {searchValue} = useContext(SearchContext) as SearchContextType

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMoto(category))
    }, [category])


    const onChangeSort = useCallback((e: SelectChangeEvent) => {
        dispatch(setSortIndex({value: e.target.value}))
        console.log(sortIndex)
    }, [sortIndex])

    const onChangeCategory = useCallback((category: CategoriesType) => {
        dispatch(filterByCategory({value: category}))
    }, [category])

    let motoForMap = motoList

    // if (sortIndex) {
    //     switch (sortIndex) {
    //         case '0': {
    //             motoForMap = motoForMap.slice().sort((a, b) => {
    //                 return b.price - a.price
    //             })
    //             break
    //         }
    //         case '1': {
    //             motoForMap = motoForMap.slice().sort((a, b) => {
    //                 return a.price - b.price
    //             })
    //             break
    //         }
    //         case '2': {
    //             motoForMap = motoForMap.slice().sort((a, b) => {
    //                 return a.title.localeCompare(b.title)
    //             })
    //             break
    //         }
    //         case '3': {
    //             motoForMap = motoForMap.slice().sort((a, b) => {
    //                 return b.title.localeCompare(a.title)
    //             })
    //             break
    //         }
    //         default:
    //             motoForMap = motoList
    //     }
    // }

    const skeletons = [...new Array(6)].map((_, i) => (
        <Box key={i} sx={{pt: 0.5}}>
            <Skeleton variant="rectangular" width={345} height={170} key={i}/>
            <Skeleton height={70}/>
            <Skeleton height={40} width="30%"/>
        </Box>
    ))
    const motoItems = motoForMap.filter(m =>
        m.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(m => (
            <Card sx={{width: 345}} style={{margin: 10}} key={m.id}>
                <CardMedia
                    sx={{height: 170}}
                    image={m.img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {m.title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        {m.type}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {m.price}$
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant={'contained'}>Add to cart</Button>
                </CardActions>
            </Card>
        ))

    return <>
        <Box className={styles.sortMenu}>
            <Categories activeCategory={category} onClickHandler={onChangeCategory}/>
            <Sort sortValue={sortIndex} onChangeHandler={onChangeSort}/>
        </Box>
        <Container className={styles.itemsContainer} style={{display: 'flex'}}>
            {loading ? skeletons : motoItems}
        </Container>
    </>
})