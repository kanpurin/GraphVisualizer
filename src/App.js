import React from "react";
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import DrawUndirectedGraph from "./DrawUndirectedGraph";

function App() {
  return (
		<div>
      <Header />
      <DrawUndirectedGraph nodes={[0,1,2]} edges={[[0,1]]}/>
      <Footer />
		</div>
  );
}

export default App;