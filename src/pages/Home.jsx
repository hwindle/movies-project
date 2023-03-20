import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/Navbar";

function Home() {
  const [movieData, setMovieData] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [showItems, setShowItems] = useState(false);

  // const infoHandler = async (e) => {
  //   console.log("Hey we are in the movie info handler");
  //   let i = e.target.attributes.getNamedItem("idx").value;
  //   console.log(i, "  index value");

  //   const movieId = movieData[i].id;
  //   let movieInfoData;

  //   // get data from id

  //   try {
  //     console.log("calling async api");

  //     const getUrl = `http://127.0.0.1:3001/moviedetails?id=${movieId}`;
  //     console.log(getUrl);
  //     movieInfoData = await axios.get(getUrl);

  //     console.log(movieInfoData);
  //   } catch (error) {
  //     movieInfoData = {};
  //     console.log(error);
  //     console.log("error in acquiring movie data by id");
  //     alert("Error in acquiring movie information");
  //   }

  //   // create modal of movie data from id sent to server for DB request

  //   return <InfoModal data={movieInfoData} />;
  // };

  const favHandler = async (e) => {
    let i = e.target.attributes.getNamedItem("idx").value;

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
      <Container className="mt-4">
        <Row md={3} xs={1} lg={4} className="g-4">
          {showEmpty && <p>Your List is Empty ¯\_(ツ)_/¯</p>}
          {showItems &&
            movieData.map((item, index) => (
              <Col key={index}>
                <MovieCard
                  movie={item}
                  buttonvariant="1"
                  favhandler={favHandler}
                  idx={index}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
