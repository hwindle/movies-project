import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { MovieCard } from '../components/MovieCard'
import NavBar from '../components/Navbar';

function Home() {
  return (
    <>
      <NavBar />
      <Container className='mt-4'>
        <Row md={3} xs={1} lg={4} className='g-4'>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
            <Col key={item.id}>
              A film card
              {/* <MovieCard movie={item}/> */}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
