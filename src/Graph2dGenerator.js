/* eslint no-undef: 0 */
import React, { useState } from "react";
import UsageGraph2d from "./UsageGraph2d";
import Graph2dTextarea from "./Graph2dTextarea";
import DrawGraph2d from "./DrawGraph2d";

function Graph2dGenerator() {
  const [drawPointsData, setDrawPointsData] = useState([]);
  const [textPointsData, setTextPointsData] = useState([]);

  const drawData = {
    pointsData: drawPointsData,
    setPointsData: setTextPointsData
  };

  const textData = {
    pointsData: textPointsData,
    setPointsData: setDrawPointsData
  };

	return (
    <>
      <div className="my-3 container" style={{ position: 'relative' }}>
        <UsageGraph2d />
        <DrawGraph2d {...drawData} />
        <Graph2dTextarea {...textData} />
      </div>
    </>
	)
}

export default Graph2dGenerator;