import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface Movies {
  attributes: {
    Title: string;
    Description: string;
    Genre: string;
    Release_Date: string;
  };
}

interface Movie {
  Title: string;
  Description: string;
  Genre: string;
  Release_Date: string;
}

function App() {
  const [movies, setMovies] = useState<Movies[] | null>(null);
  const [movie, setMovie] = useState<any>(null);

  const getMovies = async () => {
    const movies = await axios.get("http://localhost:1337/api/movies");

    console.log(movies);
    setMovies(movies.data.data);
  };

  const createMovie = async () => {
    const config = {
      headers: {
        Authorization:
          "Bearer 5d34c6b92698af625b87eccfebd33b9c730415990969631eb85b7a1856c3939c18016d2da3a8a00567aaed90856803dc591ae3fa5243a991c94f5128cf90c76d7c528fc437477b7039019667c0135d643bea5b62b3847a8f893737472b2efdc941d42a08e359003cb9a4f267e0d52a5f67c0ca7b6ca13d22a0ff4df1ed1b20c2",
      },
    };

    console.log(movie);
    const _movie = await axios.post(
      "http://localhost:1337/api/movies",
      { data: movie },
      config
    );

    console.log(_movie);
  };

  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setMovie((movie) => ({
      ...movie,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div>
        {movies &&
          movies.map((movie, index) => (
            <div key={index}>
              <h1>{movie.attributes.Title}</h1>
              <p>{movie.attributes.Description}</p>
              <h3>{movie.attributes.Genre}</h3>
              <h3>{movie.attributes.Release_Date}</h3>
            </div>
          ))}
      </div>

      <div>
        <input placeholder="Title" name="Title" onChange={handleOnChange} />
        <input
          placeholder="Description"
          name="Description"
          onChange={handleOnChange}
        />
        <input
          placeholder="Release Date"
          name="Release_Date"
          onChange={handleOnChange}
        />
        <input placeholder="Genre" name="Genre" onChange={handleOnChange} />
        <button onClick={createMovie}>Create Movie</button>
      </div>
    </>
  );
}

export default App;
