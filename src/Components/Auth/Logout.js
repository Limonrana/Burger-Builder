import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authLogout } from '../Redux/authActionCreator';

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(authLogout()),
});

class Logout extends Component {
    state = {};

    componentDidMount() {
        const { logout } = this.props;
        logout();
    }

    render() {
        return <Redirect to="/" />;
    }
}

export default connect(null, mapDispatchToProps)(Logout);
