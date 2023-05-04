import React from 'react';
import { useEffect, useReducer} from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Product from '../Products/Product';

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

export const New_Arrival = () => {
  // function New_Arrival(){
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

  return (
    <section className="ftco-section bg-light">
      <div className="container">
        <div className="row justify-content-center mb-3 pb-3">
          <div className="col-md-12 heading-section text-center">
            <h2 className="mb-4">New Shoes Arrival</h2>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        {loading ? (
          <div>Loading....</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          // slice(0,8) use for show first 8 products
          products.slice(0, 8).map((product) => (
            // <div >
              <div key={product.slug} className="col-sm-12 col-md-6 col-lg-3 d-flex float-left">
                <Product product={product}></Product>
                {/* <div className="product d-flex flex-column">
                  <Link to="#" className="img-prod">
                    <img
                      className="img-fluid"
                      src={product.image}
                      alt="Colorlib Template"
                    />
                    <div className="overlay" />
                  </Link>
                  <div className="text py-3 pb-4 px-3">
                    <div className="d-flex">
                      <div className="cat">
                        <span>Lifestyle</span>
                      </div>
                      <div className="rating">
                        <p className="text-right mb-0">
                          <Link to="#">
                            <span className="ion-ios-star-outline" />
                          </Link>
                          <Link to="#">
                            <span className="ion-ios-star-outline" />
                          </Link>
                          <Link to="#">
                            <span className="ion-ios-star-outline" />
                          </Link>
                          <Link to="#">
                            <span className="ion-ios-star-outline" />
                          </Link>
                          <Link to="#">
                            <span className="ion-ios-star-outline" />
                          </Link>
                        </p>
                      </div>
                    </div>
                    <h3>
                      <Link to="#">{product.name}</Link>
                    </h3>
                    <div className="pricing">
                      <p className="price">
                        <span className="mr-2 price-dc">
                          ${product.price}.00
                        </span>
                        <span className="price-sale">
                          ${product.disPrice}.00
                        </span>
                      </p>
                    </div>
                    <p className="bottom-area d-flex px-3">
                      <Link
                        to="#"
                        className="add-to-cart text-center py-2 mr-1"
                      >
                        <span>
                          Add to cart <i className="ion-ios-add ml-1" />
                        </span>
                      </Link>
                      <Link to="#" className="buy-now text-center py-2">
                        Buy now
                        <span>
                          <i className="ion-ios-cart ml-1" />
                        </span>
                      </Link>
                    </p>
                  </div>
                </div> */}
              </div>
            // </div>
          ))
        )}
      </div>
    </section>
  );
};
