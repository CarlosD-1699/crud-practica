import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-dark bg-gradient d-flex justify-content-between mb-0 mt-0 py-3 px-10 rounded-lg">
      <Link className="text-decoration-none" to="/">
        <h1 className="font-weight-bold fs-4 text-white mx-4">
          Products Manager
        </h1>
      </Link>
      <ul className="d-flex gap-4 mx-4 list-unstyled">
        {isAuthenticated ? (
          <>
            <li className="text-white">Welcome {user.username}</li>
            <li>
              <Link className="text-decoration-none text-white" to="/products">
                Products
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-white" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link
                className="text-decoration-none text-white"
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="bg-primary border border-primary px-2 py-1 text-center rounded">
              <Link className="text-decoration-none text-white" to="/login">
                Login
              </Link>
            </li>
            <li className="bg-primary border border-primary px-2 py-1 text-center rounded">
              <Link className="text-decoration-none text-white" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
