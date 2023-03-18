import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

function MovieDetailsModal(props) {
  const { movieId } = props;

  const [modalShow, setModalShow] = useState(false);
  const [movieInfo, setMovieInfo] = useState();
  const [movieCast, setMovieCast] = useState([]);

  const baseMovieUrl = 'https://api.themoviedb.org/3/';

  const fetchMovieDetails = async () => {
    const { data } = await axios.get(
      `${baseMovieUrl}movie/${movieId}?api_key=${REACT_APP_TMDB_KEY}&language=en-US`
    );
    setMovieInfo(data);
  };

  const fetchMovieCast = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${REACT_APP_TMDB_KEY}&language=en-US`
    );
    setMovieCast(data.cast);
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCast();
  }, [movieId]);

  const imageStyles = {
    borderRadius: 5,
    boxShadow: 'rgb(46 255 14 / 10%) -1px -1px 57px 1px',
    width: 350,
    height: 500,
    objectFit: 'cover',
  };

  return (
    <>
      <Container>
        <div className='wrapper mt-4'>
          <div id='movie-info' className=' d-flex gap-5'>
            <img
              style={imageStyles}
              src={`${movieInfo?.backdrop_path}`}
              alt='movie thumnail'
            />
            <div className='mt-5'>
              <h3 style={{ fontSize: 33, color: 'white' }}>
                {movieInfo?.title}
              </h3>

              <p style={{ color: '#a5a5a5', marginTop: 15, lineHeight: 1.8 }}>
                {movieInfo?.overview}
              </p>
              <p style={{ color: '#a5a5a5', fontWeight: 'bold' }}>
                Release Date: {movieInfo?.release_date}
              </p>
              <button
                onClick={() => setModalShow(true)}
                style={{
                  background: '#00CE79',
                  border: 'none',
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 500,
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
                className='btn btn-primary'>
                
              </button>
            </div>
          </div>
          <div className='mt-5'>
            <h2 style={{ color: 'white' }}>Cast</h2>
            <div className='d-flex flex-wrap gap-5 mt-5'>
              {movieCast?.map((cast) => (
                <div
                  key={cast.id}
                  style={{ display: 'grid', placeItems: 'center' }}>
                  {/* <LazyLoadImage
                    width={100}
                    height={100}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '100%',
                    }}
                    src={`${IMAGE_LINK}${cast.profile_path}`}
                    alt='user'
                  /> */}
                  <p
                    className='m-0 mt-2 mb-1 '
                    style={{ color: 'white', textAlign: 'center' }}>
                    {cast.name}
                  </p>
                  <p style={{ color: 'white', textAlign: 'center' }}>
                    {cast.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default MovieDetailsModal;
