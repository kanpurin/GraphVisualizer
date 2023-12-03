import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DrawGraph2d(props) {
  const svgSize = 800;
  const [points, setPoints] = useState([]);
  const [gridSize, setGridSize] = useState(16);
  const [gridSpace, setGridSpace] = useState(Math.round(svgSize / gridSize));
  const [showGrid, setShowGrid] = useState(true); // 初期値は true でグリッド線を表示

  const handleGridClick = (event) => {
    const pointX = event.nativeEvent.offsetX;
    const pointY = event.nativeEvent.offsetY;

    const gridX = Math.round(pointX / gridSpace);
    const gridY = Math.round(pointY / gridSpace);

    const newPoint = { x: gridX, y: gridY };
    const pointExists = points.some(point => point.x === newPoint.x && point.y === newPoint.y);

    if (pointExists) {
      const updatedPoints = points.filter(point => !(point.x === newPoint.x && point.y === newPoint.y));
      setPoints(updatedPoints);
    } else {
      setPoints([...points, newPoint]);
    }
    console.log(`gridSize = ${gridSize}`);
    console.log(`gridSize = ${gridSpace}`);
  };

  useEffect(() => {
    setGridSpace(svgSize / gridSize);
  }, [svgSize, gridSize]);

  useEffect(() => {
    setPoints(props.pointsData);
  }, [props.pointsData]);

  useEffect(() => {
    props.setPointsData(points);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  return (
    <div className="container my-5">
      <div className="form-check">
				<input 
          className="form-check-input"
          type="checkbox"
          checked={showGrid}
          onChange={() => setShowGrid(!showGrid)} 
        />
				<label className="form-check-label">
          グリッド線表示(Sizeを大きくする場合非表示にしてください)
				</label>
			</div>
      <div className="d-flex justify-content-center">
        <div className="my-3">
          <label htmlFor="sizeInput" className="form-label">Size:</label>
          <input
            id="sizeInput"
            type="number"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            className="form-control"
            style={{ width: '100px' }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <svg
          width={svgSize}
          height={svgSize}
          onClick={handleGridClick}
          style={{ border: '1px solid black' }}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
        >
          {showGrid && Array.from(Array(gridSize).keys()).map((index) => (
            <g key={index}>
              <line x1={index * gridSpace} y1="0" x2={index * gridSpace} y2={svgSize} stroke="gray" />
            </g>
          ))}
          {showGrid && Array.from(Array(gridSize).keys()).map((index) => (
            <g key={index}>
              <line x1="0" y1={index * gridSpace} x2={svgSize} y2={index * gridSpace} stroke="gray" />
            </g>
          ))}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x * gridSpace}
              cy={point.y * gridSpace}
              r={`${Math.ceil(gridSpace / 10)}`}
              fill="blue"
              style={{ pointerEvents: 'none' }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default DrawGraph2d;
