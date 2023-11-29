/* eslint no-undef: 0 */
import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap'; // React BootstrapからButtonをインポート
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function GraphTextarea(props) {
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    const updatedTextareaValue = `${props.nodesData.length} ${props.edgesData.length}\n${props.edgesData.map(edge => edge[0]+' '+edge[1]).join('\n')}`;
    setTextareaValue(updatedTextareaValue);
  }, [props.nodesData, props.edgesData]);

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value); // ユーザーの入力をtextareaValueに反映
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
        <button className="btn btn-primary" onClick={() => navigator.clipboard.writeText(textareaValue)} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'transparent', border: 'none' }}>
          <FontAwesomeIcon icon={faCopy} style={{ color: 'gray' }} /> {/* FontAwesomeのコピーのアイコン */}
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