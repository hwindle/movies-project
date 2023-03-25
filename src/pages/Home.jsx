import React, { useEffect, useState, useContext } from 'react';
import { FavouriteContext } from '../FavouriteContexts/FavouriteContext';
import { getTrendingFilms, addFavFilm, getMovieCast, getMovieDetails } from '../MovieAPI/MovieAPI';
// UI imports
import { Col, Container, Row } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import InfoModal from '../components/InfoModal';

function Home() {
  const [movieData, setMovieData] = useState([]);
  // are there no movies?
  const [showEmpty, setShowEmpty] = useState(false);
  const [showItems, setShowItems] = useState(false);
  // state for movie actors
  const [movieCast, setMovieCast] = useState([]);
  // for the infoModal close button
  const handleClose = () => setShowInfoModal(false);

  // state for info modal
  const [infoModalData, setInfoModalData] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

  //  const updateVisibilty = useContext(UserContext);

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

  useEffect(() => {
    try {
      console.log(`${process.env.REACT_APP_BE_PROD}/moviesapi`);
      const getMovies = async () => {
        const movieData = await getTrendingFilms();
        if (movieData.results.length > 0) {
          console.log(movieData.results);
          setMovieData(movieData.results);
          setShowItems(true);
          setShowEmpty(false);
        } else {
          setShowItems(false);
          setShowEmpty(true);
        }
      };
      getMovies();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log(infoModalData);

  return (
    <>
      {/* <NavBar /> */}
      <Container className='mt-4' fluid>
        <Row md={2} xs={1} lg={3} xl={4} className='g-4'>
          {showEmpty && <p>Your List is Empty ¯\_(ツ)_/¯</p>}
          {/* {updateVisibilty.showStar && (
            <div style={{ position: 'static', top: '0', left: '0' }}>
              <Star
                data-tooltip-id="favTip"
                data-tooltip-content="Add to Favourites"
                color="gray"
                size={32}
              />
            <Tooltip id="favTip" /> 
            </div>
          )} */}
          {showItems &&
            movieData.map((item, index) => (
              <Col key={index}>
                <MovieCard
                  movie={item}
                  buttonvariant='1'
                  handler={mainHandler}
                  //favhandler={favHandler}
                  //infohandler={infoHandler}
                  idx={index}
                />
              </Col>
            ))}
        </Row>

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

export default Home;
