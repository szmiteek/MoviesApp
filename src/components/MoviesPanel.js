import Movie from "./Movie";

const MoviesPanel = ({
  moviesToShow,

  header,
}) => {
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
