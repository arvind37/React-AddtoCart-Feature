import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Card, CardContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the product details!", error);
      });
  }, [id]);

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({
      id: product.id,
      title: product.title,
      price: product.price
    }));
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const cleanImageUrl = (url) => {
    if (url.startsWith("[\"")) {
      return url.slice(2, -2);
    }
    return url;
  };

  return (
    <Container>
      <Card>
        <img 
          src={cleanImageUrl(product.images[0])} 
          alt={product.title} 
          style={{ height: '300px', objectFit: 'cover' }} 
        />
        <CardContent>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="body1" color="textSecondary">
            {product.price} USD
          </Typography>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            {product.description}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginTop: '20px' }} 
            onClick={addToCartHandler}
          >
            Add to Cart
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            style={{ marginTop: '20px', marginLeft: '10px' }}
            onClick={() => navigate('/cart')} // Navigate to cart
          >
            View Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
