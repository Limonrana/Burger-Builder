import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import { fatchOrder } from '../Redux/actionCreator';
import Spinner from '../Spinner/Spinner';
import SingleOrder from './SingleOrder';

const mapDispatchToProps = (dispatch) => ({
    fatchOrders: (token, userId) => dispatch(fatchOrder(token, userId)),
});

const mapStateToProps = (state) => ({
    getOrders: state.orders,
    isLoadings: state.isLoading,
    isErrors: state.isError,
    token: state.token,
    userId: state.userId,
});

class Orders extends Component {
    state = {};

    componentDidMount() {
        const { fatchOrders, token, userId } = this.props;
        fatchOrders(token, userId);
    }

    render() {
        const { getOrders, isLoadings, isErrors } = this.props;
        document.title = 'Orders - Burger Builder';
        let orderUI = null;
        if (isErrors) {
            orderUI = (
                <Col>
                    <Card
                        body
                        inverse
                        style={{
                            backgroundColor: '#d70f64',
                            borderColor: '#333',
                            textAlign: 'center',
                            padding: '15%',
                        }}
                    >
                        <CardTitle tag="h3">OPPS! Someting went wrong!</CardTitle>
                        <CardText>
                            There was a serverside error. Please try again few moments later.
                        </CardText>
                    </Card>
                </Col>
            );
        } else if (getOrders.length === 0) {
            orderUI = (
                <Col md={12}>
                    <Card
                        body
                        inverse
                        style={{
                            backgroundColor: '#d70f64',
                            borderColor: '#333',
                            textAlign: 'center',
                            padding: '15%',
                        }}
                    >
                        <CardTitle tag="h3">You have no orders!</CardTitle>
                        <CardText>There are no order avaiable for display.</CardText>
                    </Card>
                </Col>
            );
        } else {
            const getMapOrders = getOrders.map((order) => (
                <SingleOrder order={order} key={order.id} />
            ));
            orderUI = (
                <Container>
                    <h4 style={{ textAlign: 'center' }}>All Orders List</h4>
                    <Row xs="1" md="2">
                        {getMapOrders}
                    </Row>
                </Container>
            );
        }
        return <div>{isLoadings ? <Spinner /> : <div className="orders">{orderUI}</div>}</div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
