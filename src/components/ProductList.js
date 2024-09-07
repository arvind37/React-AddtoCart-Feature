import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const cleanImageUrl = (url) => {
    if (url.startsWith("[\"")) {
      return url.slice(2, -2);
    }
    return url;
  };

  const addToCartHandler = (product) => {
    dispatch(cartActions.addItemToCart({
      id: product.id,
      title: product.title,
      price: product.price
    }));
  };

  return (
    <Container>
      <Box 
        display="grid" 
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" 
        gap={3} 
        mt={3}
      >
        {products.map(product => (
          <Card key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img 
                src={cleanImageUrl(product.images[0])} 
                alt={product.title} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
            </Link>
            <CardContent>
              <Typography variant="h5">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {product.title}
                </Link>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.price} USD
              </Typography>
              <Typography variant="body2">
                {product.description}
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                style={{ marginTop: '10px' }}
                onClick={() => addToCartHandler(product)} // Handle add to cart
              >
                Add to Cart
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                style={{ marginTop: '10px', marginLeft: '10px' }}
                onClick={() => navigate('/cart')} // Navigate to cart
              >
                View Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ProductList;
