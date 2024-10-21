import React, { useState } from 'react';

const Notepad = ({size}) => {
  const [text, setText] = useState('');

  return (
    <>
        <div className="menu-bar ">
          <ul className="menu flex gap-2 mt-1 ml-1">
            <li>Fichier</li>
            <li>Édition</li>
            <li>Format</li>
            <li>Affichage</li>
            <li>?</li>
          </ul>
        </div>

        <div className="" style={{ padding: '0' }}>
          <textarea
            className="notepad-textarea"
            style={{
              width: '100%',
              height: `${size.height - 50}px`,
              border: 'none',
              padding: '4px',
              boxSizing: 'border-box',
              fontFamily: 'Courier New, monospace',
              fontSize: '14px',
              resize: 'none',
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
    </>
  );
};

export default Notepad;
