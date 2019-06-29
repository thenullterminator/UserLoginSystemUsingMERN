import React from 'react';
export default class App extends React.Component{

   

  render(){
    return(
      <div>
       
        <h3>Login </h3>
        <form method='POST' action='/login'>
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