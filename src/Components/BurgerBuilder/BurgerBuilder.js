import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addIngredient, removeIngredient, updatePurchasable } from '../Redux/actionCreator';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/Summary';

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    toatlPrice: state.toatlPrice,
    isPurchasable: state.isPurchasable,
});

const mapDispatchToProps = (dispatch) => ({
    addIngredients: (ingredientType) => dispatch(addIngredient(ingredientType)),
    removeIngredients: (ingredientType) => dispatch(removeIngredient(ingredientType)),
    updatePurchasables: () => dispatch(updatePurchasable()),
});

class BurgerBuilder extends Component {
    state = {
        isModalOpen: false,
    };

    componentDidMount() {
        console.log(this.props);
    }

    addIngredientHandle = (type) => {
        const { addIngredients, updatePurchasables } = this.props;
        addIngredients(type);
        updatePurchasables();
    };

    removeIngredientHandle = (type) => {
        const { removeIngredients, updatePurchasables } = this.props;
        removeIngredients(type);
        updatePurchasables();
    };

    toggleModal = () => {
        const { isModalOpen } = this.state;
        this.setState({ isModalOpen: !isModalOpen });
    };

    handleCheckout = () => {
        const { history } = this.props;
        history.push('/checkout');
    };

    render() {
        const { ingredients, toatlPrice, isPurchasable } = this.props;
        const { isModalOpen } = this.state;
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={ingredients} />
                    <Controls
                        addIngredient={this.addIngredientHandle}
                        removeIngredient={this.removeIngredientHandle}
                        price={toatlPrice}
                        toggleModal={this.toggleModal}
                        isPurchasable={isPurchasable}
                    />
                </div>
                <div className="order-summary">
                    <Modal isOpen={isModalOpen}>
                        <ModalHeader>
                            Order Summary
                            <button
                                type="button"
                                className="close"
                                onClick={this.toggleModal}
                                style={{ position: 'absolute', right: '15px', top: '10px' }}
                            >
                                <span>×</span>
                            </button>
                        </ModalHeader>
                        <ModalBody>
                            <Summary ingredients={ingredients} price={toatlPrice} />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                style={{ backgroundColor: '#D70F64' }}
                                onClick={this.handleCheckout}
                            >
                                Countinue to Checkout
                            </Button>
                            <Button color="secondary" onClick={this.toggleModal}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
