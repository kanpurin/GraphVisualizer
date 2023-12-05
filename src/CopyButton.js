/* eslint no-undef: 0 */
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClipboard } from '@fortawesome/free-solid-svg-icons';

function CopyButton(props) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    setCopySuccess(false);
    navigator.clipboard.writeText(props.text)
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

  return (
    <button className="btn btn-primary" onClick={handleCopy} onMouseEnter={(e) => e.target.style.backgroundColor = 'lightgray'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'transparent', border: 'none', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <FontAwesomeIcon icon={copySuccess ? faCheckCircle : faClipboard} style={{ color: 'gray', fontSize: '1em' }}/>
    </button>
  )
}

export default CopyButton;