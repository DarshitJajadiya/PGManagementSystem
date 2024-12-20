import React from 'react';
import SearchBar from './Searchbar';
import './HeaderFooter.css';

function Header() {
  return (
    <header className="header">
      <h1>Vidyashram PG</h1>
      <SearchBar/>
      <nav>
        <a href="#about">About</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact US</a>
      </nav>
    </header>
  );
}

export default Header;
