import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "../axios";
import requests from "../requests";
import youtubeUrl from "../youtubeUrl";
import "../main.css";
import plus from "../Media/add.png";
import check from "../Media/check.png";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [show, handleShow] = useState(false);
  const [play, setPlay] = useState({});
  const [list, setList] = useState("Add");
  const [addToList, setAddToList] = useState(plus);

  const imgBaseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 275) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(requests.fetchTrending);
      //   console.log(data.data.results);
      const random = Math.floor(Math.random() * 19) + 0;
      const banner = data.data.results[random];
      setMovies(banner);
      setTimeout(setPlay(banner), 3000);
      // handleClick(banner);
      return banner;
    };
    getData();
  }, []);

  const handleClick = async (data) => {
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
        window.open(trailerLink, "_blank").focus();
        console.log(trailerLink);
        return 0;
      }
    }
  };

  function handleList() {
    if (list === "Add") {
      setList("Done");
      setAddToList(check);
    } else if (list === "Done") {
      setList("Add");
      setAddToList(plus);
    }
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${imgBaseUrl}${movies.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      <div className={`navbar-pos ${show && "nav-black-bg"}`}>
        <Navbar />
      </div>
      <div className="banner-bg">
        <div className="banner-container">
          <h1>{movies?.title || movies?.name || movies?.original_name}</h1>
          <div className="banner-buttons">
            <button
              className="banner-button"
              onClick={() => {
                handleClick(play);
              }}
            >
              Play
            </button>
            <button className="banner-button" onClick={handleList}>
              <img src={addToList} />
              {list}
            </button>
          </div>
          <p>{movies.overview}</p>
        </div>
        <div className="fadeBottom"></div>
      </div>
    </header>
  );
}

export default Banner;

// ? --> Optional chaining

//  if (data === undefined) {
//    alert("Link not ready yet, Try again!");
//  } else {
//    console.log("Movie Id-", data.id);
//    const moviePageBaseUrl = "https://www.themoviedb.org/movie/";
//    const id = data.id;
//    const title = data?.title || data?.name || data?.original_name;
//    const movieBase = moviePageBaseUrl + id + "-";
//    const movieUrl = title.toLowerCase().replace(" ", "-");
//    const finalUrl = movieBase + movieUrl;
//    // setPagerUrl({ finalUrl, title });
//    console.log("Title:-", title, "url- ", finalUrl);
//    window.open(finalUrl, "_blank").focus();
//  }
