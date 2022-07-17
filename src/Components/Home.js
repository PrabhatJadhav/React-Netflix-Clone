import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
// import instance from "../axios";
import {
  trending,
  originals,
  topRated,
  actionMovies,
  romanceMovies,
} from "../API";
import Row from "./Row";
import youtubeUrl from "../youtubeUrl";
import "../main.css";
import plus from "../Media/add.png";
import check from "../Media/check.png";
import ReactPlayer from "react-player";
import closeIcon from "../Media/cancel.png";
import { SpinnerDotted } from "spinners-react";

function Home() {
  const [movies, setMovies] = useState([]);
  const [show, handleShow] = useState(false);
  const [play, setPlay] = useState({});
  const [list, setList] = useState({
    status: "Add",
    listStatus: "",
  });
  const [addToList, setAddToList] = useState(plus);
  const [displayList, setdisplayList] = useState(false);
  const [showTrailer, setTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
    const data = trending;
    const random = Math.floor(Math.random() * 8) + 0;
    const banner = data[random];
    setMovies(banner);
    setTimeout(() => {
      setPlay(banner);
    }, 3000);
  }, []);

  const handleClick = async (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
    if (list.status === "Add") {
      setList({ status: "Done", listStatus: "Added to your List" });
      setAddToList(check);
      setdisplayList(true);
      setTimeout(() => {
        setdisplayList(false);
      }, 4000);
    } else {
      setList({ status: "Add", listStatus: "Removed from List" });
      setAddToList(plus);
      setdisplayList(true);
      setTimeout(() => {
        setdisplayList(false);
      }, 4000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <SpinnerDotted
        className="loader"
        size="5rem"
        color="rgb(220,20,60)"
        enabled={loading}
      />
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
            backgroundImage: `url(${movies?.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
          }}
        >
          <div className={`navbar-pos ${show && "nav-black-bg"}`}>
            <Navbar />
          </div>
          <div className="banner-bg">
            <div className={`added-movie ${displayList ? "display-b" : ""} `}>
              <p> {list.listStatus} </p>
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
                  {list.status}
                </button>
              </div>
              <p className="color-white">{movies?.overview}</p>
            </div>
            <div className="fadeBottom"></div>
          </div>
        </header>

        <Row title={"NETFLIX ORIGINAL"} data={originals} />
        <Row title={"Trending Now"} data={trending} />
        <Row title={"Top Rated"} data={topRated} />
        <Row title={"Action Movies"} data={actionMovies} />
        <Row title={"Romance Movies"} data={romanceMovies} />
      </div>
    </motion.div>
  );
}

export default Home;
