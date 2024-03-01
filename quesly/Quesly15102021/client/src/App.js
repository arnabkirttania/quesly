import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import Registration from './Components/Registration';
import { Route, Switch } from "react-router-dom";
import Login from './Components/Login';
import Home from './Components/Home';
import { useHistory } from "react-router-dom";
import Logout from './Components/Logout';
import Moja from './Components/Moja';


function App() {

    const history = useHistory();

    const token = sessionStorage.getItem("token");


  return (
    <>
    <Switch>

      <Route exact path = '/' component={Home} />

      <Route path = '/register' component = {Moja} />

      <Route path = '/login' component = {Login} />

      <Route path = '/logout' component = {Logout} />

    </Switch>
    </>
  );
}

export default App;
