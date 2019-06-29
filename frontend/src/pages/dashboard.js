import React from 'react';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
// import _ from 'lodash';
export default class Dashboard extends React.Component{

    state={
        auth:'',
        name:""
    };

   

    componentDidMount(){
        axios({
            method:'POST',
            url:'/userprofile'
        }).then((response)=>{

            if(Object.keys(response.data).length!==0)
            {
                this.setState({
                    auth:'true',
                    name:response.data.name
                });
            }
            else
            {
                this.setState({
                    auth:'false'
                });   
            }

        }).catch(e=>console.log(e));
    };

    render(){
        return (
            <div>
                <p>Welcome!</p>
                {this.state.auth==='false' && <Redirect  to='/login'/>}
                {this.state.auth==='true' && <p>You are {this.state.name}</p>}

                <Link to='/logout'>Logout</Link>
            </div>
        );
    };

}