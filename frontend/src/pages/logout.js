import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
export default class Dashboard extends React.Component{

    state={
        loggedout:false
    };
    

    componentDidMount(){
        console.log('hereeeeee');
        axios({
            method:'GET',
            url:'/logout'
        }).then((response)=>{
            this.setState({
                loggedout:true
            });
        }).catch(e=>console.log(e));
    };

    render(){
        return (
            <div>
                <p>Successfully logged out!</p> 
                {this.state.loggedout && <Redirect to='/'/>}
            </div>
        );
    }
}