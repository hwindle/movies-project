import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
// api stuff
import { filmByTitleActor } from "../MovieAPI/MovieAPI";
import axios from "axios";
import InfoModal from "../components/InfoModal";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSubmitStatus, setSearchSubmitStatus] = useState(false);
  // state for the movies results
  const [movieData, setMovieData] = useState([]);

  const handleClose = () => setShowInfoModal(false);
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchSubmitStatus(true);
    setSearchTerm(e.target.value);
    // actually search for movies, passing in prop here
    searchMovies(searchTerm);
    //console.log(searchTerm);
    setSearchTerm("");
    // once the movie state is set
    setSearchSubmitStatus(false);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (searchSubmitStatus) {
      console.log(searchTerm);
    }
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
      case 'delete': //delHandler(index);
        break;
      default:
        break;
    }
  };

  const infoHandler = async (i) => {
    console.log('Hey we are in the movie info handler');
    //  let i = e.target.attributes.getNamedItem("idx").value;
    console.log(i, '  index value');

    const movieId = movieData[i].id;

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
      console.log('error in acquiring movie data by id');
      alert('Error in acquiring movie information');
    }
  };

  // add to favourites handler


  const favHandler = async (i) => {
    console.log('Hey we are in the add to favourites handler');
    //  let i = e.target.attributes.getNamedItem('idx').value;
    console.log(i, '  index value');

    const { id, title, poster_path, overview, release_date } = movieData[i];

    const favData = {
      id: id,
      title: title,
      poster_path: poster_path,
      overview: overview,
      release_date: release_date,
    };

    try {
      console.log("calling async api");

      const postUrl = `${process.env.REACT_APP_BE_LOCAL}/movies`;
      console.log(postUrl);
      const newFavouritesData = await axios.post(postUrl, favData);

      // newFavouritesData contains new favourites list items
      // this doesn't need to be used but can be console logged
      // for info purposes
      console.log(newFavouritesData);
    } catch (error) {
      console.log(error);
      console.log("error in adding to favourites list");
      alert("Error in adding to favourites collection");
    }
  };

  // search the API for films
  const searchMovies = async (searchTerm) => {
    const cleanedSearchTerm = searchTerm.replace(/\s{1,}/g, "+");
    const results = await filmByTitleActor(cleanedSearchTerm.trim());
    setMovieData(results.results);
    //console.dir(results);
    //console.dir(movieData);
  };

  return (
    <>
      <NavBar />

      <Container className="mt-4" fluid>
        <div className="wrapper mt-4">
          <SearchBar
            handleSearch={handleSearch}
            onChangeHandler={onChangeHandler}
            value={searchTerm}
          />
          <Row md={2} xs={1} lg={3} xl={4} className="g-4 mt-3">
            {movieData?.map((item, index) => (
              <Col key={item.id}>
                <MovieCard
                  movie={item}
                  handler={mainHandler}
                  //favhandler={favHandler}
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
        />

      </Container>
    </>
  );
}
