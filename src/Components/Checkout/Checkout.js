import axios from 'axios';
import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import {
    Badge,
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    // eslint-disable-next-line prettier/prettier
    Row
} from 'reactstrap';
import { resetState } from '../Redux/actionCreator';
import Spinner from '../Spinner/Spinner';

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    totalPrice: state.toatlPrice,
    isPurchasable: state.isPurchasable,
    token: state.token,
    userId: state.userId,
});

const mapDispatchToProps = (dispatch) => ({
    resetStates: () => dispatch(resetState()),
});

class Checkout extends Component {
    state = {
        values: {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            address: '',
            paymentType: '',
        },
        isLoading: false,
    };

    inputHandler = (e) => {
        const { values } = this.state;
        this.setState({
            values: {
                ...values,
                [e.target.name]: e.target.value,
            },
        });
    };

    submitHandler = (e) => {
        const { values } = this.state;
        const { ingredients, totalPrice, isPurchasable, resetStates, token, userId } = this.props;
        this.setState({ isLoading: true });
        const orders = {
            ingredient: ingredients,
            price: totalPrice,
            customer: values,
            createdAt: new Date(),
            userId,
        };
        if (isPurchasable) {
            axios
                .post(
                    `https://burger-builder-7a646-default-rtdb.firebaseio.com/orders.json?auth=${token}`,
                    orders
                )
                .then((res) => {
                    this.setState({ isLoading: false });
                    if (res.status === 200) {
                        NotificationManager.success('Success message', 'Order successfully done!');
                        this.clearState();
                        resetStates();
                    } else {
                        NotificationManager.error(
                            'Something went wrong! Please try again!',
                            'OPPS!'
                        );
                    }
                })
                .catch((error) => {
                    if (error) {
                        this.setState({ isLoading: false });
                        NotificationManager.error(
                            'Something went wrong! Please try again!',
                            'OPPS!'
                        );
                    }
                });
        }
        e.preventDefault();
    };

    cancelOrder = () => {
        const { history } = this.props;
        history.push('/');
    };

    clearState = () => {
        const { history } = this.props;
        this.setState({
            values: {
                fname: '',
                lname: '',
                email: '',
                phone: '',
                address: '',
                paymentType: '',
            },
        });
        setTimeout(() => {
            history.push('/');
        }, 3000);
    };

    render() {
        const { values, isLoading } = this.state;
        const { totalPrice, isPurchasable } = this.props;
        document.title = 'Checkout - Burger Builder';
        const form = (
            <div className="checkout-form">
                <h3 className="checkout-title">Checkout Form</h3>
                <p className="checkout-subtitle">
                    Please fill-up the below form with your information and place order.
                </p>
                <Form onSubmit={(e) => this.submitHandler(e)}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="fname">First Name</Label>
                                <Input
                                    type="text"
                                    name="fname"
                                    id="fname"
                                    value={values.fname}
                                    placeholder="jone"
                                    onChange={(e) => this.inputHandler(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="lname">Last Name</Label>
                                <Input
                                    type="text"
                                    name="lname"
                                    id="lname"
                                    value={values.lname}
                                    placeholder="Smith"
                                    onChange={(e) => this.inputHandler(e)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={values.email}
                                    placeholder="example@gmail.com"
                                    onChange={(e) => this.inputHandler(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={values.phone}
                                    placeholder="8801300000000"
                                    onChange={(e) => this.inputHandler(e)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label htmlFor="address">Delivery Address</Label>
                        <Input
                            type="textarea"
                            name="address"
                            id="address"
                            value={values.address}
                            placeholder="1234 Main St, Road #2, mirpur-10, Dhaka 1202"
                            onChange={(e) => this.inputHandler(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="paymentType">Payment Method</Label>
                        <Input
                            type="select"
                            name="paymentType"
                            id="paymentType"
                            value={values.paymentType}
                            onChange={(e) => this.inputHandler(e)}
                        >
                            <option>Choose payment type...</option>
                            <option value="Cash on delivery">Cash on delivery</option>
                            <option value="Card">Card</option>
                            <option value="Bkash">Bkash</option>
                            <option value="Nogod">Nogod</option>
                        </Input>
                    </FormGroup>
                    <div className="price">
                        <ListGroup>
                            <ListGroupItem className="justify-content-between">
                                <strong>TOTAL PRICE:</strong>
                                <Badge
                                    color="dark"
                                    style={{
                                        position: 'absolute',
                                        right: '0',
                                        backgroundColor: '#d70f64',
                                        padding: '14px',
                                        top: '0',
                                        fontSize: '20px',
                                    }}
                                >
                                    {totalPrice} .BDT
                                </Badge>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <Button
                            className="checkout-btn"
                            block
                            type="submit"
                            disabled={!isPurchasable}
                        >
                            Place Order
                        </Button>
                        <Button color="secondary" block onClick={this.cancelOrder}>
                            Cancel Order
                        </Button>
                    </div>
                </Form>
                <NotificationContainer />
            </div>
        );
        let outPut;
        if (isLoading) {
            outPut = <Spinner />;
        } else {
            outPut = form;
        }
        return <div>{outPut}</div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
