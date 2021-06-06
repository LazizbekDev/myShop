import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails, createProductReview } from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_REQUEST } from '../constants/productConstants';
import Meta from '../components/Meta';

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state=>state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state=>state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {success: successProductReview, error: errorProductReview} = productReviewCreate

    const addToCard = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    useEffect(() => {
        if (successProductReview) {
            alert('Fikringiz uchun rahmat!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return <>
        <Link className='btn btn-light my-3' to='/'>Orqaga qaytish</Link>
        {loading ? <Loader/>
        : error ? <Message>{error}</Message> : (
        <>
            <Row>
                <Meta title={product.name} meta={product.name} keyword={product.name}/>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Narxi: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Ma'lumot: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup.Item variant='flush'>
                            <Row>
                                <Col>Narxi:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item variant='flush'>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'sotuvda mavjud' : 'sotib bo\'lingan'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                            {
                                                [...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        <ListGroup.Item variant='flush'>
                            <Row>
                                <Button
                                    onClick={addToCard}
                                    className='btn-block' 
                                    type='button' 
                                    disabled={product.countInStock === 0}>
                                    Savatga qo'shish
                                </Button>
                            </Row>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6} className='my-5'>
                    <h2>Sharhlar</h2>
                    {product.reviews.length === 0 && <Message>hali hech qanday fikr mulohazalar yo'q</Message>}

                    <ListGroup variant='flush'>
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating}/>
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h3>Boshqa foydalanuvchilar uchun sharh yozing</h3>
                            {successProductReview && (
                                <Message variant='success'>
                                Review submitted successfully
                                </Message>
                            )}
                            {errorProductReview && (
                                <Message variant='danger'>{errorProductReview}</Message>
                            )}
                            {userInfo ?
                            (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                            <option value=''>Belgilang...</option>
                                            <option value='1'>1 - Juda yomon</option>
                                            <option value='2'>2 - Yomon</option>
                                            <option value='3'>3 - Qoniqarli</option>
                                            <option value='4'>4 - Yaxshi</option>
                                            <option value='5'>5 - Ajoyib</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Fikr bildiring!</Form.Label>
                                        <Form.Control as='textarea' value={comment} row='3' onChange={(e) => setComment(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>
                                        Yuborish
                                    </Button>
                                </Form>
                            )
                            : (
                                <Message>
                                    Iltimos avval <Link to='/register '>ro'yhatdan o'ting</Link>
                                </Message>
                            )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
        )}
    </>
}

export default ProductScreen
