import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
// import logger from 'use-reducer-logger';
import '../../components/Products/css/Product.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, blog: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const BlogDetail = () => {
  const params = useParams();

  const [{ blog }, dispatch] = useReducer(reducer, {
    blog: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/blogs/${params.id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        className="hero-wrap hero-bread"
        style={{ backgroundImage: 'url("../images/bg_6.jpg")' }}
      >
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-9  text-center">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <Link to="/">Home</Link>
                </span>{' '}
                <span>Blog</span>
              </p>
              <h1 className="mb-0 bread">Blog</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <section className="ftco-section ftco-degree-bg"> */}
      <div className="container ">
        <div className="row mt-5">
          <div className="col-lg-3"></div>
          <div className="col-lg-7 order-lg-last">
            <div className="row">
              <div className="col-md-12 d-flex">
                <div className="blog-entry align-self-stretch ">
                  <Link
                    href="blog-single.html"
                    className="block-20 ml-4"
                    // style={{ backgroundImage: 'url("images/image_1.jpg")' }}
                    style={{ backgroundImage: ` url(" ${blog.image} ") ` }}
                  ></Link>
                  <div className="text d-block pl-md-4">
                    <div className="meta mb-3">
                      <div>
                        <Link href="#">{blog.date}</Link>
                      </div>
                      <div>
                        <Link href="#">{blog.blogCreator}</Link>
                      </div>
                      <div>
                        <Link href="#" className="meta-chat">
                          <span className="icon-chat" /> {blog.numComments}
                        </Link>
                      </div>
                    </div>
                    <h3 className="heading">
                      <Link href="#">{blog.title}</Link>
                    </h3>
                    <p>{blog.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3"></div>
            <div className="col-lg-2"></div>
          </div>
        </div>

        <div class="row mb-5 d-flex justify-content-center">
          <label for="colFormLabel" class="col-sm-1 col-form-label mt-2 pl-4">
            Email :
          </label>
          <div class="col-sm-7">
            <input
              type="email"
              class="form-control"
              id="colFormLabel"
              placeholder="Your email..."
            />
          </div>
        </div>
        <div class="row mb-3 d-flex justify-content-center">
          <label for="colFormLabel" class="col-sm-1 col-form-label mt-2 pl-1">
            Comment :
          </label>
          <div class="col-sm-7">
            <textarea rows="5" cols="88" placeholder="Comment..."></textarea>
          </div>
        </div>
        <div class="row mb-5 d-flex justify-content-center">
          <input className="btn btn-primary" type="submit" value="Submit" style={{fontSize: "20px"}} />
        </div>
      </div>
      {/* </section> */}
    </>
  );
};
