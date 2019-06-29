import React from 'react';
import {Link} from 'react-router-dom';
export default class App extends React.Component{
  render(){
    return(
      <div>
        <h1>Home page</h1>
        <p><Link to="/login">Log In</Link></p>
        <p><Link to="/signup">Sign Up</Link></p>
      </div>
    );
  }


}