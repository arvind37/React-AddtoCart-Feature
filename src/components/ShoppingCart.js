import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <ListItemText 
                primary={`${item.title} (x${item.quantity})`} 
                secondary={`Price: $${item.price * item.quantity}`} 
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Total Price: ${totalPrice}
      </Typography>
    </Container>
  );
};

export default ShoppingCart;
