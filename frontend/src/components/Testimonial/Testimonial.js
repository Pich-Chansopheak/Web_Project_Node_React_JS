import React from 'react';
import image1 from '../images/person_1.jpg';
// import image2 from '../images/person_2.jpg';
// import image3 from '../images/person_3.jpg';
// import image4 from '../images/person_4.jpg';

export const Testimonial = () => {
    return (

        <section className="ftco-section testimony-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="services-flow">
                            <div className="services-2 p-4 d-flex ">
                                <div className="icon">
                                    <span className="flaticon-bag" />
                                </div>
                                <div className="text">
                                    <h3>Free Shipping</h3>
                                    <p className="mb-0">Separated they live in. A small river named Duden flows</p>
                                </div>
                            </div>
                            <div className="services-2 p-4 d-flex ">
                                <div className="icon">
                                    <span className="flaticon-heart-box" />
                                </div>
                                <div className="text">
                                    <h3>Valuable Gifts</h3>
                                    <p className="mb-0">Separated they live in. A small river named Duden flows</p>
                                </div>
                            </div>
                            <div className="services-2 p-4 d-flex ">
                                <div className="icon">
                                    <span className="flaticon-payment-security" />
                                </div>
                                <div className="text">
                                    <h3>All Day Support</h3>
                                    <p className="mb-0">Separated they live in. A small river named Duden flows</p>
                                </div>
                            </div>
                            <div className="services-2 p-4 d-flex ">
                                <div className="icon">
                                    <span className="flaticon-customer-service" />
                                </div>
                                <div className="text">
                                    <h3>All Day Support</h3>
                                    <p className="mb-0">Separated they live in. A small river named Duden flows</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="heading-section  mb-5">
                            <h2 className="mb-4">Our satisfied customer says</h2>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts. Separated they live in</p>
                        </div>
                        <div className="carousel-testimony ">
                            <div className="item">
                                <div className="testimony-wrap">
                                    <div className="user-img mb-4" style={{ backgroundImage: `url('${image1}')` }}>
                                        <span className="quote d-flex align-items-center justify-content-center">
                                            <i className="icon-quote-left" />
                                        </span>
                                    </div>
                                    <div className="text">
                                        <p className="mb-4 pl-4 line">Far far away, behind the word mountains, far from the
                                            countries Vokalia and Consonantia, there live the blind texts.</p>
                                        <p className="name">Garreth Smith</p>
                                        <span className="position">Marketing Manager</span>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="item">
                                <div className="testimony-wrap">
                                    <div className="user-img mb-4" style={{ backgroundImage: `url('${image2}')` }}>
                                        <span className="quote d-flex align-items-center justify-content-center">
                                            <i className="icon-quote-left" />
                                        </span>
                                    </div>
                                    <div className="text">
                                        <p className="mb-4 pl-4 line">Far far away, behind the word mountains, far from the
                                            countries Vokalia and Consonantia, there live the blind texts.</p>
                                        <p className="name">Garreth Smith</p>
                                        <span className="position">Interface Designer</span>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="testimony-wrap">
                                    <div className="user-img mb-4" style={{ backgroundImage: `url('${image3}')` }}>
                                        <span className="quote d-flex align-items-center justify-content-center">
                                            <i className="icon-quote-left" />
                                        </span>
                                    </div>
                                    <div className="text">
                                        <p className="mb-4 pl-4 line">Far far away, behind the word mountains, far from the
                                            countries Vokalia and Consonantia, there live the blind texts.</p>
                                        <p className="name">Garreth Smith</p>
                                        <span className="position">UI Designer</span>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="testimony-wrap">
                                    <div className="user-img mb-4" style={{ backgroundImage: `url('${image4}')` }}>
                                        <span className="quote d-flex align-items-center justify-content-center">
                                            <i className="icon-quote-left" />
                                        </span>
                                    </div>
                                    <div className="text">
                                        <p className="mb-4 pl-4 line">Far far away, behind the word mountains, far from the
                                            countries Vokalia and Consonantia, there live the blind texts.</p>
                                        <p className="name">Garreth Smith</p>
                                        <span className="position">Web Developer</span>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="testimony-wrap">
                                    <div className="user-img mb-4" style={{ backgroundImage: `url('${image1}')` }}>
                                        <span className="quote d-flex align-items-center justify-content-center">
                                            <i className="icon-quote-left" />
                                        </span>
                                    </div>
                                    <div className="text">
                                        <p className="mb-4 pl-4 line">Far far away, behind the word mountains, far from the
                                            countries Vokalia and Consonantia, there live the blind texts.</p>
                                        <p className="name">Garreth Smith</p>
                                        <span className="position">System Analyst</span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}
