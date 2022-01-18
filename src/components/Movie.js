import { useState, useEffect } from "react";
import Modal from "./Modal";
import Heart from "react-heart";

const Movie = ({ movie }) => {
  const [isActive, setIsActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    LikeChecking(movie);
  });

  const saveToLocalStorage = (m) => {
    const movie = {
      id: m.id,
      poster_path: m.poster_path,
      title: m.title,
      vote_average: m.vote_average,
      overview: m.overview,
    };

    if (localStorage.hasOwnProperty("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      const movieToDelete = movies.filter((movie) => movie.id === m.id);

      if (!movieToDelete.length) {
        movies.push(movie);
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

  const LikeChecking = (m) => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    if (movies) {
      const isLike = movies.some((movie) => movie.id === m.id);
      if (isLike) {
        setIsActive(true);
      }
    }
  };

  const heartButtonHandler = (m) => {
    setIsActive(!isActive);
    saveToLocalStorage(m);
  };

  const toggleModal = (v) => {
    setModalVisible(v);
  };

  return (
    <>
      <Modal visible={modalVisible} toggleModal={toggleModal}></Modal>
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
            <button
              className="overview-button"
              onClick={() => toggleModal(true)}
            >
              Zobacz więcej
            </button>
            {movie.overview}
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
