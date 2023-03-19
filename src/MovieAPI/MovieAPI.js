import axios from 'axios';

export const filmByTitleActor = async (query) => {
  if (!query || query.length < 2) {
    return 'Query string too short';
  }
  try {
    const results = await axios.get(
      `${process.env.REACT_APP_BE_LOCAL}/searchmovies?query=${query}`
    );
    return results.data;
  } catch (err) {
    console.error('film by title or actor error: ', err);
  }
};

export const favouriteFilms = async () => {
  try {
    const results = await axios.get(`${process.env.REACT_APP_BE_LOCAL}/movies`);
    return results.data;
  } catch (err) {
    console.error('Favourite films error: ', err);
  }
};