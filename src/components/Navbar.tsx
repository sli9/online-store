import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {NavLink, useNavigate} from "react-router-dom";
import {CART_ROUTE, LOGIN_ROUTE} from "../utils/constants";
import {auth} from "../apiFirebase/FirebaseConfig";
import Stack from '@mui/material/Stack';
import Divider from "@mui/material/Divider";
import {useAppDispatch, useAppSelector} from "../store/store";
import {logout} from "./auth/auth-reducer";
import Avatar from "@mui/material/Avatar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

export const Navbar = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const photoURL = auth.currentUser?.photoURL


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar variant={"dense"}>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Button onClick={() => navigate('/')} color="inherit">Motorcycles</Button>
                    </Typography>
                    {isAuth ?
                        <Stack direction={'row'}
                               divider={<Divider orientation={'vertical'} flexItem/>}>
                            <NavLink to={CART_ROUTE}>
                                <Badge badgeContent={0} color={'secondary'} anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                                <ShoppingCartIcon fontSize={'large'} style={{color: 'orangered', textAlign: 'center'}}/>
                                </Badge>
                            </NavLink>
                            <Avatar  src={photoURL as string} style={{margin: 'auto 5px'}}/>
                            <p style={{margin: 'auto'}}>{auth.currentUser?.displayName}</p>
                            <Button onClick={() => {
                                dispatch(logout())
                            }}
                                    color="inherit">
                                <LogoutIcon/>
                            </Button>
                        </Stack>
                        :
                        <NavLink to={LOGIN_ROUTE}>
                            <Button color="inherit"><LoginIcon/></Button>
                        </NavLink>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}