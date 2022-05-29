import React, { useEffect, useState } from "react";
import axios from "../axios";
import "../main.css";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  // const [pageUrl, setPagerUrl] = useState({ url: "", title: "" });
  const imgBaseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const getData = async () => {
      const req = await axios.get(fetchUrl);
      // "https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US"
      // For trending data.
      const response = req.data.results;
      setMovies(response);
      console.log("Response", response);
      return response;
    };
    getData();
  }, [fetchUrl]); // Always use the prop as dependency

  // console.log(movies);

  const handleClick = (data) => {
    console.log("Movie Id-", data.id);
    const moviePageBaseUrl = "https://www.themoviedb.org/movie/";
    const id = data.id;
    const title = data?.title || data?.name || data?.original_name;
    const movieBase = moviePageBaseUrl + id + "-";
    const movieUrl = title.toLowerCase().replace(" ", "-");
    const finalUrl = movieBase + movieUrl;
    // setPagerUrl({ finalUrl, title });
    console.log("Title:-", title, "url- ", finalUrl);
    window.open(finalUrl, "_blank").focus();
  };

  return (
    <div className="row-home">
      <h2>{title}</h2>
      <div className="row-poster">
        {movies.map((data) => (
          <img
            key={data.id}
            src={imgBaseUrl + data.poster_path}
            alt={movies?.title || movies?.name || movies?.original_name}
            onClick={() => handleClick(data)}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;

// For YT video

// import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer";
// var getYouTubeID = require("get-youtube-id");

// if (res == null) {
//   alert("Video Not Found.");
// } else {
//   console.log("url response-", res);
//   const id = getYouTubeID(res);
//   if (!trailerUrl) {
//     setTrailerUrl(id);
//   } else {
//     setTrailerUrl("");
//   }
// }
// In return
// {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
// const opts = {
//   height: "390",
//   width: "100%",
//   playerVars: {
//     // https://developers.google.com/youtube/player_parameters
//     autoplay: 1,
//   },
// };
