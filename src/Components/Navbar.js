import React from "react";
import netflix from "../Media/netflix.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="container-fluid navbar-main">
        <div className="row nav-shadow">
          <div className="col-10 mx-auto">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <Link className="navbar-brand fs-2" to="/home">
                  <div className="netflix-icon">
                    <img src={netflix} alt="Netflix" />
                  </div>
                </Link>
                <button
                  className="navbar-toggler btn-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon navbar-rotate color-crimson">
                    |||
                  </span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link" to="/trailers">
                        Watch Trailers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/kids">
                        Kids
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/contact">
                        Contact Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">
                        About
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
