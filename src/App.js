import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import BookNow from "./BookNow";
import About from "./About";
import Contact from "./Contact";
import SelectAddress from "./SelectAddress";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/book" exact element={<BookNow />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/selectAddress" exact element={<SelectAddress />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
