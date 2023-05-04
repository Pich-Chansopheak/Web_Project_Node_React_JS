import { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../MessageBox/MessageBox';
import { Store } from './Store';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import './css/Product.css';
import axios from 'axios';

export default function Cart() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInstock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () =>{
    navigate('/signin?redirect=/shipping');
  }

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className="shop-title">Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              <p>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </p>
            </MessageBox>
          ) : (
            <ListGroup className="cart-table">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={5}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3} className="mt-3">
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>{' '}
                    </Col>
                    <Col md={2} className="mt-3">
                      ${item.price}
                    </Col>
                    <Col md={2} className="mt-3">
                      <Button variant="light"
                        onClick={() => removeItemHandler(item)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          ;
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    item) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid btn-checkout">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
