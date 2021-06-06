import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Image, Form, Card, ListGroupItem } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartAction';
import Message from '../components/Message'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shoping Cart</h1>
                {cartItems.length === 0 ? <Message>Hozircha sizning savatchagiz bo'mbo'sh</Message>
                : (
                    <ListGroup>
                        {cartItems.map((item, index) => (
                            <ListGroupItem key={index}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} rounded fluid/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'/>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Jami tanlanganlar {cartItems.reduce((acc, item) => acc + item.qty, 0)}ta</h4>
                            ${cartItems
                                .reduce((acc, item) => acc + item.qty * item.price, 0)
                                .toFixed(2)
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Sotib olish
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
