import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Login from '../auth/Login';
import Profile from '../auth/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useLocation } from 'react-router-dom';
import Logout from '../auth/Logout';
import FavCounter from './FavCounter';

function NavBar() {
  const { isAuthenticated } = useAuth0();
  const params = useLocation();
  const currentPath = params.pathname;
  // react-router route links
  const routeLinks = [
    { href: '/', title: 'Home' },
    { href: '/favourites', title: 'Favourites' },
    { href: '/search', title: 'Search' },
  ];

  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand style={{ color: 'white', fontWeight: 'bold' }} href="#">
          My Film Favourites
        </Navbar.Brand>

        <Navbar>
          <Nav
            className="me-auto my-2 my-lg-0 d-flex gap-3"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {isAuthenticated && <Navbar.Text>{<Profile />}</Navbar.Text>}
            {routeLinks.map((item, id) => (
              <Link
                key={id}
                to={item.href}
                style={{
                  color: currentPath === item.href ? 'white' : '#afafaf',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: currentPath === item.href ? 'bold' : 'medium',
                }}
              >
                {item.title === 'Home'
                  ? item.title
                  : isAuthenticated
                  ? item.title
                  : ''}
              </Link>
            ))}
            <div style={{ marginLeft: '10px' }}>
              <FavCounter />
            </div>
          </Nav>
          {!isAuthenticated && <Nav.Link>{<Login />}</Nav.Link>}
          {isAuthenticated && <Nav.Link>{<Logout />}</Nav.Link>}
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default NavBar;
