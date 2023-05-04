import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar-wrapper">
        <nav id ="sidebar">
            <ul className="list-unstyled components">
                <li>
                    <Link to="/dashboard">
                        <i className="fa fa-tachometer-alt"></i>Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin/slideshows">
                    <i class="fa-solid fa-sliders"></i>Slideshows
                    </Link>
                </li>
                <li>
                    <Link to="/admin/blogs">
                    <i className="fas fa-blog"></i>Blogs
                    </Link>
                </li>
                <li>
                    <Link to="/admin/products">
                    <i className="fa-sharp fa-solid fa-box"></i>Products
                    </Link>
                </li>
                <li>
                    <Link to="/admin/orders">
                        <i className="fa fa-shopping-basket"></i>Orders
                    </Link>
                </li>
                <li>
                    <Link to="/admin/users">
                        <i className="fa fa-users"></i>Users
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

