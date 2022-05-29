import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Footer from "./Components/Footer";
import AnimatedRoutes from "./Components/AnimatedRoutes";

function App() {
  return (
    <div className="main-container">
      <Router>
        <AnimatedRoutes />
        <Footer />
      </Router>
    </div>
  );
}

export default App;

// https://netflix-clone-d129a.web.app/

// url = "https://api.themoviedb.org/3/movie/550?api_key=d19484decef0947a0dea8b9acf1cdb6a"
// key = "d19484decef0947a0dea8b9acf1cdb6a"

// Object-Fit contain
