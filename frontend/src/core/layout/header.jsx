import React, {useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn, setToken } from '../../features/auth/reducers/authSlice';
import userApi from '../../features/auth/reducers/authApi';
import { Logout } from "@mui/icons-material";


const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedIn = useSelector(state=> state.auth.loggedIn)

    const [validateToken] = userApi.useValidateTokenMutation()
    useEffect(()=>{
      const token = sessionStorage.getItem("token")
      const checkValidity = async() => {
        try{
          const validity = await validateToken(token)
          if(validity.data.tokenStatus === "valid"){
            dispatch(setLoggedIn(true))
            dispatch(setToken("token"))
            navigate("/dashboard")
          }else{
            navigate("/")
          }
        }catch(error){
          navigate("/")
        }
      }
      checkValidity()
      return
    }, []
    )
  

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
                    {

                    <IconButton color="inherit"
                        onClick={()=>{
                            sessionStorage.setItem("token", "")
                            dispatch(setToken(""))
                            dispatch(setLoggedIn(false))
                            navigate("/")
                        }}
                    >
                        <Logout/>
                    </IconButton>
                    }
                </Toolbar>
            </AppBar>
            </Box>
        </div>
    )
}

export default Header;