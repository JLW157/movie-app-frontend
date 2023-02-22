import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlMovies } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import { landingPageDTO, movieDTO } from "./movies.models";
import MoviesList from "./MoviesList";

const LandingPage = () => {
  const [movies, setMovies] = useState<landingPageDTO>();
  const [upComingMovies, setUpComingMovies] = useState<movieDTO[]>([]);
  useEffect(() => {
    loadMovies();
  }, [setMovies])

  const loadMovies = () => {
    axios.get(`${urlMovies}`).then((res: AxiosResponse<landingPageDTO>) => {
      const resData = res.data;
      console.log("Recived landing page data", resData);
      const up = resData.upcomingReleases;
      console.log("Upcoming releases", up);
      setMovies(res.data);
      setUpComingMovies(res.data.upcomingReleases);
    });
  };

  return <>
    <AlertContext.Provider value={() => { loadMovies() }}>
      {movies &&
        (<>
          <h3>In theaters</h3>
          <MoviesList movies={movies?.inTheaters} />

          <h3>Upcoming releases</h3>
          <MoviesList movies={upComingMovies} />
        </>
        )}
    </AlertContext.Provider>

  </>
};

export default LandingPage;