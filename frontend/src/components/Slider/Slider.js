import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger';
// import background_1 from '../images/bg_1.png';
import background_2 from '../images/bg_2.png';
import './css/slider.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, slideshows: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Slider = () => {
  const [{ loading, error, slideshows }, dispatch] = useReducer(
    logger(reducer),
    {
      slideshows: [],
      loading: true,
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/slideshows');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    // <section id="home-section" className="hero">
    //     <div className="home-slider owl-carousel">
    //         <div className="slider-item js-fullheight">
    //             <div className="overlay" />
    //             <div className="container-fluid p-0">
    //                 <div className="row d-md-flex no-gutters slider-text align-items-center justify-content-end" data-scrollax-parent="true">
    //                     <img className="one-third order-md-last img-fluid" src="images/bg_1.png" alt />
    //                     <div className="one-forth d-flex align-items-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
    //                         <div className="text">
    //                             <span className="subheading">#New Arrival</span>
    //                             <div className="horizontal">
    //                                 <h1 className="mb-4 mt-3">Shoes Collection 2019</h1>
    //                                 <p className="mb-4">A small river named Duden flows by their place and supplies it with
    //                                     the necessary regelialia. It is a paradisematic country.</p>
    //                                 <p><a href="#" className="btn-custom">Discover Now</a></p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="slider-item js-fullheight">
    //             <div className="overlay" />
    //             <div className="container-fluid p-0">
    //                 <div className="row d-flex no-gutters slider-text align-items-center justify-content-end" data-scrollax-parent="true">
    //                     <img className="one-third order-md-last img-fluid" src="images/bg_2.png" alt />
    //                     <div className="one-forth d-flex align-items-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
    //                         <div className="text">
    //                             <span className="subheading">#New Arrival</span>
    //                             <div className="horizontal">
    //                                 <h1 className="mb-4 mt-3">New Shoes Winter Collection</h1>
    //                                 <p className="mb-4">A small river named Duden flows by their place and supplies it with
    //                                     the necessary regelialia. It is a paradisematic country.</p>
    //                                 <p><a href="#" className="btn-custom">Discover Now</a></p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </section>

    <section id="home-section" className="hero background py-5">
      
        <Carousel variant="warning" className={"home-slider"+(slideshows.enable===true?'d-block':'d-none')} >
        {slideshows.map((slideshow) => (
          <Carousel.Item key={slideshow._id}  >
            <img
              className="d-block img-banner"
              // src={background_1}
              src={slideshow.image}
              alt="First slide"
              width=""
            />
            <Carousel.Caption>
              {/* <h1>Shoes Collection 2019</h1> */}
              <h1> {slideshow.title} </h1>
              {/* <p className="description">
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia. It is a paradisematic country.
              </p> */}
              <p className="description"> {slideshow.subtitle} </p>
              <p>
                <Link to="#" className="btn-custom">
                  Discover Now
                </Link>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          ))}
          {/* <Carousel.Item>
            <img
              className="d-block img-banner"
              src={background_2}
              alt="First slide"
              width=""
            />
            <Carousel.Caption>
              <h1>New Shoes Winter Collection</h1>
              <p className="description">
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia. It is a paradisematic country.
              </p>
              <p>
                <Link to="#" className="btn-custom">
                  Discover Now
                </Link>
              </p>
            </Carousel.Caption>
          </Carousel.Item> */}
        </Carousel>
      
    </section>
  );
};
