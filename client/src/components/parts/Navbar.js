import React from 'react';
import { Link } from 'react-router-dom';
import ShortTextIcon from '@mui/icons-material/ShortText';
export const NavBar = ({ isAuth }) => {
  return (
    <div className="navbar-fixed row">
      <nav className="nav-wrapper teal darken-3">
        <a href="/" className="brand-logo right" style={{ marginRight: 40 }}>
          <span style={{ margin: '0 0px', fontSize: 30 }}>s:u.r.i</span>
          <ShortTextIcon style={{ fontSize: 40, verticalAlign: 'sub' }} />
        </a>
        <ul>
          <li>
            <Link to="/" style={{ marginLeft: 40 }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/links">{isAuth ? 'Links' : ''}</Link>
          </li>
          <li>
            <Link to="/create">{isAuth ? 'Create' : ''}</Link>
          </li>
          <li>
            <Link to="/detail/:id">{isAuth ? 'Detail' : ''}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
