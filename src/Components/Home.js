import React from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import Row from "./Row";
import requests from "../requests";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <Banner />
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
    </motion.div>
  );
}

export default Home;
