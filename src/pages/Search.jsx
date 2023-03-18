import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NavBar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
//import { MovieCard } from '../components/MovieCard';

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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchSubmitStatus(true);
    setSearchTerm(e.target.value);
    // actually search for movies, passing in prop here
    console.log(searchTerm);
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


  return (
    <>
      <NavBar />

      {/* <Container className="mt-4">
        <div className="wrapper mt-4">
          
          <Row md={3} xs={1} lg={4} className="g-4 mt-3">
            {movieSearchResults?.map((item) => ( */}

      <Container className='mt-4'>
        <div className='wrapper mt-4'>
          <SearchBar handleSearch={handleSearch} onChangeHandler={onChangeHandler} />
          <Row md={3} xs={1} lg={4} className='g-4 mt-3'>
            {/* {movieSearchResults?.map((item) => (

              <Col key={item.id}>
                <MovieCard
                  movie={item}
                  infohandler={infoHandler}
                  favhandler={favHandler}
                />
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
