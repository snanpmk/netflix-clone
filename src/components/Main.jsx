import React, { useState, useEffect } from "react";
import requests from "../requests";
import axios from "axios";

const Main = () => {
  const [Movies, setMovies] = useState([]);
  const [Movie, setMovie] = useState(null); // Initialize Movie as null

  useEffect(() => {
    axios.get(requests.requestToprated).then((response) => {
      setMovies(response.data.results);

      // Select a random movie after the data has been fetched
      const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)];
      setMovie(randomMovie);
    });
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    }
    return str;
  };

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        {Movie && ( // Render image and content only if Movie is available
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${Movie.backdrop_path}`}
            alt={Movie?.title}
          />
        )}
        <div className="absolute w-full top-[20%] px-4 md:p-8">
          {Movie && ( // Render content only if Movie is available
            <>
              <h1 className="text-3xl md:text-5xl font-bold">{Movie?.title}</h1>
              <div className="my-4">
                <button className="bg-gray-300 border border-gray-300 py-2 px-5 text-black hover:bg-white">
                  Play
                </button>
                <button className="border border-gray-300 py-2 px-5 text-white ml-4 hover:border-white">
                  Watch Later
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                Release: {Movie?.release_date}
              </p>
              <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[34%] text-gray-200">
                {truncateString(Movie?.overview, 120)}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
