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
        <div className="container">
          <MoviesPanel
            moviesToShow={moviesToShow}
            setMoviesToShow={setMoviesToShow}
            header={header}
          />
        </div>
      </div>
    </>
  );
};

export default App;
