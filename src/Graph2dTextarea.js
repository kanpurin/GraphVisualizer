/* eslint no-undef: 0 */
import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import CopyButton from "./CopyButton";

function GraphNetworkTextarea(props) {
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    console.log(`pointsData :\n${props.pointsData.map(point=>`${point.x} ${point.y}`).join('\n')}`);
    const updatedTextareaValue = `${props.pointsData.length}\n${props.pointsData.map(point=>`${point.x} ${point.y}`).join('\n')}`;
    setTextareaValue(updatedTextareaValue);
  }, [props.pointsData]);

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value); // ユーザーの入力をtextareaValueに反映
  };

  const handleGraphGenerate = () => {
    const lines = textareaValue.split('\n').filter(line => line.trim() !== ''); // 空行を無視する
    const N = Number(lines[0]);
    const points = [];

    lines.slice(1)
      .forEach((line, index) => {
        const nums = line.trim().split(' ');
        const lineNumber = index + 2; // 0-indexed lines
        const [x, y] = nums.map(Number);
        if (nums.length !== 2 || isNaN(x) || isNaN(y)) {
          alert(`Invalid input: ${lineNumber}行目\n\nグラフは以下の形式で与えてください。\nN\nx_1 y_1\nx_2 y_2\n...\nx_N y_N`);
          throw new Error('Invalid input: Each line should contain two numbers.');
        }
        points.push({ x: x, y: y });
      });

    if (points.length !== N) {
      alert(`点の数(${points.length})がN(${N})と一致しません\n\nグラフは以下の形式で与えてください。\nN\nx_1 y_1\nx_2 y_2\n...\nx_N y_N`);
      throw new Error('Invalid input: Point count does not match N.');
    }

    props.setPointsData(points);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault(); // デフォルトのEnterキーの動作を無効化
      handleGraphGenerate(); // Draw Graphボタンの処理を呼び出す
    }
  };

  return (
    <>
      <div className="my-1 position-relative">
        <textarea className="form-control"
          value={textareaValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyPress} // Ctrl+Enterを押したときの処理を追加
          style={{ width: '100%', height: '300px' }}
        />
        <CopyButton />
      </div>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleGraphGenerate}>
          Draw Graph
        </Button>
      </div>
    </>
  )
}

export default GraphNetworkTextarea;
