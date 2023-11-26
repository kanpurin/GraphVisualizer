import React from "react";
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import DrawUndirectedGraph from "./DrawUndirectedGraph";
import Usage from "./Usage";

function App() {
  return (
		<div>
      <Header />
      <Usage />
      <DrawUndirectedGraph />
      <Footer />
		</div>
  );
}

export default App;