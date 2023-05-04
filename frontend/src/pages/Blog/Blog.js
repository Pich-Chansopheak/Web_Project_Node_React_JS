import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger';
import '../../components/Products/css/Product.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, blogs: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Blog = () => {
  const [{ blogs }, dispatch] = useReducer(logger(reducer), {
    blogs: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/blogs');
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
        style={{ backgroundImage: 'url("images/bg_6.jpg")' }}
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
      <section className="ftco-section ftco-degree-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 order-lg-last ">
              <div className="row">
                {blogs.map((blog) => (
                  <div className="col-md-12 d-flex ">
                    <div
                      className="blog-entry align-self-stretch d-md-flex"
                      key={blog._id}
                    >
                      <Link
                        href="blog-single.html"
                        className="block-20"
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
                        <p>{blog.description.slice(0, 127)}...</p>
                        <p>
                          <Link
                            to={`/blog/${blog._id}`}
                            className="btn btn-primary py-2 px-3 large-size"
                          >
                            Read more
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row mt-2">
                <div className="col">
                  <div className="block-27">
                    <ul>
                      <li>
                        <Link href="#">&lt;</Link>
                      </li>
                      <li className="active">
                        <span>1</span>
                      </li>
                      <li>
                        <Link href="#">2</Link>
                      </li>
                      <li>
                        <Link href="#">3</Link>
                      </li>
                      <li>
                        <Link href="#">4</Link>
                      </li>
                      <li>
                        <Link href="#">5</Link>
                      </li>
                      <li>
                        <Link href="#">&gt;</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>{' '}
            {/* .col-md-8 */}
            <div className="col-lg-4 sidebar ">
              <div className="sidebar-box">
                <form action="#" className="search-form">
                  <div className="form-group">
                    <span className="icon ion-ios-search" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type Link keyword and hit enter"
                    />
                  </div>
                </form>
              </div>
              <div className="sidebar-box ">
                <h3 className="heading">Categories</h3>
                <ul className="categories">
                  <li>
                    <Link href="#">
                      Shoes <span>(12)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Men's Shoes <span>(22)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Women's <span>(37)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Accessories <span>(42)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Sports <span>(14)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Lifestyle <span>(140)</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="sidebar-box ">
                <h3 className="heading">Recent Blog</h3>
                {blogs.slice(0, 4).map((blog) => (
                  <div className="block-21 mb-4 d-flex" key={blog._id}>
                    <Link
                      className="blog-img mr-4"
                      style={{ backgroundImage: ` url(" ${blog.image} ") ` }}
                    />
                    <div className="text">
                      <h3 className="heading-1">
                        <Link href="#">{blog.title}</Link>
                      </h3>
                      <div className="meta">
                        <div>
                          <Link href="#">
                            <span className="icon-calendar" />{' '}
                            {blog.date}
                          </Link>
                        </div>
                        <div>
                          <Link href="#">
                            <span className="icon-person" /> {blog.blogCreator}
                          </Link>
                        </div>
                        <div>
                          <Link href="#">
                            <span className="icon-chat" /> {blog.numComments}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="sidebar-box ">
                <h3 className="heading">Tag Cloud</h3>
                <div className="tagcloud">
                  <Link href="#" className="tag-cloud-link">
                    shop
                  </Link>
                  <Link href="#" className="tag-cloud-link">
                    products
                  </Link>
                  <Link href="#" className="tag-cloud-link">
                    shirt
                  </Link>
                  <Link href="#" className="tag-cloud-link">
                    jeans
                  </Link>
                  <Link href="#" className="tag-cloud-link">
                    shoes
                  </Link>
                  <Link href="#" className="tag-cloud-link">
                    dress
                  </Link>
                  <Link href="#" className="tag-cloud-link">
                    coats
                  </Link>
                  <Link href="#" className="tag-cloud-link">
                    jumpsuits
                  </Link>
                </div>
              </div>
              <div className="sidebar-box ">
                <h3 className="heading">Paragraph</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Ducimus itaque, autem necessitatibus voluptate quod mollitia
                  delectus aut, sunt placeat nam vero culpa sapiente consectetur
                  similique, inventore eos fugit cupiditate numquam!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>{' '}
      {/* .section */}
      <section className="ftco-gallery">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 heading-section text-center mb-4 ">
              <h2 className="mb-4">Follow Us On Instagram</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid px-0">
          <div className="row no-gutters">
            <div className="col-md-4 col-lg-2 ">
              <Link
                href="images/gallery-1.jpg"
                className="gallery image-popup img d-flex align-items-center"
                style={{ backgroundImage: 'url(images/gallery-1.jpg)' }}
              >
                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                  <span className="icon-instagram" />
                </div>
              </Link>
            </div>
            <div className="col-md-4 col-lg-2 ">
              <Link
                href="images/gallery-2.jpg"
                className="gallery image-popup img d-flex align-items-center"
                style={{ backgroundImage: 'url(images/gallery-2.jpg)' }}
              >
                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                  <span className="icon-instagram" />
                </div>
              </Link>
            </div>
            <div className="col-md-4 col-lg-2 ">
              <Link
                href="images/gallery-3.jpg"
                className="gallery image-popup img d-flex align-items-center"
                style={{ backgroundImage: 'url(images/gallery-3.jpg)' }}
              >
                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                  <span className="icon-instagram" />
                </div>
              </Link>
            </div>
            <div className="col-md-4 col-lg-2 ">
              <Link
                href="images/gallery-4.jpg"
                className="gallery image-popup img d-flex align-items-center"
                style={{ backgroundImage: 'url(images/gallery-4.jpg)' }}
              >
                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                  <span className="icon-instagram" />
                </div>
              </Link>
            </div>
            <div className="col-md-4 col-lg-2 ">
              <Link
                href="images/gallery-5.jpg"
                className="gallery image-popup img d-flex align-items-center"
                style={{ backgroundImage: 'url(images/gallery-5.jpg)' }}
              >
                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                  <span className="icon-instagram" />
                </div>
              </Link>
            </div>
            <div className="col-md-4 col-lg-2 ">
              <Link
                href="images/gallery-6.jpg"
                className="gallery image-popup img d-flex align-items-center"
                style={{ backgroundImage: 'url(images/gallery-6.jpg)' }}
              >
                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                  <span className="icon-instagram" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
