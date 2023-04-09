import React, {useCallback, useEffect, useState} from "react";
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

export const Main = () => {
    const motoList = useAppSelector(state => state.shop)
    const dispatch = useAppDispatch()
    const [user, loading, error] = useAuthState(auth)
    const [sortOption, setSortOption] = useState('')

    const getItems = bindActionCreators(getMoto, dispatch)
    const sortMotoByPrice = bindActionCreators(sortByPrice, dispatch)
    const sortMotoByAlphabet = bindActionCreators(sortByAlphabet, dispatch)

    useEffect(() => {
        getItems()
    }, [])

    const onChangeSort = useCallback((e: SelectChangeEvent) => {
        setSortOption(e.target.value)

        if (e.target.value === '0') {
            sortMotoByPrice()
        }
        if (e.target.value === '1') {
            sortMotoByAlphabet()
        }
    }, [sortOption])

    return <>
        <Box className={styles.sortMenu}>
            <Categories/>
            <Sort sortValue={sortOption} onChangeHandler={onChangeSort}/>
        </Box>
        <Container className={styles.itemsContainer} style={{display: 'flex'}}>
            {loading
                ? [...new Array(6)].map((_, i) => (
                    <Box key={i} sx={{pt: 0.5}}>
                        <Skeleton variant="rectangular" width={345} height={170} key={i}/>
                        <Skeleton height={70}/>
                        <Skeleton height={40} width="30%"/></Box>
                ))
                : motoList.map(m => (
                    <Card sx={{width: 345}} style={{margin: 10}} key={m.id}>
                        <CardMedia
                            sx={{height: 170}}
                            image={m.img}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {m.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {m.price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant={'contained'}>Add to cart</Button>
                        </CardActions>
                    </Card>
                ))}
        </Container>
    </>
}