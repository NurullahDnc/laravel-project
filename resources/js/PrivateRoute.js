 
//! anasayfada giris yapımamıs ise giris sayfasına at

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthStore from './Store/AuthStore';

console.log(AuthStore.appState, "private, appState");

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  AuthStore.getToken();
  const isLoggedIn = AuthStore.appState != null && AuthStore.appState.isLoggedIn;

  return (
    //kulanıcı giris yapmıs ise compnents render edilir, yapmaıs ise login sayfasına yonelndirme yapılır
    <Route
      path={path}
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                prevLocation: path,
                error: 'Önce giriş yapmalısın'
              }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
