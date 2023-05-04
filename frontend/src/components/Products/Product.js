import axios from 'axios';
import { useContext} from 'react';
// import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import './css/Product.css';
import { Store } from './Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

    const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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

  return (
    <div className="product d-flex flex-column">
      <Link to={`/product/${product.slug}`} className="img-prod">
        <img
          className="img-fluid"
          src={product.image}
          alt="Colorlib Template"
        />
        <div className="overlay" />
      </Link>
      <div className="text py-3 pb-4 px-3">
        {/* d-flex */}
        <div className=" rate">
          <div className="cat">
            <span>Lifestyle</span>
          </div>
          <div className="rating">
            <p className="text-right mb-0">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </p>
          </div>
        </div>
        <h3>
          <Link to="#">{product.name}</Link>
        </h3>
        <div className="pricing">
          <p className="price">
            <span className="mr-2">${product.price}</span>
          </p>
        </div>
        <p className="bottom-area d-flex px-3">
          {product.countInstock === 0 ? (
            <Link to="#" className="add-to-cart text-center py-2 mr-1" >
              <span>Out of stock</span>
            </Link>
          ) : (
            <Link
              to="#"
              onClick={() => addToCartHandler(product)}
              className="add-to-cart text-center py-2 mr-1"
            >
              <span>
                Add to cart <i className="ion-ios-add ml-1" />
              </span>
            </Link>
          )}

        </p>
      </div>
    </div>

  );
}

export default Product;
