import React  from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
    <nav className="navbar bg-primary">
        <h5>
        <i className="fab fa-wordpress"></i> &nbsp;
        My CMS
        </h5>
        <ul className="nav">
        <li className="nav-item">
            <Link className="nav-link active" to = '/'>Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
        </li>
        </ul>
    </nav>
    )
}

export default Nav
