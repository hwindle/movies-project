import React, { useState, useContext } from 'react';
import { FavouriteContext } from '../FavouriteContexts/FavouriteContext';
// Components
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import InfoModal from '../components/InfoModal';
// api stuff
import {
  filmByTitleActor,
  getMovieDetails,
  getMovieCast,
  addFavFilm,
} from '../MovieAPI/MovieAPI';
// UI
import { Col, Container, Row } from 'react-bootstrap';

function Search() {
  // state for search bar
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSubmitStatus, setSearchSubmitStatus] = useState(false);
  // stop warning error
  console.log(searchSubmitStatus);
  // state for the movies results
  const [movieData, setMovieData] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  // for the info modal
  const handleClose = () => setShowInfoModal(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchSubmitStatus(true);
    setSearchTerm(e.target.value);
    searchMovies(searchTerm);
    setSearchTerm('');
    // once the movie state is set
    setSearchSubmitStatus(false);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  // state for info modal
  const [infoModalData, setInfoModalData] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const mainHandler = (iconFunction, index) => {
    switch (iconFunction) {
      case 'info':
        infoHandler(index);
        break;
      case 'favourite':
        favHandler(index);
        break;

      default:
        break;
    }
  };

  const infoHandler = async (i) => {
    // console.log('Hey we are in the movie info handler');

    const movieId = movieData[i].id;

    // get data from id
    try {
      const movieDetails = await getMovieDetails(movieId);
      setInfoModalData(movieDetails);
      const castInfo = await getMovieCast(movieId);
      setMovieCast(castInfo);
      setShowInfoModal(true);
    } catch (error) {
      setInfoModalData([]);
      console.log(error);
      console.log('error in acquiring movie data by id');
      alert('Error in acquiring movie information');
    }
  };

  // useContext to inform users of movies added to DB
  const { show, numberAdded, movieCheck } = useContext(FavouriteContext);
  // handler for adding a favourite movie to the DB.
  const favHandler = async (i) => {
    // checking whether the user has clicked on the same film
    // twice
    if (!movieCheck.idArray.includes(movieData[i].id)) {
      numberAdded.setNumFavourites(numberAdded.numFavourites + 1);
      window.localStorage.setItem(
        'favCounter',
        String(numberAdded.numFavourites + 1)
      );
      show.setShowStar(true);
      const tempArray = movieCheck.idArray;
      tempArray.push(movieData[i].id);
      // console.log(tempArray);
      movieCheck.setIdArray(tempArray);
    }

    // add film to database
    if (addFavFilm(movieData[i])) {
      console.log('Film added successfully');
    } else {
      console.error(`Error adding ${i} film`);
    }
  };

  // search the API for films
  const searchMovies = async (searchTerm) => {
    // get rid of spaces in between words, replace with +
    const cleanedSearchTerm = searchTerm.replace(/\s{1,}/g, '+');
    const results = await filmByTitleActor(cleanedSearchTerm.trim());
    setMovieData(results.results);
  };

  return (
    <>
      <Container className='mt-4' fluid>
        <div className='wrapper mt-4'>
          <SearchBar
            handleSearch={handleSearch}
            onChangeHandler={onChangeHandler}
            value={searchTerm}
          />
          <Row md={2} xs={1} lg={3} xl={4} className='g-4 mt-3'>
            {movieData?.map((item, index) => (
              <Col key={item.id}>
                <MovieCard
                  movie={item}
                  handler={mainHandler}
                  idx={index}
                  buttonvariant={'1'}
                />
              </Col>
            ))}
          </Row>
        </div>

        <InfoModal
          data={infoModalData}
          show={showInfoModal}
          handleClose={handleClose}
          movieCast={movieCast}
        />
      </Container>
    </>
  );
}

export default Search;
