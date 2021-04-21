import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Header from './Header/Header';
import Orders from './Orders/Orders';
import { authCheck } from './Redux/authActionCreator';

const mapStateToProps = (state) => ({
    token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
    authentication: () => dispatch(authCheck()),
});

class Main extends Component {
    state = {};

    componentDidMount() {
        const { authentication } = this.props;
        authentication();
    }

    render() {
        const { token } = this.props;
        let routes = null;
        if (token === null) {
            routes = (
                <Switch>
                    <Route path="/login" component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/logout" component={Logout} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div>
                <Header />
                <div className="container">{routes}</div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
