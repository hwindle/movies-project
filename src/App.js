import "./App.css";
import MovieRouter from "./Router/MovieRouter";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext/UserContext";
import { useState } from "react";
import { FavouriteContext } from "./FavouriteContexts/FavouriteContext";
import Home from "./pages/Home";
import { BrowserRouter as Router } from "react-router-dom";
import MovieNavBar from "./components/MovieNavbar";

function App() {
  const { isAuthenticated, user } = useAuth0();
  // These two variables belong with the favourites context
  const [showStar, setShowStar] = useState(false);
  const [numFavourites, setNumFavourites] = useState(0);
  // favourites context values object
  const favContextValues = {
    show: { showStar, setShowStar },
    numberAdded: { numFavourites, setNumFavourites },
  };

  return (
    <Router>
      <UserContext.Provider value={user}>
        <FavouriteContext.Provider value={favContextValues}>
          <MovieNavBar />
          <>
            {isAuthenticated && <MovieRouter />}
            {!isAuthenticated && <Home />}
          </>
        </FavouriteContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
