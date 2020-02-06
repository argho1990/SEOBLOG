import { useState } from 'react';
import Link from 'next/link';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Navbar style={{ background: 'PowderBlue' }} light expand="md">
                <Link href="/">
                    <NavLink className="font-weight-bold" style={{ cursor: 'pointer' }}>{APP_NAME}</NavLink>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>

                        {!isAuth() && (
                            <React.Fragment>
                                <NavItem>
                                    <Link href="/signin">
                                        <NavLink style={{ cursor: 'pointer' }}>Signin</NavLink>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link href="/signup">
                                        <NavLink style={{ cursor: 'pointer' }}>Signup</NavLink>
                                    </Link>
                                </NavItem>
                            </React.Fragment>
                        )}




                        {isAuth() && isAuth().role === 0 && (
                            <NavItem>
                                <Link href="/user">
                                    <NavLink style={{ cursor: 'pointer' }}>{`${isAuth().name}'s Dashboard`}</NavLink>
                                </Link>
                            </NavItem>
                        )}

                        {isAuth() && isAuth().role === 1 && (
                            <NavItem>
                                <Link href="/admin">
                                    <NavLink style={{ cursor: 'pointer' }}>{`${isAuth().name}'s Dashboard`}</NavLink>
                                </Link>
                            </NavItem>
                        )}

                        {isAuth() && (
                            <NavItem>
                                <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signin`))}>
                                    Signout</NavLink>
                            </NavItem>
                        )}

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
