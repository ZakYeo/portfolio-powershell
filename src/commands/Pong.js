
import React, { useEffect, useRef } from 'react';

const Pong = () => {
  const canvasRef = useRef(null);
  const leftPaddleYRef = useRef(250);
  const rightPaddleYRef = useRef(250);
  const lastTimeRef = useRef(null);
  const ballRef = useRef({ x: 400, y: 300, speedX: 4, speedY: 4, radius: 10 });
  const keysPressed = useRef({ w: false, s: false, ArrowUp: false, ArrowDown: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const paddleWidth = 10, paddleHeight = 100;
    const paddleSpeed = 15;
    const drawPaddle = (x, y) => {
      ctx.fillStyle = 'white';
      ctx.fillRect(x, y, paddleWidth, paddleHeight);
    };

    const drawBall = (ball) => {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const updatePaddlePositions = (deltaTime) => {
      if (keysPressed.current.w) leftPaddleYRef.current = Math.max(leftPaddleYRef.current - paddleSpeed * deltaTime, 0);
      if (keysPressed.current.s) leftPaddleYRef.current = Math.min(leftPaddleYRef.current + paddleSpeed * deltaTime, canvas.height - paddleHeight);
      if (keysPressed.current.ArrowUp) rightPaddleYRef.current = Math.max(rightPaddleYRef.current - paddleSpeed * deltaTime, 0);
      if (keysPressed.current.ArrowDown) rightPaddleYRef.current = Math.min(rightPaddleYRef.current + paddleSpeed * deltaTime, canvas.height - paddleHeight);
    };


    const updateBallPosition = (deltaTime) => {
      const ball = ballRef.current;
      ball.x += ball.speedX * deltaTime;
      ball.y += ball.speedY * deltaTime;

      // Ball collision with top and bottom walls
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.speedY = -ball.speedY;
        // Adjust ball position to prevent "sticking" to the wall
        ball.y = ball.y - ball.radius < 0 ? ball.radius : canvas.height - ball.radius;
      }


      // Ball collision with left and right walls
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.speedX = -ball.speedX;
        // Adjust ball position to prevent "sticking" to the wall
        ball.x = ball.x - ball.radius < 0 ? ball.radius : canvas.width - ball.radius;
      }
    };

    const gameLoop = (time) => {
      const deltaTime = lastTimeRef.current ? (time - lastTimeRef.current) / 16.67 : 0; // Normalize deltaTime
      updatePaddlePositions(deltaTime);
      updateBallPosition(deltaTime);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPaddle(0, leftPaddleYRef.current);
      drawPaddle(canvas.width - paddleWidth, rightPaddleYRef.current);
      drawBall(ballRef.current);

      lastTimeRef.current = time;
      requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
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

