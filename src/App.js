import React from "react";
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import GraphGenerator from "./GraphGenerator";

function App() {
  return (
		<div>
      <Header />
      <GraphGenerator />
      <Footer />
		</div>
  );
}

export default App;