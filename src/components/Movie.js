import { useState } from "react";
import Heart from "react-heart";

const Movie = ({ movie }) => {
  const [isActive, setIsActive] = useState(false);

  const saveToLocalStorage = (m) => {
    const movie = {
      id: m.id,
      poster: m.poster_path,
      title: m.title,
      vote: m.vote_average,
      overview: m.overview,
    };

    if (localStorage.hasOwnProperty("movies")) {
      let movies = JSON.parse(localStorage.getItem("movies"));
      const movieToDelete = movies.filter((movie) => movie.id === m.id);
      console.log(movieToDelete);
      if (!movieToDelete.length) {
        movies.push(movie);
        console.log("CHUJ");
      } else {
        const index = movies.findIndex((movie) => movie.id === m.id);
        movies.splice(index, 1);
      }

      localStorage.setItem("movies", JSON.stringify(movies));
    } else {
      const movies = [movie];
      localStorage.setItem("movies", JSON.stringify(movies));
    }
  };
  const heartButtonHandler = (m) => {
    setIsActive(!isActive);
    saveToLocalStorage(m);
  };

  return (
    <div key={movie.id} className="movie">
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt="brak plakatu"
      />
      <div className="heart-container">
        <div className="heart">
          <Heart
            style={{ fill: isActive ? "red" : "grey" }}
            inactiveColor="grey"
            isActive={isActive}
            onClick={() => heartButtonHandler(movie)}
            animationTrigger="hover"
            animationScale={1.2}
          />
        </div>
      </div>

      <div className="info">
        <h3>{movie.title}</h3>
        <div className="vote">{movie.vote_average}</div>

        <div className="overview">
          <button>Zobacz więcej</button>
          {movie.overview}
        </div>
      </div>
    </div>
  );
};

export default Movie;
