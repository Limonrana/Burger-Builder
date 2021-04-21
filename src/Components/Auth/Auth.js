import { Formik } from 'formik';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { auth } from '../Redux/authActionCreator';

const mapDispatchToProps = (dispatch) => ({
    authentication: (email, password, mode) => dispatch(auth(email, password, mode)),
});

class Auth extends Component {
    state = {
        mode: 'login',
    };

    handleSwitch = () => {
        const { mode } = this.state;
        this.setState({ mode: mode === 'login' ? 'signup' : 'login' });
    };

    render() {
        const { mode } = this.state;
        const { authentication } = this.props;
        return (
            <div className={mode !== 'login' ? 'App-Container signup' : 'App-Container login'}>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={(values) => {
                        authentication(values.email, values.password, mode);
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (mode !== 'login') {
                            if (!values.confirmPassword) {
                                errors.confirmPassword = 'Field is required!';
                            } else if (values.confirmPassword !== values.password) {
                                errors.confirmPassword = "Password didn't match!";
                            }
                        }

                        if (!values.email) {
                            errors.email = 'Email is required!';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Email is invalid!';
                        }

                        if (!values.password) {
                            errors.password = 'Field is required!';
                        } else if (values.password.length < 4) {
                            errors.lname = 'Must be at least 4 characters!';
                        }
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div className="form">
                            <h3 style={{ marginBottom: '20px' }}>
                                {mode !== 'login' ? 'Sign Up' : 'Sign In'}
                            </h3>
                            <Form onSubmit={handleSubmit}>
                                <Row form>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={values.email}
                                                placeholder="example@gmail.com"
                                                onChange={handleChange}
                                            />
                                            <span style={{ color: 'red' }}>{errors.email}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={values.password}
                                                placeholder="**********"
                                                onChange={handleChange}
                                            />
                                            <span style={{ color: 'red' }}>{errors.password}</span>
                                        </FormGroup>
                                    </Col>
                                    {mode !== 'login' ? (
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label htmlFor="confirmPassword">
                                                    Confirm Password
                                                </Label>
                                                <Input
                                                    type="password"
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    value={values.confirmPassword}
                                                    placeholder="**********"
                                                    onChange={handleChange}
                                                />
                                                <span style={{ color: 'red' }}>
                                                    {errors.confirmPassword}
                                                </span>
                                            </FormGroup>
                                        </Col>
                                    ) : null}
                                </Row>
                                <div style={{ marginTop: '15px' }}>
                                    <Button className="checkout-btn" block type="sunmit">
                                        {mode !== 'login' ? 'SignUp' : 'Login'}
                                    </Button>
                                </div>
                            </Form>
                            <hr
                                style={{
                                    borderColor: '#d70f64',
                                    marginBottom: '30px',
                                    marginTop: '30px',
                                }}
                            />
                            <div className="switch-btn">
                                <Button outline color="success" block onClick={this.handleSwitch}>
                                    {mode !== 'login' ? 'Switch to Login' : 'Switch to Sign up'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Auth);
