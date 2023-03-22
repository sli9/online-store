import React, {useEffect} from "react";
import {getMoto} from "./shop-reducer";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {bindActionCreators} from "@reduxjs/toolkit";
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Categories} from "../../features/Categories";
import { Sort } from "../Sort";
import { Stack } from "@mui/material";

export const Main = () => {
    const motoList = useAppSelector(state => state.shop)
    const dispatch = useAppDispatch()

    const getItems = bindActionCreators(getMoto, dispatch)

    useEffect(() => {
        getItems()
    }, [])

    return <>
        <Stack direction={'row'} style={{maxWidth: '80%'}}>
            <Categories/>
            <Sort/>
        </Stack>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', maxWidth: '80%', margin: 'auto', backgroundColor: '#80808036'}}>
            {motoList.map(m => (
                <Card sx={{ width: 345 }} style={{margin: 10}} key={m.id}>
                    <CardMedia
                        sx={{ height: 170 }}
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
        </div>
        </>
}