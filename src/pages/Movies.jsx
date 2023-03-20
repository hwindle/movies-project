import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import NavBar from '../components/Navbar';
import { favouriteFilms } from '../MovieAPI/MovieAPI';

export default function Movies() {
  // handlers for movie card icons/buttons

  const infoHandler = (e) => {
    console.log('Hey we are in the movie info handler');
  };

  const deleteHandler = (e) => {
    console.log('Hey we are in the add to favourites handler');
  };

  // state for the movies results
  const [movieData, setMovieData] = useState([]);
  

  // search the database for favourite film
  const getFavourites = async () => {
    const results = await favouriteFilms();
    setMovieData(results);
  };

  // useEffect - on first render
  useEffect(() => {
    getFavourites();
  }, []);


  return (
    <>
      <NavBar />
      <Container className='mt-4' fluid>
        <h2 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7' }}>Favourite Films</h2>
        <div className='wrapper mt-4'>
          <Row md={2} xs={1} lg={3} xl={4} className='g-4'>
            {movieData?.map((item) => (
              <Col key={item.apiId}>
                <MovieCard movie={item} buttonvariant={'2'} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}
