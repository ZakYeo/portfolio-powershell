
import React, { useEffect, useRef } from 'react';

/**
 * Snake game using HTML Canvas element.
 */
const Snake = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.8;
      }
    };

    updateCanvasSize();

    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ background: 'black' }}></canvas>;
};

export default Snake;
