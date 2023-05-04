import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
//import for products
import axios from 'axios';
import './css/style.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        adminpro: action.payload.adminpro,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  const [slideshows, setSlideshow] = useState([]);
  const [blogs, setBlog] = useState([]);

  /*get product data*/
  const [{ adminpro }, dispatch] = useReducer(reducer, {
    adminpro: [],
    loading: true,
    error: '',
  });
  //calculate total
  let totalAmountorder = 0;
  order.forEach((total) => {
    totalAmountorder += total.totalPrice;
  });
  //count how many products are out of stock
  let outofstock = 0;
  adminpro.forEach((out) => {
    if (out.countInstock === 0) {
      outofstock += 1;
    }
  });
  const getOrder = async () => {
    let result = await fetch(`/api/orders`);
    result = await result.json();
    setOrder(result);
  };
  const getUser = async () => {
    let result = await fetch(`/api/users`);
    result = await result.json();
    setUser(result);
  };
  const getSlideshow = async () => {
    let result = await fetch(`/api/slideshows`);
    result = await result.json();
    setSlideshow(result);
  };
  const getBlog = async () => {
    let result = await fetch(`/api/blogs`);
    result = await result.json();
    setBlog(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products/adminpro');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    getOrder();
    getUser();
    getSlideshow();
    getBlog();
    fetchData();
  }, []);
  return (
    <Fragment>
      <div className="row mt-5">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 mb-3">
          <h1 className="my-4">Dashboard</h1>
          <div className="row pr-4">
            <div className="col-xl-12 col-sm-12 mb-3">
              <div className="card text-white bg-primary o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size font_large text-dark">
                    Total Amount
                    <br />
                    <b>${totalAmountorder}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pr-4">
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white o-hidden font_large bg_232f3e">
                <div className="card-body">
                  <div className="text-center card-font-size ">
                    <i className="fa-sharp fa-solid fa-box"></i> Products
                    <br />
                    <b>{adminpro && adminpro.length}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/products"
                >
                  <span className="float-left">Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card bg_dbcc8f o-hidden h-100 font_large">
                <div className="card-body">
                  <div className="text-center card-font-size text-dark">
                  <i class="fa-solid fa-sliders"></i>Slideshows
                    <br />
                    <b>{slideshows && slideshows.length}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/slideshows"
                >
                  <span className="float-left text-dark">Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right text-dark" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white o-hidden h-100 font_large bg_232f3e">
                <div className="card-body">
                  <div className="text-center card-font-size">
                  <i className="fas fa-blog"></i> Blogs
                    <br /> <b>{blogs && blogs.length}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/blogs"
                >
                  <span className="float-left">Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card bg_dbcc8f o-hidden h-100 font_large">
                <div className="card-body">
                  <div className="text-center card-font-size text-dark">
                    <i className="fa fa-shopping-basket"></i>Orders
                    <br />
                    <b>{order && order.length}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/orders"
                >
                  <span className="float-left text-dark">Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right text-dark" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white o-hidden h-100 font_large bg_232f3e">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    <i className="fa fa-users"></i> Users
                    <br /> <b>{user && user.length}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/users"
                >
                  <span className="float-left">Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white o-hidden h-100 font_large bg_dbcc8f">
                <div className="card-body">
                  <div className="text-center card-font-size text-dark">
                    Out of Stock
                    <br /> <b>{outofstock}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Dashboard;
