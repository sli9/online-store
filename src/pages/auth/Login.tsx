import React from "react";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../store/store";
import {login} from "../../store/slices/auth-slise";

export const Login = () => {
    const dispatch = useAppDispatch()

    const signInWithGoogle = () => {
        try {
            dispatch(login())
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <Container>
            <Grid container
                  style={{height: window.innerHeight - 50}}
                  alignItems={'center'}
                  justifyContent={'center'}>

                <Grid container
                      style={{width: 400, backgroundColor: 'lightgray'}}
                      alignItems={'center'}
                      direction={'column'}>
                    <Box p={5}>
                        <Button variant={'outlined'}
                                onClick={signInWithGoogle}>Sign in with Google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}