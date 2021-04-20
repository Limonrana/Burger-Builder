import { Badge, ListGroup, ListGroupItem } from 'reactstrap';

const Summary = ({ ingredients, price }) => {
    const summaryList = ingredients.map((item) => (
        <ListGroupItem className="justify-content-between">
            {item.type}{' '}
            <Badge
                color="dark"
                style={{ position: 'absolute', right: '15px', backgroundColor: '#d70f64' }}
            >
                {item.amount}
            </Badge>
        </ListGroupItem>
    ));
    return (
        <div>
            <ListGroup>
                {summaryList}
                <ListGroupItem
                    className="justify-content-between"
                    style={{ color: '#ffffff', backgroundColor: '#d70f64b8' }}
                >
                    Total Price
                    <strong color="dark" style={{ position: 'absolute', right: '15px' }}>
                        = {price} BDT
                    </strong>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
};

export default Summary;
