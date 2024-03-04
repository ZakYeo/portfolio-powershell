


import React, { useEffect, useRef } from 'react';

const Pong = () => {
  const canvasRef = useRef(null);
  const leftPaddleYRef = useRef(250);
  const rightPaddleYRef = useRef(250);
  const keyState = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const paddleWidth = 10, paddleHeight = 100;
    const step = 5; // Smaller step for smoother movement

    const drawPaddle = (x, y) => {
      ctx.fillStyle = 'white';
      ctx.fillRect(x, y, paddleWidth, paddleHeight);
    };

    const updatePaddlePositions = () => {
      if (keyState.current['ArrowUp']) {
        rightPaddleYRef.current = Math.max(rightPaddleYRef.current - step, 0);
      }
      if (keyState.current['ArrowDown']) {
        rightPaddleYRef.current = Math.min(rightPaddleYRef.current + step, canvas.height - paddleHeight);
      }
      if (keyState.current['w']) {
        leftPaddleYRef.current = Math.max(leftPaddleYRef.current - step, 0);
      }
      if (keyState.current['s']) {
        leftPaddleYRef.current = Math.min(leftPaddleYRef.current + step, canvas.height - paddleHeight);
      }
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updatePaddlePositions();
      drawPaddle(0, leftPaddleYRef.current);
      drawPaddle(canvas.width - paddleWidth, rightPaddleYRef.current);
      requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e) => {
      keyState.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keyState.current[e.key] = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    requestAnimationFrame(gameLoop);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ background: 'black' }}></canvas>;
};

export default Pong;

