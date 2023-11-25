import React from "react";
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import DrawUndirectedGraph from "./DrawUndirectedGraph";

function App() {
  return (
		<div>
      <Header />
      <DrawUndirectedGraph nodes={[]} edges={[]}/>
      <Footer />
		</div>
  );
}

export default App;