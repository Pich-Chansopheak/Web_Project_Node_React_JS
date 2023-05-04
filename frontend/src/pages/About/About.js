import React from 'react';
import { History } from '../../components/About_Page/History';
import { Shop_Breadcrumb } from '../../components/Shop_Page/Shop_Breadcrumb';
import { Service } from '../../components/Service/Service';
import { Testimonial } from '../../components/Testimonial/Testimonial';
import { Instagram } from '../../components/Instagram/Instagram';

export const About = () => {
    return (
        <>
            <div className="hero-wrap hero-bread" style={{backgroundImage: 'url("images/bg_6.jpg")'}}>
  <div className="container">
    <div className="row no-gutters slider-text align-items-center justify-content-center">
      <div className="col-md-9  text-center">
        <p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home</a></span> <span>About</span></p>
        <h1 className="mb-0 bread">About Us</h1>
      </div>
    </div>
  </div>
</div>
        <Service/>
        <History/>
        <Testimonial/>
        <Instagram/>
    
        </>
    )
}
