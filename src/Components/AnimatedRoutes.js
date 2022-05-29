import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home";
import Kids from "./Kids";
import About from "./About";
import Contact from "./Contact";
import Trailers from "./Trailers";
import ErrorPage from "./ErrorPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trailers" element={<Trailers />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
