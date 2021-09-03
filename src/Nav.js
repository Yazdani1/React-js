import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <nav className="nav">
      <ul className="listItems">
        <Link to="/" className="eachitem">
          <li>Data</li>
        </Link>

        <Link to="/post" className="eachitem">
          <li>Post</li>
        </Link>
        <Link to="/Profile" className="eachitem">
          <li>Profile Items</li>
        </Link>
      </ul>
    </nav>
  );
}
//nav updated
export default Nav;
