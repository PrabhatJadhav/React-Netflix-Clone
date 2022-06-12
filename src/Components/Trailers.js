import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ReactPlayer from "react-player";
import youtubeUrl from "../youtubeUrl";
import { motion } from "framer-motion";
import { SpinnerDotted } from "spinners-react";

function Trailers() {
  const [trailer, setTrailer] = useState("");
  const [show, handleShow] = useState(false);
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

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);
    if (e === null) {
      alert("Search bar is empty.");
    } else {
      // console.log(process.env.REACT_APP_YT_KEY);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      const searchInput = document.querySelector(".search-bar").value;
      const baseVideoUrl = "http://www.youtube.com/watch?v=";
      const response = await youtubeUrl.get("/search", {
        params: {
          q: searchInput + " trailer",
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
      // document.querySelector(".search-bar").value = " ";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
      className="height"
    >
      <div className={`navbar-pos ${show && "nav-black-bg"}`}>
        <Navbar />
      </div>
      <div className="trailer-container">
        <SpinnerDotted
          className="loader"
          size="5rem"
          color="rgb(220,20,60)"
          enabled={loading}
        />
        <div className="trailer-bg">
          <div className="search-container">
            <form onSubmit={handleSubmit}>
              <input
                className="search-bar"
                required
                placeholder="Search Here..."
              />
              <button className="trailer-btn" onClick={handleSubmit}>
                Watch !
              </button>
            </form>
          </div>
          <div className="trailer-player">
            {trailer && (
              <div className="player-wrapper">
                <ReactPlayer
                  className="react-player"
                  url={trailer}
                  width="70%"
                  height="95%"
                  controls={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Trailers;

//
