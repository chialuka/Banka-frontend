import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ token }) => {
  return token ? <AuthNavbar /> : <NonAuthNavbar />;
}

const NonAuthNavbar = () => (
  <div className="nav-bar">
    <div className="nav-items">
      <div className="home-button">
        <Link to="/">
          <div>Banka</div>
        </Link>
      </div>
      <div className="nav-buttons">
        <Link to="/register">
          <div className="nav-item">Register</div>
        </Link>
        <Link to="/login">
          <div className="nav-item">Login</div>
        </Link>
      </div>
    </div>
    <div className="nav-line" />
  </div>
);

const AuthNavbar = () => (
  <div className="nav-bar">
    <div className="nav-items">
      <div className="home-button">
        <Link to="/">
          <div>Banka</div>
        </Link>
      </div>
      <div className="nav-buttons">
        <Link to="/dashboard">
          <div className="nav-item">Dashboard</div>
        </Link>
        <Link to="/logout">
          <div className="nav-item">Logout</div>
        </Link>
      </div>
    </div>
    <div className="nav-line" />
  </div>
);

export default Navbar;
