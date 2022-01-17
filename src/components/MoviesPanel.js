import Movie from "./Movie";

const MoviesPanel = ({
  setMoviesToShow,
  moviesToShow,
  header,
  setLikedMovies,
  likedMovies,
}) => {
  const movies = moviesToShow.map((movie) => {
    if (movie.poster_path) {
      return (
        <Movie
          setMoviesToShow={setMoviesToShow}
          likedMovies={likedMovies}
          setLikedMovies={setLikedMovies}
          key={movie.id}
          movie={movie}
        ></Movie>
      );
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
