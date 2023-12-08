import React, { useState, useEffect, useContext } from 'react';
import { FavouriteContext } from '../FavouriteContexts/FavouriteContext';
// components
import MovieCard from '../components/MovieCard';
import InfoModal from '../components/InfoModal';
// API
import {
  deleteFavMovie,
  favouriteFilms,
  getMovieCast,
  getMovieDetails,
} from '../MovieAPI/MovieAPI';
// UI
import { Col, Container, Row } from 'react-bootstrap';


function Movies() {
  // state for info modal
  const [infoModalData, setInfoModalData] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  // State for the movie cast
  const [movieCast, setMovieCast] = useState([]);

  const handleClose = () => setShowInfoModal(false);
  // handlers for movie card icons/buttons
  const mainHandler = (iconFunction, index) => {
    switch (iconFunction) {
      case 'info':
        infoHandler(index);
        break;
      case 'delete':
        delHandler(index);
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

  // delete handler function

  const delHandler = async (i) => {
    if (window.confirm('Do you want to delete movie?')) {
      try {
        const tempObj = movieData[i];

        const mongoId = tempObj._id;
        const newFavouritesData = deleteFavMovie(mongoId);
        setMovieData(newFavouritesData.moviesArray);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // state for the movies results
  const [movieData, setMovieData] = useState([]);

  // search the database for favourite film
  const getFavourites = async () => {
    const results = await favouriteFilms();
    setMovieData(results);
  };

  // clear favourites counter now we are in favourites
  const { show, numberClicked, totalFavs } = useContext(FavouriteContext);
  numberClicked.setNumFavourites(0);
  show.setShowStar(false);
  console.log(`set counter favs: ${movieData?.length}`);
  window.localStorage.setItem('favCounter', String(totalFavs.setCounterFavs));

  // useEffect - on first render
  useEffect(() => {
    getFavourites();
    totalFavs.setCounterFavs(movieData?.length);
  }, [movieData, totalFavs]);

  

  return (
    <>
      <Container className='mt-4' fluid>
        <h2 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7' }}>
          Favourite Films
        </h2>
        <div className='wrapper mt-4'>
          <Row md={2} xs={1} lg={3} xl={4} className='g-4'>
            {movieData?.map((item, index) => (
              <Col>
                <MovieCard
                  movie={item}
                  handler={mainHandler}
                  buttonvariant={'2'}
                  idx={index}
                  key={item.apiId}
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

export default Movies;
