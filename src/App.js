import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import { useState } from 'react';
import { FavouriteContext } from './FavouriteContexts/FavouriteContext';


function App() {
  // These two variables belong with the favourites context
  const [showStar, setShowStar] = useState(false);
  const [numFavourites, setNumFavourites] = useState(0);
  // favourites context values object
  const favContextValues = {
    show: {showStar, setShowStar},
    numberAdded: {numFavourites, setNumFavourites}
  };

  return (
    // TODO: Implement code splitting

    <>
      <FavouriteContext.Provider
        value={favContextValues}
      >
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Movies />} />
        {/* Search all movies from TMDB */}
        <Route path="/search" element={<Search />} />
        {/* <Route path='/:movieid' element={<ShowInfo />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </FavouriteContext.Provider>
    </>
  );
}

//export default App;
// module.exports = {
//   UserContext: App.UserContext,
// }
export default App;
