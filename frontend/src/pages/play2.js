import React from 'react';
import { Card,Jumbotron,InputGroup, Col,Button,Form} from 'react-bootstrap';
export default class FormExample extends React.Component {
    
  
    state = { validated: false };
    
  
    handleSubmit=(event) =>{
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.setState({ validated: true });
    };
  
    render() {
      const { validated } = this.state;
      return (

        <div>

        
        

        <Card style={{width:"60%"}}>
            <Card.Header as="h2">Sign up</Card.Header>
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
            
                <Form.Group as={Col} md="2" controlId="validationCustom01">

                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        name='firstName'
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                </Form.Group>

                <Form.Group as={Col} md="2" controlId="validationCustom02">

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

                <Form.Group as={Col} md="4" controlId="validationCustomUsername">

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

                <Form.Group as={Col} md="4" controlId="validationCustomEmail">

                <Form.Control type="email" placeholder="E-mail" required name='email' />
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid E-mail address.
                    </Form.Control.Feedback>

                </Form.Group>

            </Form.Row>

            <Form.Row>

                <Form.Group as={Col} md="2" controlId="validationCustom04">

                    <Form.Control type="Password" placeholder="Password" required name='password' minLength={6}/>
                    <Form.Control.Feedback type="invalid">
                    Please provide a Password.
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group as={Col} md="2" controlId="validationCustom05">

                    <Form.Control type="Password" placeholder="Confirm Password" required />
                    <Form.Control.Feedback type="invalid">
                    Please confirm password.
                    </Form.Control.Feedback>
                    
                </Form.Group>

            </Form.Row>

            <Form.Group>

                <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                />

            </Form.Group>

            <Button type="submit">Submit form</Button>

        </Form>


            
            </Card.Body>
        </Card>


        <Form
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
            method='POST'
            action='/'
        >
            <Form.Row>
            
                <Form.Group as={Col} md="2" controlId="validationCustom01">

                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        name='firstName'
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                </Form.Group>

                <Form.Group as={Col} md="2" controlId="validationCustom02">

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

                <Form.Group as={Col} md="4" controlId="validationCustomUsername">

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

                <Form.Group as={Col} md="4" controlId="validationCustomEmail">

                <Form.Control type="email" placeholder="E-mail" required name='email' />
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid E-mail address.
                    </Form.Control.Feedback>

                </Form.Group>

            </Form.Row>

            <Form.Row>

                <Form.Group as={Col} md="2" controlId="validationCustom04">

                    <Form.Control type="Password" placeholder="Password" required name='password' minLength={6}/>
                    <Form.Control.Feedback type="invalid">
                    Please provide a Password.
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group as={Col} md="2" controlId="validationCustom05">

                    <Form.Control type="Password" placeholder="Confirm Password" required />
                    <Form.Control.Feedback type="invalid">
                    Please confirm password.
                    </Form.Control.Feedback>
                    
                </Form.Group>

            </Form.Row>

            <Form.Group>

                <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                />

            </Form.Group>

            <Button type="submit">Submit form</Button>

        </Form>
        </div>
      );
    }
  }