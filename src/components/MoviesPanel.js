import { useEffect } from "react";
import Movie from "./Movie";
export const API_KEY = process.env.REACT_APP_API_KEY;
const MOST_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pl-PL&page=1`;

const MoviesPanel = ({ moviesToShow, setMoviesToShow, header }) => {
  useEffect(() => {
    if (!moviesToShow.length) {
      fetch(MOST_POPULAR)
        .then((response) => response.json())
        .then((data) => setMoviesToShow(data.results));
    }
  });

  const movies = moviesToShow.map((movie) => {
    if (movie.poster_path) {
      return <Movie key={movie.id} movie={movie}></Movie>;
    }
    return null;
  });
  return (
    <>
      <h2 className="header">{header}</h2>
      <div className="movies">{movies}</div>
    </>
  );
};

export default MoviesPanel;
