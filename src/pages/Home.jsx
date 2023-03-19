import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/Navbar";

function Home() {
  const [movies, setMovies] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    try {
      const getMovies = async () => {
        const movieData = await axios.get(
          `${process.env.REACT_APP_BE_LOCAL}/moviesapi`
        );
        if (movieData.data.results.length > 0) {
          console.log(movieData.data.results);
          setMovies(movieData.data.results);
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
            movies.map((item, index) => (
              <Col key={index}>
                <MovieCard movie={item} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
