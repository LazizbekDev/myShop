import React from 'react'
import { Link } from 'react-router-dom';
// import { Card } from 'react-bootstrap'
import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core/';
import Rating from './Rating';

const Product = ({product}) => {
    return (
        <Card className='cardef'>
            <CardMedia className='media' image={product.image} title={product.image} />

            <div className='overlay'>
                <Typography variant="h6">${product.price}</Typography>
            </div>

            <Typography className='titled' gutterBottom variant="h6" component="h6">
                <Link to={`/product/${product._id}`}>
                    {product.name}
                </Link>
            </Typography>

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{product.description}</Typography>
            </CardContent>

            <CardActions className='cardActions'>
                <Rating
                    value={product.rating}
                    text={`${product.numReviews} ta sharh`}
                />
            </CardActions>
      </Card>
        // <Card className='my-3 rounded'>
        //     <Link to={`/product/${product._id}`}>
        //         <Card.Img src={product.image}/>
        //     </Link>

        //     <Card.Body>
        //         <Link to={`/product/${product._id}`}>
        //             <Card.Title as='div'>
        //                 <strong>{product.name}</strong>
        //             </Card.Title>
        //         </Link>
        //     </Card.Body>

        //     <Card.Text as='div'>
        //         <Rating
        //             value={product.rating}
        //             text={`${product.numReviews} reviews`}
        //         />
        //     </Card.Text>

        //     <Card.Text as='h3'>
        //         ${product.price}
        //     </Card.Text>
        // </Card>
    )
}

export default Product