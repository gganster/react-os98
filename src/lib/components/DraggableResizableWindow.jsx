import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DraggableResizableWindow = ({title, children}) => {
  const constraintsRef = React.useRef(null);
  const [size, setSize] = useState({ width: 300, height: 200 });

  return (
    <div
      ref={constraintsRef}
      className="w-full h-screen bg-gray-200 overflow-hidden relative"
    >
      <motion.div
        className="window absolute"
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        style={{ width: size.width, height: size.height }}
      >
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          {children}
        </div>
        <motion.div
          className="resizer"
          drag
          dragConstraints={{ top: 0, left: 0 }}
          dragMomentum={false}
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            bottom: 0,
            right: 0,
            cursor: 'se-resize',
          }}
          onDrag={(event, info) => {
            setSize({
              width: Math.max(100, size.width + info.delta.x),
              height: Math.max(100, size.height + info.delta.y),
            });
          }}
        />
      </motion.div>
    </div>
  );
};

export default DraggableResizableWindow;
