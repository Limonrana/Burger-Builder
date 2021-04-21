import { Badge, Card, CardText, CardTitle, Col, ListGroup, ListGroupItem } from 'reactstrap';

const SingleOrder = ({ order }) => {
    const summary = order.ingredient.map((item) => (
        <Badge color="light" key={item.type} style={{ padding: '.55em 1em', marginLeft: '7px' }}>
            {item.amount} x <span style={{ textTransform: 'capitalize' }}>{item.type}</span>
        </Badge>
    ));
    return (
        <Col style={{ marginTop: '20px' }}>
            <Card body inverse style={{ backgroundColor: '#d70f64', borderColor: '#333' }}>
                <CardTitle tag="h5">Order ID: {order.id}</CardTitle>
                <CardText>
                    <strong>Order Details:</strong>
                </CardText>
                <ListGroup style={{ color: 'black' }}>
                    <ListGroupItem>
                        Name: {order.customer.fname} {order.customer.lname}
                    </ListGroupItem>
                    <ListGroupItem>Email: {order.customer.email}</ListGroupItem>
                    <ListGroupItem>Phone: {order.customer.phone}</ListGroupItem>
                    <ListGroupItem>Address: {order.customer.address}</ListGroupItem>
                    <ListGroupItem>Payment Type: {order.customer.paymentType}</ListGroupItem>
                </ListGroup>
                <hr />
                <div>{summary}</div>
                <hr />
                <CardText>Total: {order.price} BDT</CardText>
            </Card>
        </Col>
    );
};

export default SingleOrder;
