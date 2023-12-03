/* eslint no-undef: 0 */
import React, { useState } from "react";
import UsageGraphNetwork from "./UsageGraphNetwork";
import DrawGraphNetwork from "./DrawGraphNetwork";
import GraphNetworkTextarea from "./GraphNetworkTextarea";

function GraphNetworkGenerator() {
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
        <UsageGraphNetwork />
        <DrawGraphNetwork {...drawData} />
        <GraphNetworkTextarea {...textData} />
      </div>
    </>
	)
}

export default GraphNetworkGenerator;