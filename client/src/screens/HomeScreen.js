import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from './Paginate'
import ProductCarusel from '../components/ProductCarusel'
import Meta from '../components/Meta'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta/>
            {!keyword && <ProductCarusel className='my-5'/>}
            <h1>So'ngi productlar</h1>
            {loading ? (<Loader/>)
            : error ? (<Message variant='danger'>{error === 'Request failed with status code 500' ? 'Serverga ulan olmadik. Status kodi 500' : error}</Message>)
            : (
                <>
                    <Row>
                        {
                            products.map((product) => (
                                <Col sm={12} md={6} lg={4} xl={4} key={product._id} style={{marginBottom: '20px'}}>
                                    <Product product={product}/>
                                </Col>
                            ))
                        }
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            )
            }
        </>
    )
}

export default HomeScreen
