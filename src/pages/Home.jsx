import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import NavBar from '../components/Navbar';
import InfoModal from '../components/InfoModal';
import { useContext } from 'react';
import { Star } from 'react-bootstrap-icons';
//import UserContext from '../App';


function Home() {
  const [movieData, setMovieData] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [showItems, setShowItems] = useState(false);

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
      case 'delete': //delHandler(index);
        break;
      default:
        break;
    }
  };

  const infoHandler = async (i) => {
    console.log('Hey we are in the movie info handler');
    //let i = e.target.attributes.getNamedItem('idx').value;
    console.log(i, '  index value');

    const movieId = movieData[i].id;
    console.log(movieData[i].id);

    let movieInfoData;

    // get data from id

    try {

      console.log("calling async api");


      const getUrl = `${process.env.REACT_APP_BE_LOCAL}/moviedetails?id=${movieId}`;
      console.log(getUrl);
      movieInfoData = await axios.get(getUrl);
      setInfoModalData(movieInfoData.data);
      setShowInfoModal(true);
      console.log(infoModalData);
      console.log(showInfoModal);
    } catch (error) {
      setInfoModalData([]);
      console.log(error);
      console.log('error in acquiring movie data by id');
      alert('Error in acquiring movie information');
    }
  };


  const favHandler = async (i) => {
    // let i = e.target.attributes.getNamedItem('idx').value;

    const { id, title, poster_path, overview, release_date } = movieData[i];

    const favData = {
      id: id,
      title: title,
      poster_path: poster_path,
      overview: overview,
      release_date: release_date,
    };

    try {
      const postUrl = `${process.env.REACT_APP_BE_LOCAL}/movies`;
      await axios.post(postUrl, favData);
    } catch (error) {
      console.log(error);
      alert('Error in adding to favourites collection');
    }
  };

  useEffect(() => {
    try {
      console.log(`${process.env.REACT_APP_BE_LOCAL}/moviesapi`);
      const getMovies = async () => {
        const movieData = await axios.get(
          `${process.env.REACT_APP_BE_LOCAL}/moviesapi`
        );
        if (movieData.data.results.length > 0) {
          console.log(movieData.data.results);
          setMovieData(movieData.data.results);
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

  console.log(infoModalData);

  return (
    <>
      <NavBar />
      <Container className="mt-4" fluid>
        <Row md={2} xs={1} lg={3} xl={4} className="g-4">
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
                  buttonvariant="1"
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
        />

      </Container>
    </>
  );
}

export default Home;
