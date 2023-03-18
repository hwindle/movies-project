import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import NavBar from '../components/Navbar';

export default function Movies() {
  const movies = [{
    "movie_id" : 1,
    "poster_path": "../dummyData/img_01.jpg",
    "title" : "Harry Potter and the Sorcerers Stone",
    "category_name" : "Fantasy",
    "release_date" : 2001,
    "running_time" : 152,
    "rating_name" : "PG",
    "disc_format_name" : "DVD",
    "number_discs" : 2,
    "overview" : "Widescreen",
    "aspect_ratio_name" : "1.85:1",
    "status" : 1,
    "time_stamp" : "2015-09-25"
  },
  {
    "movie_id" : 2,
    "poster_path": "../dummyData/img_02.jpg",
    "title" : "Harry Potter and the Chamber of Secrets",
    "category_name" : "Fantasy",
    "release_date" : 2002,
    "running_time" : 161,
    "rating_name" : "PG",
    "disc_format_name" : "DVD",
    "number_discs" : 2,
    "viewing_format_name" : "Widescreen",
    "overview" : "1.85:1",
    "status" : 1,
    "time_stamp" : "2015-09-25"
  },
  {
    "movie_id" : 2,
    "poster_path": "../dummyData/img_03.jpg",
      "title" : "The Two Towers",
      "source" : "Lord of the Rings",
      "overview" : "Middle Earth",
      "order" : 2,
      "category_name" : "Fantasy",
      "release_date" : 2002,
      "running_time" : 179,
      "rating_name" : "PG-13",
      "disc_format_name" : "Blu-ray",
      "number_discs" : 2,
      "viewing_format_name" : "Widescreen",
      "aspect_ratio_name" : " 2.40:1",
      "status" : 1,
      "time_stamp" : "2011-12-22"
    }
];

  return (
    <>
      <NavBar />
      <Container className='mt-4'>
        <div className='wrapper mt-4'>
          <Row md={3} xs={1} lg={4} className='g-4'>
            {movies?.map((item) => (
              <Col key={item.movie_id}>
                <MovieCard movie={item} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}
