import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/Navbar";
import InfoModal from "../components/InfoModal";

function Home() {
  const [movieData, setMovieData] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [showItems, setShowItems] = useState(false);

  // state for info modal
  const [infoModalData, setInfoModalData] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleClose = () => setShowInfoModal(false);

  const infoHandler = async (idx) => {
    console.log(idx);
    const movieId = movieData[idx].id;
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
      console.log("error in acquiring movie data by id");
      alert("Error in acquiring movie information");
    }
  };

  const favHandler = async (idx) => {
    const { id, title, poster_path, overview, release_date } = movieData[idx];
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
      alert("Error in adding to favourites collection");
    }
  };

  useEffect(() => {
    try {
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
  return (
    <>
      <NavBar />
      <Container className="mt-4" fluid>
        <Row md={2} xs={1} lg={3} xl={4} className="g-4">
          {showEmpty && <p>Your List is Empty ¯\_(ツ)_/¯</p>}
          {showItems &&
            movieData.map((item, index) => (
              <Col key={index}>
                <MovieCard
                  movie={item}
                  buttonvariant="1"
                  favhandler={favHandler}
                  infohandler={infoHandler}
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
