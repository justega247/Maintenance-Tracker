import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => (
  <header className="header">
    <Link className="header__title" to="/">
      <span>
          Maintenance Tracker <FontAwesomeIcon icon="cogs" />
      </span>
    </Link>
  </header>
);

export default Header;
