import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './features/home/home';
import {privateRoutes, publicRoutes} from './routes/main.routes';
import NoRoutes from './core/layout/noRoutes';
import Header from './core/layout/header';
import { Container } from '@mui/material';

const ProtectedRoutes = ({children, props}) => {
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
