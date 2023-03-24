import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import NavBar from '../components/Navbar';
import { favouriteFilms } from '../MovieAPI/MovieAPI';
import InfoModal from '../components/InfoModal';
import axios from 'axios';
import { useContext } from 'react';
import { FavouriteContext } from '../FavouriteContexts/FavouriteContext';

export default function Movies() {
  // handlers for movie card icons/buttons
  // state for info modal
  const [infoModalData, setInfoModalData] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleClose = () => setShowInfoModal(false);

  const mainHandler = (iconFunction, index) => {
    switch (iconFunction) {
      case 'info':
        infoHandler(index);
        break;
      case 'favourite': //favHandler(index);
        break;
      case 'delete':
        delHandler(index);
        break;
      default:
        break;
    }
  };

  const infoHandler = async (i) => {
    console.log('Hey we are in the movie info handler');
    //let i = e.target.attributes.getNamedItem('idx').value;
    //console.log(i, '  index value');

    const movieId = movieData[i].id;

    let movieInfoData;

    // get data from id

    try {
      console.log('calling async api');

      const getUrl = `${process.env.REACT_APP_BE_PROD}/moviedetails?id=${movieId}`;
      console.log(getUrl);
      movieInfoData = await axios.get(getUrl);
      setInfoModalData(movieInfoData.data);
      setShowInfoModal(true);
      //setModalClose(false);
      console.log(movieInfoData);
    } catch (error) {
      setInfoModalData([]);
      console.log(error);
      console.log('error in acquiring movie data by id');
      alert('Error in acquiring movie information');
    }
  };

  // delete handler function

  const delHandler = async (i) => {
    console.log('hey we are in the delete handler');

    //let i = e.target.attributes.getNamedItem('idx').value;
    console.log(i, '  index value');

    if (window.confirm('Do you want to delete movie?')) {
      console.log('in delete');
      try {
        console.log('calling async api');
        const tempObj = movieData[i];

        const idStr = tempObj._id;
        console.log(idStr);
        const deleteUrl = `${process.env.REACT_APP_BE_PROD}/movies/${idStr}`;
        console.log(deleteUrl);
        const newFavouritesData = await axios.delete(deleteUrl);

        setMovieData(newFavouritesData.moviesArray);
      } catch (error) {
        console.log(error);
        alert(`error in delete request`);

        //response.status(500).send("error in request for images");
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

  // useEffect - on first render
  useEffect(() => {
    getFavourites();
  }, [movieData]);

  // clear favourites counter now we are in favourites

  const { show, numberAdded } = useContext(FavouriteContext);

  numberAdded.setNumFavourites(0);
  show.setShowStar(false);
  window.localStorage.setItem('favCounter', '0');

  return (
    <>
      <NavBar />
      <Container className="mt-4" fluid>
        <h2 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7' }}>
          Favourite Films
        </h2>
        <div className="wrapper mt-4">
          <Row md={2} xs={1} lg={3} xl={4} className="g-4">
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
        />
      </Container>
    </>
  );
}
