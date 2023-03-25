import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import Search from '../pages/Search';
import NotFound from '../pages/NotFound';
import { useAuth0 } from '@auth0/auth0-react';

function MovieRouter() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Routes>
        {/* Landing page */}
        <Route path='/' element={<Home />} />
        {isAuthenticated && <Route path='/favourites' element={<Movies />} />}

        {/* Search all movies from TMDB */}
        {isAuthenticated && <Route path='/search' element={<Search />} />}

        {/* <Route path='/:movieid' element={<ShowInfo />} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MovieRouter;
