import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

import { Link, useLocation } from 'react-router-dom';
import { nav_links } from '../helpers/data';

export default function NavComp() {
  const params = useLocation();
  const currentPath = params.pathname;

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
            {nav_links.map((item) => (
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
