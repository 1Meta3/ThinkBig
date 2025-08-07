// src/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark px-4 py-2">
        <a className="navbar-brand text-white fs-4" href="/">
          🏟️
        </a>

        <ul className="navbar-nav ms-auto d-flex flex-row">
          <li className="nav-item">
            <a className="nav-link text-white px-3" href="#">서울</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white px-3" href="#">경기</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white px-3" href="#">부산</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white px-3" href="#">전체</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
