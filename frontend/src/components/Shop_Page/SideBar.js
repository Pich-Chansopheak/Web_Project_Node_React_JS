import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import '../Products/css/Product.css';

export const SideBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="col-md-4 col-lg-2">
      <div className="sidebar">
        <div className="sidebar-box-2">
          <h2 className="heading">Categories</h2>

          {categories.map((category) => (
            <div className="fancy-collapse-panel" key={category}>
              <div
                className="panel-group"
                id="accordion"
                role="tablist"
                aria-multiselectable="true"
              >
                <div className="panel panel-default">
                {/* className="panel-heading" */}
                  <div  role="tab" id="headingOne">
                    <h4 className="panel-title" >
                      <Link
                        className="left25 black-text"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        to={`/search?category=${category}`}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        {category}
                        </Link>
                    </h4>
                  </div>
                  {/* <div
                  id="collapseOne"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingOne"
                >
                  <div className="panel-body">
                    <ul>
                      <li>
                        <Link to="#">Sport</Link>
                      </li>
                      <li>
                        <Link to="#">Casual</Link>
                      </li>
                      <li>
                        <Link to="#">Running</Link>
                      </li>
                      <li>
                        <Link to="#">Jordan</Link>
                      </li>
                      <li>
                        <Link to="#">Soccer</Link>
                      </li>
                      <li>
                        <Link to="#">Football</Link>
                      </li>
                      <li>
                        <Link to="#">Lifestyle</Link>
                      </li>
                    </ul>
                  </div>
                </div> */}
                </div>
                {/* <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingTwo">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Women's Shoes
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseTwo"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingTwo"
                >
                  <div className="panel-body">
                    <ul>
                      <li>
                        <Link to="#">Sport</Link>
                      </li>
                      <li>
                        <Link to="#">Casual</Link>
                      </li>
                      <li>
                        <Link to="#">Running</Link>
                      </li>
                      <li>
                        <Link to="#">Jordan</Link>
                      </li>
                      <li>
                        <Link to="#">Soccer</Link>
                      </li>
                      <li>
                        <Link to="#">Football</Link>
                      </li>
                      <li>
                        <Link to="#">Lifestyle</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingThree">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Accessories
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseThree"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingThree"
                >
                  <div className="panel-body">
                    <ul>
                      <li>
                        <Link to="#">Jeans</Link>
                      </li>
                      <li>
                        <Link to="#">T-Shirt</Link>
                      </li>
                      <li>
                        <Link to="#">Jacket</Link>
                      </li>
                      <li>
                        <Link to="#">Shoes</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingFour">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Clothing
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseFour"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingFour"
                >
                  <div className="panel-body">
                    <ul>
                      <li>
                        <Link to="#">Jeans</Link>
                      </li>
                      <li>
                        <Link to="#">T-Shirt</Link>
                      </li>
                      <li>
                        <Link to="#">Jacket</Link>
                      </li>
                      <li>
                        <Link to="#">Shoes</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          ))}
        </div>
        <div className="sidebar-box-2">
          <h2 className="heading">Price Range</h2>
          <form method="post" className="colorlib-form-2">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="guests">Price from:</label>
                  <div className="form-field">
                    <i className="icon icon-arrow-down3" />
                    <select name="people" id="people" className="form-control">
                      <option value="#">1</option>
                      <option value="#">200</option>
                      <option value="#">300</option>
                      <option value="#">400</option>
                      <option value="#">1000</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="guests">Price to:</label>
                  <div className="form-field">
                    <i className="icon icon-arrow-down3" />
                    <select name="people" id="people" className="form-control">
                      <option value="#">2000</option>
                      <option value="#">4000</option>
                      <option value="#">6000</option>
                      <option value="#">8000</option>
                      <option value="#">10000</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
