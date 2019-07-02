// Importing third party modules.
import React from 'react';
import {Animated} from "react-animated-css";
import {Redirect} from 'react-router-dom';

// Importing styles.
import '../styles/landing.scss';

class landing extends React.Component{

    // Setting up state for moving to other pages.
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
            <div id="landing-page">
                
                <div id="main-content">

                    <Animated className='title' animationIn="fadeInLeft" animationOut="fadeOut" animationInDuration={2000} animationOutDuration={1400} isVisible={true}>

                        <div onClick={this.toggle}>
                            Welcome !
                        </div>

                    </Animated>  
                    
                    <Animated  className='icon-cover'  animationIn="fadeIn" animationOut="fadeOut" animationInDuration={7000} animationOutDuration={1400} isVisible={true}>

                       <div onClick={this.toggle} >
                            <i className='icon fas fa-arrow-alt-circle-right'></i>
                       </div>

                    </Animated>  

                </div>

                {this.state.clicked && <Redirect to='/'/>}
                {/* Redirecting on click */}

            </div>
        );
    };
}

export default  landing;