import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container, Nav, NavDropdown  } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
    const dispatch = useDispatch()
    const [sticky, setSticky] = useState('naved')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
    }

    const stickyNav = () => {
        window.scrollY > 40 ?  setSticky('navup')
        : setSticky('naved')
    }

    document.addEventListener('scroll', stickyNav)

    return (
        <header>
            <Navbar bg={sticky} variant="dark" expand="lg" collapseOnSelect  fixed="top" 
                className={sticky}
            >
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>mYm</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse style={{flexGrow: '0'}} id="basic-navbar-nav">
                        <Route render={({history}) => <SearchBox history={history}/>}/>
                        <Nav className='ml-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart"/> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-user"/> Sign In</Nav.Link>
                            </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                
            </Navbar>
            
        </header>
    )
}

export default Header