import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShortTextIcon from '@mui/icons-material/ShortText';
import { AuthContext } from '../../context/Auth.context';

export const NavBar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDEfault();
    auth.logout();
    navigate('/');
  };

  return (
    <div className="navbar-fixed row">
      <nav className="nav-wrapper teal darken-3">
        <Link
          to="/"
          onClick={logoutHandler}
          className={`${auth.isAuthenticated ? 'grey darken-3 right' : 'left'}`}
          style={{ paddingInline: 20 }}
        >
          {auth.isAuthenticated ? 'Logout' : 'Home'}
        </Link>
        <div href="/" className="brand-logo" style={{ cursor: 'default' }}>
          <span style={{ margin: '0 0px', fontSize: 30 }}>shrink:link</span>
          <ShortTextIcon style={{ fontSize: 40, verticalAlign: 'sub' }} />
        </div>
        <ul>
          <li>
            <Link to="/links">{auth.isAuthenticated ? 'Links' : ''}</Link>
          </li>
          <li>
            <Link to="/create">{auth.isAuthenticated ? 'Create' : ''}</Link>
          </li>
          <li>
            <Link to="/detail/:id">{auth.isAuthenticated ? 'Detail' : ''}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
