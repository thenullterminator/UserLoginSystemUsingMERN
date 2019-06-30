import React from 'react';
import '../styles/landing.scss';
import {Animated} from "react-animated-css";
import arrow from '../assets/arrow2.png';
import {Redirect} from 'react-router-dom';

export default class landing extends React.Component{

    state={
        clicked:false
    };

    toggle=()=>{
        this.setState({
            clicked:true
        });
    };
    

    render(){
        return (
            <div id="landingpage">
                
                
                <Animated className='title' animationIn="fadeInLeft" animationOut="fadeOut" animationInDuration={2000} animationOutDuration={1400} isVisible={true}>
                    <div >
                        Welcome !
                    </div>
                </Animated>  
    
                <Animated className='arrow' animationIn="fadeIn" animationOut="fadeOut" animationInDuration={7000} animationOutDuration={1400} isVisible={true}>
                    <div>
                        <img onClick={this.toggle} src={arrow} alt='icon'></img>
                    </div>
                </Animated>        
    
                {this.state.clicked && <Redirect to='/'/>}
            </div>
        );
    }
}
