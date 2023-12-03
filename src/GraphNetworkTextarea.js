/* eslint no-undef: 0 */
import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClipboard } from '@fortawesome/free-solid-svg-icons';

function GraphNetworkTextarea(props) {
  const [textareaValue, setTextareaValue] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    console.log(`nodesData :\n${props.nodesData.join(' ')}`);
    console.log(`edgesData :\n${props.edgesData.map(edge=>edge.join(' ')).join('\n')}`);
    const updatedTextareaValue = `${props.nodesData.length} ${props.edgesData.length}\n${props.edgesData.map(edge => edge.join(' ')).join('\n')}`;
    setTextareaValue(updatedTextareaValue);
  }, [props.nodesData, props.edgesData]);

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value); // ユーザーの入力をtextareaValueに反映
  };

  const handleCopy = () => {
    setCopySuccess(false);
    navigator.clipboard.writeText(textareaValue)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 1500);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
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
        <textarea className="form-control"
          value={textareaValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyPress} // Ctrl+Enterを押したときの処理を追加
          style={{ width: '100%', height: '300px' }}
        />
        <button className="btn btn-primary" onClick={handleCopy} onMouseEnter={(e) => e.target.style.backgroundColor = 'lightgray'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'transparent', border: 'none', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesomeIcon icon={copySuccess ? faCheckCircle : faClipboard} style={{ color: 'gray', fontSize: '1em' }}/>
        </button>
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
