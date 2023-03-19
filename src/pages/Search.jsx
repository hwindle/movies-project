import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NavBar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
// api stuff
import { filmByTitleActor } from '../MovieAPI/MovieAPI';

export default function Search() {

  // handlers for movie card icons/buttons

  const infoHandler = (e) => {
    console.log('Hey we are in the movie info handler');
  };

  const favHandler = (e) => {
    console.log('Hey we are in the add to favourites handler');
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchSubmitStatus, setSearchSubmitStatus] = useState(false);
  // state for the movies results
  const [movieData, setMovieData] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchSubmitStatus(true);
    setSearchTerm(e.target.value);
    // actually search for movies, passing in prop here
    searchMovies(searchTerm);
    //console.log(searchTerm);
    // once the movie state is set
    setSearchSubmitStatus(false);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (searchSubmitStatus) {
      console.log(searchTerm);
    }
  }

  // search the API for films
  const searchMovies = async (searchTerm) => {
    const cleanedSearchTerm = searchTerm.replace(/\s{1,}/g, '+');
    const results = await filmByTitleActor(cleanedSearchTerm.trim());
    setMovieData(results.results);
    //console.dir(results);
    //console.dir(movieData);
  };


  return (
    <>
      <NavBar />

      <Container className='mt-4'>
        <div className='wrapper mt-4'>
          <SearchBar handleSearch={handleSearch} onChangeHandler={onChangeHandler} />
          <Row md={3} xs={1} lg={4} className='g-4 mt-3'>
             {movieData?.map((item) => (

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
