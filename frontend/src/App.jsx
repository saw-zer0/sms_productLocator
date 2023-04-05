import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'

import Home from './features/home/home';
import {privateRoutes, publicRoutes} from './routes/main.routes';
import NoRoutes from './core/layout/noRoutes';
import Header from './core/layout/header';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setToken } from './features/auth/reducers/authSlice';
import userApi from './features/auth/reducers/authApi';

const ProtectedRoutes = ({children, props}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedIn = useSelector(state=> state.auth.loggedIn)
  const [validateToken] = userApi.useValidateTokenMutation()
  useEffect(()=>{
    const token = sessionStorage.getItem("token")
    const checkValidity = async() => {
      try{
        const validity = await validateToken(token)
        console.log(validity)
        console.log(validity)
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
    <Container maxWidth="md"
      sx={{
        my: 3,
        p: 3
      }}
      style={{
        background: "rgba( 255, 255, 255, 0.25 )",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur( 4px )",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )"
      }}
    >
      <Header/>
      {children}
    </Container>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
         {/* 
          login(no header)
          products list(requires header)
         */}
            {
              publicRoutes.map(route=> {
                return (
                  <Route
                    key={route.feature}
                    path={route.path}
                    element={
                      <Container disableGutters>
                        <Header/>
                        {route.element}
                      </Container>
                    }
                    exact={route.exact}
                  />
                )}
              )
            }
            {privateRoutes.map(route => {
              return (
                <Route
                  key={route.feature}
                  path={route.path}
                  element={
                    <ProtectedRoutes>
                      {route.element}
                    </ProtectedRoutes>}
                  exact={route.exact}
                />
              )
            })
          }
          <Route key='noRoutes' path='*' element={<NoRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
