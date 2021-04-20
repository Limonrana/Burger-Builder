import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import Logo from '../../assets/logo.png';
import './Header.css';

const Header = () => (
    <div className="Navigation">
        <Navbar style={{ backgroundColor: '#D70F64', height: '70px' }}>
            <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                <img src={Logo} width="80px" alt="Logo" />
            </NavbarBrand>
            <Nav className="mr-md-5">
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
                {/* <NavItem>
                    <NavLink exact className="NavLink" to="/">
                        Sign Up
                    </NavLink>
                </NavItem> */}
            </Nav>
        </Navbar>
    </div>
);

export default Header;
