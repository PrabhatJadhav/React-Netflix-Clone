import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { SpinnerDotted } from "spinners-react";
import instance from "../axios";
import youtubeUrl from "../youtubeUrl";
import "../main.css";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [loading, setLoading] = useState(false);

  const imgBaseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const getData = async () => {
      const req = await instance.get(fetchUrl);
      const response = req.data.results;
      setMovies(response);
      // console.log(`${title} Response`, response);
      return 0;
    };
    getData();
  }, [fetchUrl]); // Always use the prop as dependency

  // console.log(movies);

  const handleClick = async (data) => {
    if (trailer === "") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
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
      <SpinnerDotted
        className="loader"
        size="5rem"
        color="rgb(220,20,60)"
        enabled={loading}
      />
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
