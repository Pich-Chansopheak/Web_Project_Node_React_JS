import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; //not done yet
import { Helmet } from 'react-helmet-async';
import { Link, NavLink } from 'react-router-dom';
import './css/header.css';
import Badge from 'react-bootstrap/Badge';
import { Store } from '../Products/Store';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import '../Products/css/Product.css';
import SearchBox from '../Search/SearchBox';

//Admin Import
import Dashboard from '../Admin/Dashboard';

export const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    // redirect user to sign in
    window.location.href = '/signin';
  };


  return (
    <div>
      {/* <div className="py-1 bg-black">
        <div className="container">
          <div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
            <div className="col-lg-12 d-block">
              <div className="row d-flex">
                <div className="col-md pr-4 d-flex topper align-items-center">
                  <div className="icon mr-2 d-flex justify-content-center align-items-center">
                    <span className="icon-phone2" />
                  </div>
                  <span className="text">+ 1235 2355 98</span>
                </div>
                <div className="col-md pr-4 d-flex topper align-items-center">
                  <div className="icon mr-2 d-flex justify-content-center align-items-center">
                    <span className="icon-paper-plane" />
                  </div>
                  <span className="text">youremail@email.com</span>
                </div>
                <div className="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
                  <span className="text">
                    3-5 Business days delivery &amp; Free Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <ToastContainer position="bottom-center" limit={1} />
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          <Helmet>
            <title>Minishop</title>
          </Helmet>
          <a className="navbar-brand" href="index.html">
            Minishop
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/shop" className="nav-link">
                  Shop
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/blog" className="nav-link">
                  Blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  Contact
                </NavLink>
              </li>
              {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Catalog</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown04">
                                    <a className="dropdown-item" href="shop.html">Shop</a>
                                    <a className="dropdown-item" href="product-single.html">Single Product</a>
                                    <a className="dropdown-item" href="cart.html">Cart</a>
                                    <a className="dropdown-item" href="checkout.html">Checkout</a>
                                </div>
                            </li> */}
              {/* <li className="nav-item"><a href="about.html" className="nav-link">About</a></li> */}
              {/*<li className="nav-item"><a href="blog.html" className="nav-link">Blog</a></li>*/}
              {/* <li className="nav-item"><a href="contact.html" className="nav-link">Contact</a></li> */}
              <li className="nav-item cta-colored">
                <Link to="/cart" className="nav-link">
                  Cart
                  <span className="icon-shopping_cart" />
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </li>
              <li>
                <SearchBox />
              </li>
              <li>
                <Link to="/" className="nav-link username">
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Log Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      <p className="username">Sign in</p>
                    </Link>
                  )}
               
                  
                </Link>
              </li>
              
              <li>
              <Link to="/dashboard" className="nav-link">
                {userInfo && userInfo.isAdmin && (
                    //<NavDropdown  title="Admin" id="admin-nav-dropdown">
                    //  <LinkContainer to="/dashboard">
                    //    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    //  </LinkContainer>
                    //  <LinkContainer to="/productlist">
                    //    <NavDropdown.Item>Products</NavDropdown.Item>
                    //  </LinkContainer>
                    //  <LinkContainer to="/ordertlist">
                    //    <NavDropdown.Item>Orders</NavDropdown.Item>
                    //  </LinkContainer>
                    //  <LinkContainer to="/usertlist">
                    //    <NavDropdown.Item>Users</NavDropdown.Item>
                    //  </LinkContainer>
                    //</NavDropdown>
                    <nav className="nav-link nav_color">Admin</nav>
                  )}
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
