import { Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControl = ({ label, added, removed }) => (
    <div className="d-flex">
        <div className="mr-auto ml-2" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            {label}
        </div>
        <Button className="btn btn-danger btn-sm m-1" onClick={removed}>
            Less
        </Button>
        <Button className="btn btn-success btn-sm m-1" onClick={added}>
            More
        </Button>
    </div>
);

const Controls = ({ addIngredient, removeIngredient, price, toggleModal, isPurchasable }) => (
    <div className="container ml-md-5" style={{ textAlign: 'center' }}>
        <Card style={{ marginTop: '30px', marginBottom: '30px', textAlign: 'center' }}>
            <CardHeader style={{ backgroundColor: '#D70F64', color: 'white' }}>
                <h4>Add Ingredients</h4>
            </CardHeader>
            <CardBody>
                {controls.map((item) => (
                    <BuildControl
                        label={item.label}
                        type={item.type}
                        key={Math.random()}
                        added={() => addIngredient(item.type)}
                        removed={() => removeIngredient(item.type)}
                    />
                ))}
            </CardBody>
            <CardFooter>
                <h5>
                    Price: <strong>{price}</strong> BDT
                </h5>
                <Button
                    disabled={!isPurchasable}
                    className="btn-block"
                    style={{ backgroundColor: '#D70F64' }}
                    onClick={toggleModal}
                >
                    ORDER NOW
                </Button>
            </CardFooter>
        </Card>
    </div>
);

export default Controls;
