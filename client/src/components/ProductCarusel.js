import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { listTopProducts } from '../actions/productActions'
import {useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'


const ProductCarusel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? 
        <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
        : (
            <Carousel pause='hover' className='bg-dark'>
                {products.map(product => (
                    <Carousel.Item key={product._id} interval={3000} pause='hover'>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} className="d-block" fluid/>
                    <Carousel.Caption>
                      <h2>
                      {product.name} ${product.price}
                      </h2>
                    </Carousel.Caption>
                        </Link>
                    
                  </Carousel.Item>
                    // <Carousel.Item key={product._id}>
                    //     <Link to={`/product/${product._id}`}>
                    //         <Image src={product.image} alt={product.name} className='img' fluid/>
                    //         <Carousel.Caption className='carousel-caption'>
                    //             <h2>
                    //                 {product.name} {product.price}
                    //             </h2>
                    //         </Carousel.Caption>
                    //     </Link>
                    // </Carousel.Item>
                ))}
            </Carousel>
        )
}

export default ProductCarusel
