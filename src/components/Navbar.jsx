import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import { Link, useLocation } from 'react-router-dom';

export default function NavComp() {
  const params = useLocation();
  const currentPath = params.pathname;
  // react-router route links
  const routeLinks = ['/', '/favourites', '/search'];

  return (
    <Navbar className='navbar' expand='lg'>
      <Container>
        <Navbar.Brand style={{ color: 'white', fontWeight: 'bold' }} href='#'>
          My Film Favourites
        </Navbar.Brand>

        
        <Navbar.Collapse>
          <Nav
            className='me-auto my-2 my-lg-0 d-flex gap-3'
            style={{ maxHeight: '100px' }}
            navbarScroll>
            {routeLinks.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                style={{
                  color: currentPath === item.href ? 'white' : '#afafaf',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: currentPath === item.href ? 'bold' : 'medium',
                }}>
                {item.title}
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
