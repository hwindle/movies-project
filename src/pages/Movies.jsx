import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { MovieCard } from '../components/MovieCard';
import NavBar from '../components/Navbar';

export default function Movies() {
  return (
    <>
      <NavBar />
      <Container className='mt-4'>
        <div className='wrapper mt-4'>
          <Row md={3} xs={1} lg={4} className='g-4'>
            {movies?.map((item) => (
              <Col key={item.id}>
                <MovieCard movie={item} tvShow={false} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}
