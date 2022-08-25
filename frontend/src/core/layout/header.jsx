import React, {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const loggedIn = useSelector(state=> state.auth.loggedIn)
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {location.pathname}
                    </Typography>
                    <IconButton color="inherit"
                        onClick={()=> navigate(loggedIn? "/dashboard" : "/login", {replace: true})}
                    >
                        {loggedIn
                        ? <HomeIcon color="white" sx={{fontSize: 30}}/>
                        : <AccountCircleIcon color="white" sx={{fontSize: 30}}/>}
                    </IconButton>
                </Toolbar>
            </AppBar>
            </Box>
        </div>
    )
}

export default Header;