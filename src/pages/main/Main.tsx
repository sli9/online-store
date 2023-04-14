import React, {useCallback, useContext, useEffect, useState} from "react";
import {getMoto, sortByAlphabet, sortByPrice} from "./shop-reducer";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {bindActionCreators} from "@reduxjs/toolkit";
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Categories} from "../../components/categories/Categories";
import {Sort} from "../../components/Sort";
import Box from '@mui/material/Box';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../apiFirebase/FirebaseConfig";
import Container from "@mui/material/Container";
import styles from "./Main.module.scss"
import {SelectChangeEvent} from "@mui/material/Select";
import {SearchContext, SearchContextType} from "../../app/App"


export const Main = React.memo(function () {
    const motoList = useAppSelector(state => state.shop)
    const [user, loading, error] = useAuthState(auth)
    const [sortOption, setSortOption] = useState('')
    const [indexCategory, setIndexCategory] = useState(0)

    const {searchValue} = useContext(SearchContext) as SearchContextType

    const dispatch = useAppDispatch()
    const getItems = bindActionCreators(getMoto, dispatch)
    const sortMotoByPrice = bindActionCreators(sortByPrice, dispatch)
    const sortMotoByAlphabet = bindActionCreators(sortByAlphabet, dispatch)

    useEffect(() => {
        getItems()
    }, [])

    let motoForMap = motoList

    const onChangeSort = useCallback((e: SelectChangeEvent) => {
        setSortOption(e.target.value)

        if (e.target.value === '0') {
            sortMotoByPrice()
        }
        if (e.target.value === '1') {
            sortMotoByAlphabet()
        }
    }, [sortOption])


    const onChangeCategory = useCallback((index: number) => {
        setIndexCategory(index)
    }, [indexCategory])


    {
        if (indexCategory === 1) {
            motoForMap = motoList.filter(m => m.type === 'sport')
        }
        if (indexCategory === 2) {
            motoForMap = motoList.filter(m => m.type === 'tourer')
        }
        if (indexCategory === 3) {
            motoForMap = motoList.filter(m => m.type === 'sport-tour')
        }
        if (indexCategory === 4) {
            motoForMap = motoList.filter(m => m.type === 'cruiser')
        }
        if (indexCategory === 5) {
            motoForMap = motoList.filter(m => m.type === 'tour-enduro')
        }
        if (indexCategory === 6) {
            motoForMap = motoList.filter(m => m.type === 'street')
        }
    }

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
            <Categories activeIndex={indexCategory} onClickHandler={onChangeCategory}/>
            <Sort sortValue={sortOption} onChangeHandler={onChangeSort}/>
        </Box>
        <Container className={styles.itemsContainer} style={{display: 'flex'}}>
            {loading ? skeletons : motoItems}
        </Container>
    </>
})