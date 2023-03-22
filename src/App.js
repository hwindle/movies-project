import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
//import { createContext, useState } from 'react';

function App() {
  // const [showStar, setStarVisible] = useState({});
  // const UserContext = createContext({
  //   showStar: showStar,
  //   setStarVisible: setStarVisible,
  // });
  // exports.UserContext = UserContext;

  return (
    // TODO: Implement code splitting

    <>
      {/* <UserContext.Provider
        value={{ showStar: showStar, setStarVisible: setStarVisible }}
      > */}
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Movies />} />
        {/* Search all movies from TMDB */}
        <Route path="/search" element={<Search />} />
        {/* <Route path='/:movieid' element={<ShowInfo />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </UserContext.Provider> */}
    </>
  );
}

//export default App;
// module.exports = {
//   UserContext: App.UserContext,
// }
export default App;
