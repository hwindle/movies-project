import axios from 'axios';

/**
 * Gather all trending movies from TMDB - new film releases
 * @param {*} query 
 * @returns 
 */
export const getTrendingFilms = async () => {
  const trending = await axios.get(
    `${process.env.REACT_APP_BE_PROD}/moviesapi`
  );
  console.dir(trending.data);
  return trending.data;
}

/***
 * Search the API for films with a title or actor name
 */
export const filmByTitleActor = async (query) => {
  if (!query || query.length < 2) {
    return 'Query string too short';
  }
  try {
    const results = await axios.get(
      `${process.env.REACT_APP_BE_PROD}/searchmovies?query=${query}`
    );
    return results.data;
  } catch (err) {
    console.error('film by title or actor error: ', err);
  }
};

/**
 * Get movie details
 * @params id of TMDB movie
 * @returns array of movie detail info
 */
export const getMovieDetails = async (id) => {
  const detailsUrl = `${process.env.REACT_APP_BE_PROD}/moviedetails?id=${id}`;
  const movieInfoData = await axios.get(detailsUrl);
  return movieInfoData.data;
};

/**
 * Get film actors/actresses - includes photos
 * @params id of TMDB movie
 * @returns array of movie cast
 */
export const getMovieCast = async (id) => {
  const castUrl = `${process.env.REACT_APP_BE_PROD}/moviecast?id=${id}`;
  const { data } = await axios.get(castUrl);
  return data.cast;
};

/***
 * Display all favourite films from MongoDB db
 */
export const favouriteFilms = async () => {
  try {
    const results = await axios.get(`${process.env.REACT_APP_BE_PROD}/movies`);
    return results.data;
  } catch (err) {
    console.error('Favourite films error: ', err);
  }
};

/**
 * Add a film to the DB
 * @params one movie object from the basic card
 * @returns true or false
 */
export const addFavFilm = async (film) => {
  const { id, title, poster_path, overview, release_date } = film;

  const favData = {
    id,
    title,
    poster_path,
    overview,
    release_date,
  };

  try {
    const postUrl = `${process.env.REACT_APP_BE_PROD}/movies`;
    await axios.post(postUrl, favData);
    return true;
  } catch (error) {
    console.log(error);
    console.error('Error in adding to favourites collection');
    return false;
  }
};
