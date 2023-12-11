import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
// import About from "./components/About"; // Aboutページのインポート
import GraphGenerator from "./components/GraphNetworkGenerator";
import Graph2dGenerator from "./components/Graph2dGenerator";
import NotFound from "./components/NotFound";

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