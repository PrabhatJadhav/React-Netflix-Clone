import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import instance from "../axios";
import Row from "./Row";
import requests from "../requests";
import youtubeUrl from "../youtubeUrl";
import "../main.css";
import plus from "../Media/add.png";
import check from "../Media/check.png";
import ReactPlayer from "react-player";
import closeIcon from "../Media/cancel.png";

function Home() {
  const [movies, setMovies] = useState([]);
  const [show, handleShow] = useState(false);
  const [play, setPlay] = useState({});
  const [list, setList] = useState("Add");
  const [addToList, setAddToList] = useState(plus);
  const [displayList, setdisplayList] = useState(false);
  const [showTrailer, setTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

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
      // console.log("API Key-", process.env.REACT_APP_DATA_API);
      const data = await instance.get(requests.fetchTrending);
      // console.log(data.data.results);
      const random = Math.floor(Math.random() * 19) + 0;
      const banner = data.data.results[random];
      setMovies(banner);
      setTimeout(setPlay(banner), 3000);

      return banner;
    };
    getData();
  }, []);

  const handleClick = async (data) => {
    const baseVideoUrl = "http://www.youtube.com/watch?v=";
    const searchInput = data?.title || data?.name || data?.original_name;
    if (searchInput === undefined) {
      alert("Video not found.Please try again");
    } else {
      const response = await youtubeUrl.get("/search", {
        params: {
          q: searchInput + " official trailer",
        },
      });
      let videoData = response.data.items;
      // console.log(videoData);
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
          setTrailerUrl(trailerLink);
          setTrailer(true);
          console.log(trailerLink);
          return 0;
        } else {
          alert("Video not found.");
        }
      }
    }
  };

  function handleList() {
    if (list === "Add") {
      setList("Done");
      setAddToList(check);
      setdisplayList(true);
      setTimeout(() => {
        setdisplayList(false);
      }, 4000);
    } else if (list === "Done") {
      setList("Add");
      setAddToList(plus);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <div
        className={` home-wrapper ${
          showTrailer ? "home-player display-b" : "display-none"
        }`}
      >
        <img
          onClick={() => {
            setTrailer(false);
            setTrailerUrl("");
          }}
          className="close-icon"
          src={closeIcon}
          alt="close"
        />
        <ReactPlayer
          url={trailerUrl}
          width="100%"
          height="100%"
          controls={true}
        />
      </div>
      <div
        onClick={() => {
          setTrailer(false);
          setTrailerUrl("");
        }}
        className={` home-container ${showTrailer ? "bg-blur" : ""}`}
      >
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
            <div className={`added-movie ${displayList ? "display-b" : ""} `}>
              <p> Added to your List </p>
            </div>
            <div className="banner-container">
              <h1 className="color-white">
                {movies?.title || movies?.name || movies?.original_name}
              </h1>
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
                  <img src={addToList} alt="watchlist" />
                  {list}
                </button>
              </div>
              <p className="color-white">{movies.overview}</p>
            </div>
            <div className="fadeBottom"></div>
          </div>
        </header>

        <Row
          title={"NETFLIX ORIGINAL"}
          fetchUrl={requests.fetchNetflixOriginals}
        />
        <Row title={"Trending Now"} fetchUrl={requests.fetchTrending} />
        <Row title={"Top Rated"} fetchUrl={requests.fetchTopRated} />
        <Row title={"Action Movies"} fetchUrl={requests.fetchActionMovies} />
        <Row title={"Comedy Movies"} fetchUrl={requests.fetchComedyMovies} />
        <Row title={"Horror Movies"} fetchUrl={requests.fetchHorrorMovies} />
        <Row title={"Romance Movies"} fetchUrl={requests.fetchRomanceMovies} />
        <Row title={"Documantaries"} fetchUrl={requests.fetchDocumantaries} />
      </div>
    </motion.div>
  );
}

export default Home;
