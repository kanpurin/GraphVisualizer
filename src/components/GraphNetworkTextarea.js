/* eslint no-undef: 0 */
import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import CopyButton from "./CopyButton";
import styles from "./GraphNetworkTextarea.module.css";

function GraphNetworkTextarea(props) {
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    console.log(`nodesData :\n${props.nodesData.join(' ')}`);
    console.log(`edgesData :\n${props.edgesData.map(edge=>edge.join(' ')).join('\n')}`);
    const updatedTextareaValue = `${props.nodesData.length} ${props.edgesData.length}\n${props.edgesData.map(edge => edge.join(' ')).join('\n')}`;
    setTextareaValue(updatedTextareaValue);
  }, [props.nodesData, props.edgesData]);

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value); // ユーザーの入力をtextareaValueに反映
  };

  const handleGraphGenerate = () => {
    const lines = textareaValue.split('\n').filter(line => line.trim() !== ''); // 空行を無視する
    const [N, M] = lines[0].split(' ').map(Number);
    const nodes = Array.from({ length: N }, (_, index) => index + 1);
    const edges = [];

    lines.slice(1)
      .forEach((line, index) => {
        const nums = line.trim().split(' ');
        const lineNumber = index + 2; // 0-indexed lines
        const [u, v] = nums.map(Number);
        if (nums.length !== 2) {
          alert(`Invalid input: ${lineNumber}行目\n\nグラフは以下の形式で与えてください。\nN (M)\nu_1 v_1\nu_2 v_2\n...\nu_M v_M`);
          throw new Error('Invalid input: Each line should contain two numbers.');
        }
        if (isNaN(u) || isNaN(v) || u < 1 || u > N || v < 1 || v > N) {
          alert(`Invalid input: ${lineNumber}行目\n\n頂点番号は1以上N以下で指定してください`);
          throw new Error(`Invalid input: Edge at line ${lineNumber} is incorrect.`);
        }
        edges.push([u, v]);
      });

    if (M !== undefined && edges.length !== M) {
      alert(`グラフの辺の数(${edges.length})がM(${M})と一致しません\n\nグラフは以下の形式で与えてください。\nN (M)\nu_1 v_1\nu_2 v_2\n...\nu_M v_M`);
      throw new Error('Invalid input: Edge count does not match M.');
    }

    props.setNodesData(nodes);
    props.setEdgesData(edges);
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
        <textarea className={styles["form-control"]}
          value={textareaValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyPress} // Ctrl+Enterを押したときの処理を追加
        />
        <CopyButton text={textareaValue}/>
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
