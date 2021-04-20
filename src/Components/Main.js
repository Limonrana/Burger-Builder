import { Route } from 'react-router-dom';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Header from './Header/Header';
import Orders from './Orders/Orders';

const Main = () => (
    <div>
        <Header />
        <div className="container">
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
        </div>
    </div>
);

export default Main;
