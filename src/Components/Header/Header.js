import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import Logo from '../../assets/logo.png';
import './Header.css';

const mapStateToProps = (state) => ({
    token: state.token,
});

const Header = ({ token }) => {
    let navLinks = null;
    if (token === null) {
        navLinks = (
            <NavItem>
                <NavLink exact className="NavLink" to="/login">
                    Login
                </NavLink>
            </NavItem>
        );
    } else {
        navLinks = (
            <>
                <NavItem>
                    <NavLink exact className="NavLink" to="/">
                        Shop
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact className="NavLink" to="/orders">
                        Orders
                    </NavLink>
                </NavItem>
            </>
        );
    }
    return (
        <div className="Navigation">
            <Navbar style={{ backgroundColor: '#D70F64', height: '70px' }}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    <img src={Logo} width="80px" alt="Logo" />
                </NavbarBrand>
                <Nav className="mr-md-5">{navLinks}</Nav>
            </Navbar>
        </div>
    );
};

export default connect(mapStateToProps)(Header);
