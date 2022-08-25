import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'

import Home from './features/home/home';
import {privateRoutes, publicRoutes} from './routes/main.routes';
import NoRoutes from './core/layout/noRoutes';
import Header from './core/layout/header';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({children, props}) => {
  const navigate = useNavigate()
  const loggedIn = useSelector(state=> state.auth.loggedIn)
  useEffect(()=>{
    if(!loggedIn){
      navigate("/")
      return
    }
  }, []
  )
  return (
    <Container maxWidth="md">
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
