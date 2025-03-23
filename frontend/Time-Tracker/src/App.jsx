import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./components/Dashboard";
import WebsiteList from "./components/WebsiteList";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/websiteList" element={<WebsiteList />} />
        </Routes>

      </Router>
    </>
  )
}

export default App
