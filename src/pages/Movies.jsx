import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import NavBar from '../components/Navbar';
import { favouriteFilms } from '../MoviesAPI/MoviesAPI';

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
    setMovieData(results.results);
  };

  // useEffect - on first render
  useEffect(() => {
    getFavourites();
  }, []);


  return (
    <>
      <NavBar />
      <Container className='mt-4'>
        <h2 style={{ textAlign: 'center' }}>Favourite Films</h2>
        <div className='wrapper mt-4'>
          <Row md={3} xs={1} lg={4} className='g-4'>
            {movieData?.map((item) => (
              <Col key={item.movie_id}>
                <MovieCard movie={item} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}
