import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutStep from './CheckoutStep.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from './Store';
import { useNavigate } from 'react-router-dom';
import './css/Product.css';

export default function PaymentMethod() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    // if the address is not exist back to /shipping
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div>
      <div className="checkout-line">
        <CheckoutStep step1 step2 step3></CheckoutStep>
      </div>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3 signin-text">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
          <div className="mb-3">
            <Button type="submit" className="btn-continue">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
