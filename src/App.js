import MoviesPanel from "./components/MoviesPanel";
import SearchPanel from "./components/SearchPanel";
import { useState } from "react";

const App = () => {
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [header, setHeader] = useState("Popularne filmy");

  return (
    <>
      <div className="App">
        <SearchPanel
          setMoviesToShow={setMoviesToShow}
          setHeader={setHeader}
        ></SearchPanel>
        <MoviesPanel
          moviesToShow={moviesToShow}
          setMoviesToShow={setMoviesToShow}
          header={header}
        />
      </div>
    </>
  );
};

export default App;
