import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';

import NotFound from './pages/NotFound';

function App() {
  return (
    // TODO: Implement code splitting

    <>
      <Routes>
        {/* Landing page */}
        <Route path='/' element={<Home />} />
        <Route path='/favourites' element={<Movies />} />
        {/* Search all movies from TMDB */}
        <Route path='/search' element={<Search />} />
        {/* <Route path='/:movieid' element={<ShowInfo />} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
