import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useOSStore } from '../../contexts/os';

const DraggableResizableWindow = ({ wm_state, children }) => {
  const windows = useOSStore((state) => state.windows);
  const closeApp = useOSStore((state) => state.closeApp);
  const minimizeApp = useOSStore((state) => state.minimizeApp);
  const appClick = useOSStore((state) => state.appClick);

  const currentWindow = windows.find((window) => window.id === wm_state.id);

  const [size, setSize] = useState({ 
    width: wm_state?.defaultSize?.width ?? 300,
    height: wm_state?.defaultSize?.height ?? 200 
  });

  const dragControls = useDragControls();

  const [isResizing, setIsResizing] = useState(false);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handlePointerMove = (e) => {
    if (!isResizing) return;

    const deltaX = e.movementX;
    const deltaY = e.movementY;
    setSize((prevSize) => ({
      width: Math.max(100, prevSize.width + deltaX),
      height: Math.max(100, prevSize.height + deltaY),
    }));
  };

  const handlePointerUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    } else {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isResizing]);

  return (
    <>
      <motion.div
        className="window absolute border overflow-hidden"
        drag
        dragControls={dragControls}
        dragListener={false} // Désactive le listener de drag par défaut
        dragMomentum={false}
        onClick={() => appClick(wm_state.id)} 
        style={{
          width: currentWindow.minimized ? 0 : size.width,
          height: currentWindow.minimized ? 0 : size.height,
          display: currentWindow.minimized ? 'none' : 'block',
        }}
      >
        {/* Barre de titre */}
        {currentWindow.minimized ? null : (
          <motion.div
            className={"title-bar " + (currentWindow.active ? "" : "inactive")}
            onPointerDown={(e) => dragControls.start(e)} // Démarre le drag sur le parent
          >
            <div className="title-bar-text">{wm_state.name}</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize" onClick={() => minimizeApp(wm_state.id)}></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close" onClick={() => closeApp(wm_state.id)}></button>
            </div>
          </motion.div>
        )}

        {/* Contenu de la fenêtre */}
        {children({ size })}

        {/* Resizer */}
        {currentWindow.minimized ? null : (
          <div
            className="resizer"
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              bottom: 0,
              right: 0,
              cursor: 'se-resize',
            }}
            onPointerDown={handlePointerDown}
          />
        )}
      </motion.div>
    </>
  );
};

export default DraggableResizableWindow;
