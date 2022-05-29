import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "../axios";
import requests from "../requests";
import "../main.css";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [show, handleShow] = useState(false);
  const [list, setList] = useState("Add");
  const [play, setPlay] = useState({});
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

  const handleClick = (data) => {
    if (data === undefined) {
      alert("Link not ready yet, Try again!");
    } else {
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
    }
  };

  function handleList() {
    if (list === "Add") {
      setList("Added");
    } else if (list === "Added") {
      setList("Add");
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
