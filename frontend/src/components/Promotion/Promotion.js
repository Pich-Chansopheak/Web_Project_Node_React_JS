import React from 'react'

export const Promotion = () => {
    return (

        <section className="ftco-section ftco-deal bg-primary">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src="images/prod-1.png" className="img-fluid" alt />
                    </div>
                    <div className="col-md-6">
                        <div className="heading-section heading-section-white">
                            <span className="subheading">Deal of the month</span>
                            <h2 className="mb-3">Deal of the month</h2>
                        </div>
                        <div id="timer" className="d-flex mb-4">
                            <div className="time" id="days" />
                            <div className="time pl-4" id="hours" />
                            <div className="time pl-4" id="minutes" />
                            <div className="time pl-4" id="seconds" />
                        </div>
                        <div className="text-deal">
                            <h2><a href="#">Nike Free RN 2019 iD</a></h2>
                            <p className="price"><span className="mr-2 price-dc">$120.00</span><span className="price-sale">$80.00</span></p>
                            <ul className="thumb-deal d-flex mt-4">
                                <li className="img" style={{ backgroundImage: 'url(images/product-6.png)' }} />
                                <li className="img" style={{ backgroundImage: 'url(images/product-2.png)' }} />
                                <li className="img" style={{ backgroundImage: 'url(images/product-4.png)' }} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}
