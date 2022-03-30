import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as duckAuth from '../duckAuth.js';
import './styles/App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const history = useHistory();

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push("/ducks")
    }
  }, [loggedIn])

  function handleLogin(username, password){
    return duckAuth.authorize(username, password)
        .then((data) => {
          if (data.jwt){
            localStorage.setItem('jwt', data.jwt);
            const { user: { username, email } } = data;
            const userData = { username, email }
            setUserData(userData)
            setLoggedIn(true);
            history.push('/ducks')
          }
        })
  }
  function handleRegister(username, password, email) {
    return duckAuth.register(username, password, email).then(() => {
      // error
      history.push('/login');
    });
  }
  function tokenCheck() {
    if (localStorage.getItem('jwt')){
      let jwt = localStorage.getItem('jwt');
      duckAuth.getContent(jwt).then((res) => {
        if (res){
          let userData = {
            username: res.username,
            email: res.email
          }
          setUserData(userData)
          setLoggedIn(true);

        }
      });
    }
  }

  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/register');
    setLoggedIn(false);
  }

  return (
    <Switch>
      <ProtectedRoute path="/ducks" loggedIn={loggedIn} signOut={signOut} component={Ducks} />
      <ProtectedRoute path="/my-profile" loggedIn={loggedIn} userData={userData} component={MyProfile} />
      <Route path="/login">
        <div className="loginContainer">
          <Login handleLogin={handleLogin} />
        </div>
      </Route>
      <Route path="/register">
        <div className="registerContainer">
          <Register handleRegister={handleRegister} />
        </div>
      </Route>
      <Route>
        {loggedIn ? <Redirect to="/ducks" /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  )

}

export default App;
