import React from 'react'
import image1 from '../images/gallery-1.jpg';
import image2 from '../images/gallery-2.jpg';
import image3 from '../images/gallery-3.jpg';
import image4 from '../images/gallery-4.jpg';
import image5 from '../images/gallery-5.jpg';
import image6 from '../images/gallery-6.jpg';
export const Instagram = () => {
    return (
        
        <section className="ftco-gallery">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 heading-section text-center mb-4">
                        <h2 className="mb-4">Follow Us On Instagram</h2>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there
                            live the blind texts. Separated they live in</p>
                    </div>
                </div>
            </div>
            <div className="container-fluid px-0" style={{ boxSizing: "border-box" }}>
                <div className="row ">
                    <div className="col-md-4 col-lg-2 px-0">
                        <a href={image1} className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: `url('${image1}')` }}>
                            <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                <span className="icon-instagram" />
                            </div>
                        </a>
                        
                    </div>
                    <div className="col-md-4 col-lg-2 px-0">
                        <a href={image2} className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage:  `url('${image2}')` }}>
                            <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                <span className="icon-instagram" />
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4 col-lg-2 px-0">
                        <a href={image3} className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: `url('${image3}')` }}>
                            <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                <span className="icon-instagram" />
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4 col-lg-2 px-0">
                        <a href={image4} className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: `url('${image4}')` }}>
                            <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                <span className="icon-instagram" />
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4 col-lg-2 px-0">
                        <a href={image5} className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: `url('${image5}')` }}>
                            <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                <span className="icon-instagram" />
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4 col-lg-2 px-0">
                        <a href={image6} className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: `url('${image6}')` }}>
                            <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                <span className="icon-instagram" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>

    )
}
