import React from 'react'
import { Link } from 'react-router-dom'


export const Shop_Breadcrumb = () => {
    return (
        <div className="hero-wrap hero-bread" style={{ backgroundImage: 'url("images/bg_6.jpg")' }}>
            <div className="container">
                <div className="row no-gutters slider-text align-items-center justify-content-center">
                    <div className="col-md-9 text-center">
                        <p className="breadcrumbs"><span className="mr-2"><Link to="/">Home</Link></span> <span>Shop</span></p>
                        <h1 className="mb-0 bread">Shop</h1>
                    </div>
                </div>
            </div>
        </div>

    )
}
