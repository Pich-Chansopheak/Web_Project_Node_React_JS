import React, { useState } from 'react'
// import { Instagram } from '../Instagram/Instagram'
// import { Link } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Product from '../Products/Product';
import Pagination from '../Admin/Pagination';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, products: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

export const Shop_Items = () => {

    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
      });
      // const [products, setPeoducts] = useState([]);
      useEffect(() => {
        const fetchData = async () => {
          dispatch({ type: 'FETCH_REQUEST' });
          try {
            const result = await axios.get('/api/products');
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err.message });
          }
        };
        fetchData();
      }, []);

  //pagination
    const [currentPage,setCurrentPage] = useState(1);

    const [postsPerPage,setPostsPerPage] = useState(9);
  //Get Current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentProd = products.slice(indexOfFirstPost,indexOfLastPost);
  //Change page
  // pageNumber get from number in Pagination
    const paginate = pageNumber => setCurrentPage(pageNumber);
  //End of pagination

    return (
        <div className="col-md-8 col-lg-10 order-md-last">
            {loading ? (
                <div>Loading....</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
              currentProd.map((product) => (
              <div key={product.slug} className="col-sm-12 col-md-12 col-lg-4 d-flex float-left">
                <Product product={product}></Product>
              </div>
              
          ))
          
          )}
          <div className="col-sm-12 col-md-12 col-lg-12 float-left text-center">
             <Pagination postsPerpage={postsPerPage} totalPosts={products.length} paginate={paginate} currentPage={currentPage} />
          </div>
      </div>
    )
}
