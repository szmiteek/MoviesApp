import MoviesPanel from "./components/MoviesPanel";
import SearchPanel from "./components/SearchPanel";

import { useState, useEffect } from "react";

export const API_KEY = process.env.REACT_APP_API_KEY;
export const UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=pl-PL&page=1`;
export const TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pl-PL&page=1`;
export const MOST_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pl-PL&page=1`;

const App = () => {
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [header, setHeader] = useState("Popularne filmy");

  useEffect(() => {
    fetch(MOST_POPULAR)
      .then((response) => response.json())
      .then((data) => setMoviesToShow(data.results));
  }, []);
  return (
    <>
      <div className="App">
        <SearchPanel
          setMoviesToShow={setMoviesToShow}
          setHeader={setHeader}
        ></SearchPanel>
        <MoviesPanel moviesToShow={moviesToShow} header={header} />
      </div>
    </>
  );
};

export default App;
