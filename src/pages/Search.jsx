import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NavBar from '../components/Navbar';
//import { SearchComp } from '../components/SearchComp';
//import { MovieCard } from '../components/MovieCard';

export default function Search() {
  return (
    <>
      <NavBar />
      <Container className='mt-4'>
        <div className='wrapper mt-4'>
          <SearchComp />
          <Row md={3} xs={1} lg={4} className='g-4 mt-3'>
            {/* {movieSearchResults?.map((item) => (
              <Col key={item.id}>
                <MovieCard movie={item} />
              </Col>
            ))} */}
            {[0, 1, 2, 3, 4].map((item) => (
              <Col key={item}>{item}</Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}
