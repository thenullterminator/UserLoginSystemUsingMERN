import React from 'react';
export default class App extends React.Component{

   

  render(){
    return(
      <div>
        <p>This is my first frontend(reactjs)+backend(nodejs) Integration.</p>
        <h3>Sign Up</h3>
        <form method='POST' action='/signup'>
        <div>
          <label>name:</label>
          <input type="text" name="name"/>
        </div>
        <div>
            <label>email:</label>
            <input type="email" name="email"/>
        </div>
        <div>
            <label>password:</label>
            <input type="password" name="password"/>
        </div>
          
        <button type="submit">Submit</button>
        </form>
      </div>
    );
  }


}