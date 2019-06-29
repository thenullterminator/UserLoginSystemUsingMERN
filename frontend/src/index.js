import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Logout from './pages/logout';
import Dash from './pages/dashboard';
import Signup from './pages/signup';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div>    
        <Router>
            <Route path='/' exact component={Home} />
            <Route path='/dashboard' exact component={Dash} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/logout' exact component={Logout} />
        </Router>
    </div>
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// servcd iceWorker.unregister();
