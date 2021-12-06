import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//redux
import { logout } from "../../store/auth-actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i> <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/" onClick={() => dispatch(logout())}>
          <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to={isAuthenticated ? "dashboard" : "/"}>
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (isAuthenticated ? authLinks : guestLinks)}
    </nav>
  );
};

export default NavBar;
