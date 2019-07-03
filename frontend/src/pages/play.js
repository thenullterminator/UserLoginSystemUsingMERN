import React from 'react';
import { OverlayTrigger,Popover,Alert,Nav,ButtonToolbar,Card,InputGroup, Col,Button,Form} from 'react-bootstrap';
import zxcvbn from 'zxcvbn';
export default class FormExample extends React.Component {
    
  
    state = { 
        validated: false ,
        passwordmatch:true,
        passwordScore:0,
        passwordSuggestions:[],
        passwordweak:false
        };
    
  
    handleSubmit=(event) =>{
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      else if(form.elements.password.value !== form.elements.confirmPassword.value)
      {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ passwordmatch: false });
      }
      else if(this.state.passwordScore<3)
      {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ passwordweak: true });
      }
      this.setState({ validated: true });
    };

    handlepassword=(e)=>{
        const pwd=e.currentTarget.value;
        const evaluate=zxcvbn(pwd);
        
        this.setState({
            passwordScore:evaluate.score,
            passwordSuggestions:evaluate.feedback.suggestions
        });
    }

    
    render() {
      const { validated } = this.state;
      return (

        <div>

        
        

        <Card border="dark" style={{width:"50%",margin:"10%"}}>

        <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item>
                    <Nav.Link href="#first"><h4>Sign Up</h4></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#link"><h4>Log In</h4></Nav.Link>
                </Nav.Item>
            </Nav>
        </Card.Header>

            {/* <Card.Header as="h2">Sign up</Card.Header> */}

            <Card.Body>
                <Card.Title>New here?</Card.Title>
                <Card.Text>
                Sign up and discover great amount of new opportunities!
                </Card.Text>

                <Form
                noValidate
                validated={validated}
                onSubmit={e => this.handleSubmit(e)}
                method='POST'
                action='/'
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
                                name="userName"
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
                                <Form.Control type="Password" placeholder="Password" required name='password' onChange={ e=>this.handlepassword(e)}/>
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

                            <Alert  variant='danger' dismissible>
                                Password too weak!
                            </Alert>
                        }
                    </Form.Row>

                   
                    <Form.Row>
                        {
                            !this.state.passwordmatch && 

                            <Alert  variant='danger' dismissible>
                                Password and Confirm password fields should match!
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
                    
                    
                    <ButtonToolbar>
                        <Button variant="outline-primary" size="lg" block type='submit'>
                            submit
                        </Button>
                        <Button variant="primary" size="lg" block>
                            connect with facebook
                        </Button>
                        <Button variant="danger" size="lg" block>
                            connect with google
                        </Button>
                        <Button variant="info" size="lg" block>
                            connect with twitter
                        </Button>

                    
                       
                    </ButtonToolbar>

                </Form>
            </Card.Body>
        </Card>

        </div>
      );
    }
  }