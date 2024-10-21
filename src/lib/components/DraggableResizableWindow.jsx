import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';

const DraggableResizableWindow = ({ title, children }) => {
  const constraintsRef = useRef(null);
  const [size, setSize] = useState({ width: 300, height: 200 });

  // Utiliser les drag controls
  const dragControls = useDragControls();

  // État pour le redimensionnement
  const [isResizing, setIsResizing] = useState(false);

  // Gestion des événements de redimensionnement
  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handlePointerMove = (e) => {
    if (!isResizing) return;

    // Calculer la nouvelle taille
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

  // Attacher les événements au niveau du window pour capturer les mouvements en dehors du resizer
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
    <div
      ref={constraintsRef}
      className="w-full h-screen bg-transparent overflow-hidden relative"
    >
      <motion.div
        className="window absolute border"
        drag
        dragControls={dragControls}
        dragListener={false} // Désactive le listener de drag par défaut
        dragConstraints={constraintsRef}
        dragMomentum={false}
        style={{ width: size.width, height: size.height }}
      >
        {/* Barre de titre */}
        <motion.div
          className="title-bar"
          onPointerDown={(e) => dragControls.start(e)} // Démarre le drag sur le parent
        >
          <div className="title-bar-text">{title || 'Notepad'}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </motion.div>

        {/* Contenu de la fenêtre */}
        {children({ size })}

        {/* Resizer */}
        <div
          className="resizer"
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            backgroundColor: 'red',
            bottom: 0,
            right: 0,
            cursor: 'se-resize',
          }}
          onPointerDown={handlePointerDown}
        />
      </motion.div>
    </div>
  );
};

export default DraggableResizableWindow;
