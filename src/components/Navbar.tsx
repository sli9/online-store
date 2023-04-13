import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {NavLink, useNavigate} from "react-router-dom";
import {CART_ROUTE, LOGIN_ROUTE} from "../utils/constants";
import {auth} from "../apiFirebase/FirebaseConfig";
import Stack from '@mui/material/Stack';
import Divider from "@mui/material/Divider";
import {useAppDispatch, useAppSelector} from "../store/store";
import {logout} from "../pages/auth/auth-reducer";
import Avatar from "@mui/material/Avatar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import {Search} from "./Saerch";

export const Navbar = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const photoURL = auth.currentUser?.photoURL


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="sticky" style={{backgroundColor: "darkslateblue"}}>
                <Toolbar variant={"dense"}
                         sx={{justifyContent: 'space-between', '&.MuiToolbar-root': {paddingRight: 0}}}>
                    <Button onClick={() => navigate('/')} color="inherit">Motorcycles</Button>
                    <Search/>
                    {isAuth ?
                        <Stack direction={'row'}
                               divider={<Divider orientation={'vertical'} color={'#fff'} flexItem light/>}>
                            <NavLink to={CART_ROUTE}>
                                <Badge badgeContent={0} color={'secondary'}
                                       anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                                    <ShoppingCartIcon fontSize={'large'}
                                                      style={{color: 'orangered', textAlign: 'center'}}/>
                                </Badge>
                            </NavLink>
                            <Avatar src={photoURL as string} style={{margin: 'auto 5px'}}/>
                            <p style={{margin: 'auto', padding: '0 5px'}}>{auth.currentUser?.displayName}</p>
                            <Button onClick={() => {
                                dispatch(logout())
                            }}
                                    color="inherit"
                                    variant={'outlined'}
                                    sx={{marginRight: '10px', marginLeft: '5px'}}>
                                <LogoutIcon/>
                            </Button>
                        </Stack>
                        :
                        <NavLink to={LOGIN_ROUTE}>
                            <Button variant={'outlined'} color="primary" sx={{marginRight: '10px'}}><LoginIcon/></Button>
                        </NavLink>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}