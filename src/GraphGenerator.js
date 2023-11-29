/* eslint no-undef: 0 */
import React, { useState } from "react";
import Usage from "./Usage";
import DrawUndirectedGraph from "./DrawUndirectedGraph";
import GraphTextarea from "./GraphTextarea";

function GraphGenerator() {
  const [nodesData, setNodesData] = useState([]);
  const [edgesData, setEdgesData] = useState([]);

  const data = {
    nodesData: nodesData,
    setNodesData: setNodesData,
    edgesData: edgesData,
    setEdgesData: setEdgesData
  };

	return (
    <>
      <Usage />
      <div className="my-3 container" style={{ position: 'relative' }}>
        <DrawUndirectedGraph {...data} />
        <GraphTextarea {...data} />
      </div>
    </>
	)
}

export default GraphGenerator;