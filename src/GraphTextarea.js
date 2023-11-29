/* eslint no-undef: 0 */
import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClipboard } from '@fortawesome/free-solid-svg-icons';

function GraphTextarea(props) {
  const [textareaValue, setTextareaValue] = useState("");
  const [copySuccess, setCopySuccess] = useState(false); 

  useEffect(() => {
    const updatedTextareaValue = `${props.nodesData.length} ${props.edgesData.length}\n${props.edgesData.map(edge => edge[0]+' '+edge[1]).join('\n')}`;
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

  const handleOutputTextarea = () => {
  };

  return (
    <>
      <div className="my-1 position-relative">
        <textarea className="form-control"
          value={textareaValue}
          onChange={handleTextareaChange}
          style={{ width: '100%', height: '300px' }}
        />
        <button className="btn btn-primary" onClick={handleCopy} onMouseEnter={(e) => e.target.style.backgroundColor = 'lightgray'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'transparent', border: 'none', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesomeIcon icon={copySuccess ? faCheckCircle : faClipboard} style={{ color: 'gray', fontSize: '1em' }}/>
        </button>
      </div>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleOutputTextarea}>
          Draw Graph
        </Button>
      </div>
    </>
  )
}

export default GraphTextarea;