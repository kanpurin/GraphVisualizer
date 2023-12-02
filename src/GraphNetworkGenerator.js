/* eslint no-undef: 0 */
import React, { useState } from "react";
import Usage from "./Usage";
import DrawGraph from "./DrawGraph";
import GraphTextarea from "./GraphNetworkTextarea";

function GraphGenerator() {
  const [drawNodesData, setDrawNodesData] = useState([]);
  const [drawedgesData, setDrawEdgesData] = useState([]);
  const [textNodesData, setTextNodesData] = useState([]);
  const [textedgesData, setTextEdgesData] = useState([]);

  const drawData = {
    nodesData: drawNodesData,
    setNodesData: setTextNodesData,
    edgesData: drawedgesData,
    setEdgesData: setTextEdgesData
  };

  const textData = {
    nodesData: textNodesData,
    setNodesData: setDrawNodesData,
    edgesData: textedgesData,
    setEdgesData: setDrawEdgesData
  };

	return (
    <>
      <div className="my-3 container" style={{ position: 'relative' }}>
        <Usage />
        <DrawGraph {...drawData} />
        <GraphTextarea {...textData} />
      </div>
    </>
	)
}

export default GraphGenerator;