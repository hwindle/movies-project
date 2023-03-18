import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NavBar from '../components/Navbar';
import { SearchComp } from '../components/SearchComp';
import { MovieCard } from '../components/MovieCard';

export default function Search() {
  // handlers for movie card icons/buttons

  const infoHandler = (e) => {
    console.log('Hey we are in the movie info handler');
  };

  const favHandler = (e) => {
    console.log('Hey we are in the add to favourites handler');
  };

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <div className="wrapper mt-4">
          <SearchComp />
          <Row md={3} xs={1} lg={4} className="g-4 mt-3">
            {movieSearchResults?.map((item) => (
              <Col key={item.id}>
                <MovieCard
                  movie={item}
                  infohandler={infoHandler}
                  favhandler={favHandler}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}
