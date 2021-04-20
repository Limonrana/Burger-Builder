import Ingredient from '../Ingredient/Ingredient';
import './Burger.css';

const Burger = ({ ingredients }) => {
    let ingredientUI = ingredients
        .map((item) => {
            const amountArr = [...Array(item.amount).keys()];
            // eslint-disable-next-line no-unused-vars
            return amountArr.map((_) => <Ingredient type={item.type} key={Math.random} />);
        })
        .reduce((arr, element) => arr.concat(element), []);

    if (ingredientUI.length === 0) {
        ingredientUI = <p style={{ marginTop: '1rem' }}>Please add some ingredients!</p>;
    }
    return (
        <div className="Burger">
            <Ingredient type="bread-top" />
            {ingredientUI}
            <Ingredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
