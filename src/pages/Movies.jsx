import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/Navbar";
import { favouriteFilms } from "../MovieAPI/MovieAPI";
import InfoModal from "../components/InfoModal";
import axios from "axios";

export default function Movies() {
  // handlers for movie card icons/buttons
  // state for info modal
  const [infoModalData, setInfoModalData] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleClose = () => setShowInfoModal(false);
  const infoHandler = async (idx) => {
    // console.log("Hey we are in the movie info handler");
    // let i = e.target.attributes.getNamedItem("idx").value;
    // console.log(i, "  index value");

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
      console.log(movieInfoData);
    } catch (error) {
      setInfoModalData([]);
      console.log(error);
      console.log("error in acquiring movie data by id");
      alert("Error in acquiring movie information");
    }
  };

  // delete handler function

  const delHandler = async (idx) => {
    console.log("hey we are in the delete handler");

    // let i = e.target.attributes.getNamedItem('idx').value;
    // console.log(i, '  index value');

    if (window.confirm("Do you want to delete movie?")) {
      console.log("in delete");
      try {
        console.log("calling async api");
        const tempObj = movieData[idx];
        const idStr = tempObj._id;
        console.log(idStr);
        const deleteUrl = `${process.env.REACT_APP_BE_LOCAL}/movies/${idStr}`;
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

  return (
    <>
      <NavBar />
      <Container className="mt-4" fluid>
        <h2 style={{ textAlign: "center", color: "rgba(255, 255, 255, 0.7" }}>
          Favourite Films
        </h2>
        <div className="wrapper mt-4">
          <Row md={2} xs={1} lg={3} xl={4} className="g-4">
            {movieData?.map((item, index) => (
              <Col key={item.apiId}>
                <MovieCard
                  movie={item}
                  infohandler={infoHandler}
                  delhandler={delHandler}
                  buttonvariant={"2"}
                  idx={index}
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
