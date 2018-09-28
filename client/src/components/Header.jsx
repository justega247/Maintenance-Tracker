import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => (
  <header className="header">
    <Link className="header__title" to="/">
      <h1>Maintenance Tracker <FontAwesomeIcon icon="cogs" /></h1>
    </Link>
  </header>
);

export default Header;
