import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert, AlertTitle } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { setLoggedIn, setToken } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';

import userApi from '../reducers/authApi';
import productApi from '../../products/reducers/productsApi';
import { useState } from 'react';


export const defaultUsers = [
  {email: 'judy_smith@gmail.com', password: "just@Randompw"},
  {email: 'isla.williams@gmail.com', password: "123qwerty123@@"},
  {email: 'alanturing99@gmail.com', password: "letsHaveFun"},
  {email: 'brownleeyuki@gmail.com', password: "password123"},
]

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isToastOpen, setIsToastOpen] = useState(false)

  const [userLogin] = userApi.useUserLoginMutation()
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password")
    try{
      const {data, error} = await userLogin({
        email,
        password,
      })
      console.log(data)
      if(error)throw error
      sessionStorage.setItem("token", data.token)
      dispatch(setToken(data))
      navigate("/dashboard",{replace: true})
    }catch(err){
      navigate("/login",{replace: true})
      setIsToastOpen(true)
      setTimeout(()=> setIsToastOpen(false), 4000)
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        {isToastOpen &&
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
  );
}