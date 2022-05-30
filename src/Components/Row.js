import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "../axios";
import youtubeUrl from "../youtubeUrl";
import "../main.css";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState("");
  const imgBaseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const getData = async () => {
      const req = await axios.get(fetchUrl);
      // "https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US"
      // For trending data.
      const response = req.data.results;
      setMovies(response);
      // console.log("Response", response);
      return 0;
    };
    getData();
  }, [fetchUrl]); // Always use the prop as dependency

  // console.log(movies);

  const handleClick = async (data) => {
    if (trailer === "") {
      const baseVideoUrl = "http://www.youtube.com/watch?v=";
      const searchInput = data?.title || data?.name || data?.original_name;
      const response = await youtubeUrl.get("/search", {
        params: {
          q: searchInput + " official trailer",
        },
      });
      let videoData = response.data.items;
      let videoIdArray = [];
      for (let i = 0; i < 5; i++) {
        let videoId = videoData[i].id.videoId;
        if (videoId !== null || videoId !== undefined) {
          videoIdArray.push(videoId);
        }
      }
      for (let i = 0; i < 5; i++) {
        if (videoIdArray[i] !== null || videoIdArray[i] !== undefined) {
          const trailerLink = baseVideoUrl + videoIdArray[i];
          setTrailer(trailerLink);
          console.log(trailerLink);
          return 0;
        }
      }
    } else {
      setTrailer("");
    }
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
      {trailer && (
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={trailer}
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
      )}
    </div>
  );
}

export default Row;

// ? --> Optional chaining
