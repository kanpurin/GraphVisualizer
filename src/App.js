import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
// import About from "./About"; // Aboutページのインポート
import GraphGenerator from "./GraphNetworkGenerator";
import Graph2dGenerator from "./Graph2dGenerator";
import NotFound from "./NotFound";

function App() {
  return (
		<div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<GraphGenerator />} />
          <Route path="/network-graph" element={<GraphGenerator />} />
          <Route path="/2d-graph" element={<Graph2dGenerator />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/GraphVisualizer/about" element={<About />} /> */}
        </Routes>
        <Footer />
      </Router>
		</div>
  );
}

export default App;