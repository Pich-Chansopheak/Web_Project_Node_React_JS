import React from 'react';
// import { Slide } from '../../components/Service/Service';
export const Contact = () => {
  return (
    <>
      <div>
        <div
          className="hero-wrap hero-bread"
          style={{ backgroundImage: 'url("images/bg_6.jpg")' }}
        >
          <div className="container">
            <div className="row no-gutters slider-text align-items-center justify-content-center">
              <div className="col-md-9  text-center">
                <p className="breadcrumbs">
                  <span className="mr-2">
                    <a href="index.html">Home</a>
                  </span>{' '}
                  <span>Contact</span>
                </p>
                <h1 className="mb-0 bread">Contact Us</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="ftco-section contact-section bg-light">
          <div className="container">
            <div className="row d-flex mb-5 contact-info">
              <div className="w-100" />
              <div className="col-md-3 d-flex">
                <div className="info bg-white p-4">
                  <p>
                    <span>Address:</span> 198 West 21th Street, Suite 721 New
                    York NY 10016
                  </p>
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="info bg-white p-4">
                  <p>
                    <span>Phone:</span>{' '}
                    <a href="tel://1234567920">+ 1235 2355 98</a>
                  </p>
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="info bg-white p-4">
                  <p>
                    <span>Email:</span>{' '}
                    <a href="mailto:info@yoursite.com">info@yoursite.com</a>
                  </p>
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="info bg-white p-4">
                  <p>
                    <span>Website</span> <a href="#">yoursite.com</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="row block-9">
              <div className="col-md-6 order-md-last d-flex">
                <form action="#" className="bg-white p-5 contact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name
                      id
                      cols={30}
                      rows={7}
                      className="form-control"
                      placeholder="Message"
                      defaultValue={''}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      defaultValue="Send Message"
                      className="btn btn-primary py-3 px-5 large-size"
                    />
                  </div>
                </form>
              </div>
              <div className="col-md-6 d-flex">
                {/* <div id="map" className="bg-white" /> */}
                <iframe
                  style={{ width: '600px' }}
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Royal%20of%20Phnom%20Penh,%20cambodia+(My%20Shop)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                  <a href="https://www.maps.ie/distance-area-calculator.html">
                    measure area map
                  </a>
                </iframe>
              </div>
            </div>
          </div>
        </section>
        <section className="ftco-gallery ftco-section ftco-no-pb">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 heading-section text-center mb-4 ">
                <h2 className="mb-4">Follow Us On Instagram</h2>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                  Separated they live in
                </p>
              </div>
            </div>
          </div>
          <div className="container-fluid px-0">
            <div className="row no-gutters">
              <div className="col-md-4 col-lg-2 ">
                <a
                  href="images/gallery-1.jpg"
                  className="gallery image-popup img d-flex align-items-center"
                  style={{ backgroundImage: 'url(images/gallery-1.jpg)' }}
                >
                  <div className="icon mb-4 d-flex align-items-center justify-content-center">
                    <span className="icon-instagram" />
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-lg-2 ">
                <a
                  href="images/gallery-2.jpg"
                  className="gallery image-popup img d-flex align-items-center"
                  style={{ backgroundImage: 'url(images/gallery-2.jpg)' }}
                >
                  <div className="icon mb-4 d-flex align-items-center justify-content-center">
                    <span className="icon-instagram" />
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-lg-2 ">
                <a
                  href="images/gallery-3.jpg"
                  className="gallery image-popup img d-flex align-items-center"
                  style={{ backgroundImage: 'url(images/gallery-3.jpg)' }}
                >
                  <div className="icon mb-4 d-flex align-items-center justify-content-center">
                    <span className="icon-instagram" />
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-lg-2 ">
                <a
                  href="images/gallery-4.jpg"
                  className="gallery image-popup img d-flex align-items-center"
                  style={{ backgroundImage: 'url(images/gallery-4.jpg)' }}
                >
                  <div className="icon mb-4 d-flex align-items-center justify-content-center">
                    <span className="icon-instagram" />
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-lg-2 ">
                <a
                  href="images/gallery-5.jpg"
                  className="gallery image-popup img d-flex align-items-center"
                  style={{ backgroundImage: 'url(images/gallery-5.jpg)' }}
                >
                  <div className="icon mb-4 d-flex align-items-center justify-content-center">
                    <span className="icon-instagram" />
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-lg-2 ">
                <a
                  href="images/gallery-6.jpg"
                  className="gallery image-popup img d-flex align-items-center"
                  style={{ backgroundImage: 'url(images/gallery-6.jpg)' }}
                >
                  <div className="icon mb-4 d-flex align-items-center justify-content-center">
                    <span className="icon-instagram" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
