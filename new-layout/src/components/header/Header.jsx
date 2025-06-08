import React from 'react';
import { FiSettings, FiMessageSquare, FiBookmark } from 'react-icons/fi';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">MACRO</div>
      <SearchBar />
      <div className="header-icons">
        <button className="icon-button">
          <FiSettings size={24} />
        </button>
        <button className="icon-button">
          <FiMessageSquare size={24} />
        </button>
        <button className="icon-button">
          <FiBookmark size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;