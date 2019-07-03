import React from 'react';
import { OverlayTrigger,Popover,Alert,Nav,ButtonToolbar,Card,InputGroup, Col,Button,Form} from 'react-bootstrap';
import zxcvbn from 'zxcvbn';
import '../styles/signup.scss';
import axios from 'axios';
export default class FormExample extends React.Component {
    
  
    state =
    { 
        validated: false ,
        passwordmatch:true,
        passwordScore:0,
        passwordSuggestions:[],
        passwordweak:false,
        usernameexist:false
    };
    
  
    handleSubmit=(event) =>{
        
        
        const form = event.currentTarget;
        if(!this.state.validated || !form.checkValidity())
        {

            event.preventDefault();
            event.stopPropagation();
            if(form.elements.password.value !== form.elements.confirmPassword.value)
            {
                this.setState({ passwordmatch: false });
            }
            else if(this.state.passwordScore<3)
            {
                this.setState({ passwordweak: true });
            }
            else
            {
                axios({
                    method:'POST',
                    url:'/checkusername',
                    data:{
                        username:form.elements.username.value
                    }
                }).then((response)=>{

                    if(response.data.exist)
                    {
                        this.setState({ usernameexist: true });
                    }
                    else
                    {
                        this.setState({ validated: true });
                        form.submit();
                    }

                }).catch(e=>console.log(e));

            }
                
        }
    
    };

    handlePassword=(e)=>{
        const pwd=e.currentTarget.value;
        const evaluate=zxcvbn(pwd);
        
        this.setState({
            passwordScore:evaluate.score,
            passwordSuggestions:evaluate.feedback.suggestions
        });
    };

    
    render() {
      const { validated } = this.state;

      return (

        <div id="back-ground-signup">

            <Card border="dark"  id='main-content-signup'>

                <Card.Header>
                    <Nav variant="tabs">
                        <Nav.Item>
                            <Nav.Link  active><h4 className='header header-color'>sign up</h4></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link  href='/login'><h4 className='header'> log in</h4></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>

                <Card.Body>
                    
                    <Card.Title className='header header-color'>New here?</Card.Title>
                    <Card.Text className='header header-color'>
                    Sign up and discover great amount of new opportunities!
                    </Card.Text>

                    <Form
                    noValidate
                    validated={validated}
                    onSubmit={e => this.handleSubmit(e)}
                    method='POST'
                    action='/signup'
                    >
                        <Form.Row>
                        
                            <Form.Group as={Col} md="6" controlId="validationCustom01">

                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    name='firstName'
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom02">

                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    name='lastName'
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                            </Form.Group>

                            

                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">

                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    name="username"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                    </Form.Control.Feedback>
                                </InputGroup>

                            </Form.Group>

                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} md="12" controlId="validationCustomEmail">

                            <Form.Control type="email" placeholder="E-mail" required name='email' />
                                <Form.Control.Feedback type="invalid">
                                Please provide a valid E-mail address.
                                </Form.Control.Feedback>

                            </Form.Group>

                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} md="6" controlId="validationCustom04">

                                <OverlayTrigger trigger="focus" placement="bottom" overlay={

                                    <Popover id="popover-basic" title="Password Strength">
                                        
                                        {
                                            ((this.state.passwordScore===1 || this.state.passwordScore===0)&& this.state.passwordSuggestions.length>0) &&

                                            <Alert  variant='danger' >
                                                Weak 
                                            </Alert>

                                        } 

                                        {
                                            this.state.passwordScore=== 2 &&

                                            <Alert  variant='dark' >
                                            Fair 
                                            </Alert>

                                        }

                                        {
                                            this.state.passwordScore===3 &&

                                            <Alert  variant='warning' >
                                            Average 
                                            </Alert>

                                        }

                                        {
                                            this.state.passwordScore===4 &&

                                            <Alert  variant='success' >
                                            Strong 
                                            </Alert>

                                        }
                                    </Popover>

                                }>
                                    <Form.Control type="Password" placeholder="Password" required name='password' onChange={ e=>this.handlePassword(e)}/>
                                </OverlayTrigger>

                                <Form.Control.Feedback type="invalid">
                                Please provide a Password.
                                </Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom05">

                                <Form.Control type="Password" placeholder="Confirm Password"  name='confirmPassword'required />
                                <Form.Control.Feedback type="invalid">
                                Please confirm password.
                                </Form.Control.Feedback>
                                
                            </Form.Group>

                        </Form.Row>


                        <Form.Row>
                            {
                                this.state.passwordweak && 

                                <Alert  variant='danger' >
                                    Password too weak!
                                </Alert>
                            }
                        </Form.Row>

                    
                        <Form.Row>
                            {
                                !this.state.passwordmatch && 

                                <Alert  variant='danger' >
                                    Password and Confirm password fields should match!
                                </Alert>
                            }
                        </Form.Row>

                        <Form.Row>
                            {
                                this.state.usernameexist && 

                                <Alert  variant='danger' >
                                    Username already taken
                                </Alert>
                            }
                        </Form.Row>

                        
                        <Form.Row>

                            <Form.Group>

                                <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                />

                            </Form.Group>

                        </Form.Row>
                        
                        
                        

                            <Button variant="outline-primary" size="lg" block type='submit'>
                                Submit
                            </Button>
                            
                            <ButtonToolbar>
                            
                            <Card.Text className='header header-color' style={{ margin:'10px'}}>
                                Or Join with
                            </Card.Text>
                            
                            <Button variant="primary" size="lg" block>
                                 <i className="social-media-icon fab fa-facebook-square"></i>
                            </Button>
                            <Button variant="danger" size="lg" block>
                                 <i className="social-media-icon fab fa-google"></i>
                            </Button>
                            <Button variant="info" size="lg" block>
                                <i className="social-media-icon fab fa-twitter-square"></i>
                            </Button>

                        </ButtonToolbar>

                    </Form>
                </Card.Body>
            </Card>

        </div>
      );
    }
  }