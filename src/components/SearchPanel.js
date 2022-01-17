import { useState } from "react";
import { useTransition, animated } from "react-spring";
import { API_KEY, MOST_POPULAR, UPCOMING, TOP_RATED } from "../App";

const genres = {
  genres: [
    {
      id: 28,
      name: "Akcja",
    },
    {
      id: 12,
      name: "Przygodowy",
    },
    {
      id: 16,
      name: "Animacja",
    },
    {
      id: 35,
      name: "Komedia",
    },
    {
      id: 80,
      name: "Kryminał",
    },
    {
      id: 99,
      name: "Dokumentalny",
    },
    {
      id: 18,
      name: "Dramat",
    },
    {
      id: 10751,
      name: "Familijny",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "Historyczny",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Muzyczny",
    },

    {
      id: 10749,
      name: "Romans",
    },
    {
      id: 878,
      name: "Sci-Fi",
    },

    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "Wojenny",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};

const SearchPanel = ({ setMoviesToShow, setHeader }) => {
  const [genresVisible, setGenresVisible] = useState(false);
  const [title, setTitle] = useState("");

  const transition = useTransition(genresVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const getData = (api, header) => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => setMoviesToShow(data.results));

    setTitle("");
    setHeader(header);
  };

  const getDataByTitle = (e) => {
    setTitle(e.target.value);
    if (title) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pl-PL&query=${title}&page=1&include_adult=false`
      )
        .then((response) => response.json())
        .then((data) => setMoviesToShow(data.results));
    }
    setHeader("Znalezione");
  };

  const getLikedMovies = () => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    if (movies.length) {
      setMoviesToShow(movies);
      setHeader("Polubione filmy");
    } else {
      setHeader("Brak polubionych");
      setMoviesToShow([]);
    }
  };
  const genreHandler = (e) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pl-PL&with_genres=${e.target.id}`
    )
      .then((response) => response.json())
      .then((data) => setMoviesToShow(data.results));

    setTitle("");
    setHeader(e.target.innerText);
  };

  const genresList = genres.genres.map((genre) => (
    <div onClick={genreHandler} className="genre" key={genre.id} id={genre.id}>
      {genre.name}
    </div>
  ));
  return (
    <>
      <div className="search-panel">
        <input
          className="search-panel-input"
          value={title}
          onChange={getDataByTitle}
          type="text"
          placeholder="Wpisz tytuł"
        />
        <div className="search-panel-buttons">
          <button
            className="search-panel-button"
            onClick={() => setGenresVisible((visible) => !visible)}
          >
            {!genresVisible ? "Szukaj po gatunku" : "Ukryj"}
          </button>
          <button
            className="search-panel-button"
            onClick={() => getData(MOST_POPULAR, "Popularne filmy")}
          >
            Najpopularniejsze filmy
          </button>
          <button
            className="search-panel-button"
            onClick={() => getData(TOP_RATED, "Najlepiej oceniane filmy")}
          >
            Najlepiej oceniane
          </button>
          <button
            className="search-panel-button"
            onClick={() => getData(UPCOMING, "Nadchodzące premiery")}
          >
            Nadchodzące
          </button>
          <button className="search-panel-button" onClick={getLikedMovies}>
            Polubione filmy
          </button>
        </div>

        {transition((style, item) =>
          item ? (
            <animated.div style={style} className="genres">
              {genresList}
            </animated.div>
          ) : null
        )}
      </div>
    </>
  );
};

export default SearchPanel;
