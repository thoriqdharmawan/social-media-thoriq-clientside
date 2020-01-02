// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import themeFile from './util/Theme';
import jwtDecode from 'jwt-decode';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Components
import Navbar from './component/Navbar';
import AuthRoute from './util/AuthRoute';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Hooks from './pages/Hooks';

// REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import Axios from 'axios';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    Axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
} 

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Provider store={store} >
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
                <Route exact path="/hooks" component={Hooks} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
