
import React, { useEffect, useRef } from 'react';



/**
 * Pong using HTML Canvas element
 * Up & Down arrow to move player one
 * W & S to move player two
 */
const Pong = () => {
  const canvasRef = useRef(null);
  const leftPaddleYRef = useRef(250);
  const rightPaddleYRef = useRef(250);
  const lastTimeRef = useRef(null);
  const ballRef = useRef({ x: 400, y: 300, speedX: 4, speedY: 4, radius: 10 });
  const keysPressed = useRef({ w: false, s: false, ArrowUp: false, ArrowDown: false });

  useEffect(() => {

    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.8; // 80 % of window height

      // Adjust ball and paddle positions based on the new canvas size
      ballRef.current.x = canvas.width / 2;
      ballRef.current.y = canvas.height / 2;
      leftPaddleYRef.current = (canvas.height - 100) / 2; // Center left paddle
      rightPaddleYRef.current = (canvas.height - 100) / 2; // Center right paddle
    };

    // Delay setting the initial canvas size to ensure the page layout has loaded
    setTimeout(updateCanvasSize, 0);

    // Update canvas size on window resize
    window.addEventListener('resize', updateCanvasSize);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const paddleWidth = 10, paddleHeight = 100;
    const paddleSpeed = 15;

    /**
    * Draws a paddle on the canvas.
    * @param {number} x - The x position of the paddle.
    * @param {number} y - The y position of the paddle.
    */
    const drawPaddle = (x, y) => {
      ctx.fillStyle = 'white';
      ctx.fillRect(x, y, paddleWidth, paddleHeight);
    };

    /**
     * Draws the ball on the canvas.
     * @param {object} ball - The ball object with properties x, y, and radius.
     */
    const drawBall = (ball) => {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    /**
     * Updates the positions of the paddles based on the keys pressed.
     * @param {number} deltaTime - The time difference since the last frame, used for smooth animations.
     */
    const updatePaddlePositions = (deltaTime) => {
      if (keysPressed.current.w) leftPaddleYRef.current = Math.max(leftPaddleYRef.current - paddleSpeed * deltaTime, 0);
      if (keysPressed.current.s) leftPaddleYRef.current = Math.min(leftPaddleYRef.current + paddleSpeed * deltaTime, canvas.height - paddleHeight);
      if (keysPressed.current.ArrowUp) rightPaddleYRef.current = Math.max(rightPaddleYRef.current - paddleSpeed * deltaTime, 0);
      if (keysPressed.current.ArrowDown) rightPaddleYRef.current = Math.min(rightPaddleYRef.current + paddleSpeed * deltaTime, canvas.height - paddleHeight);
    };

    /**
     * Checks for collisions between the ball and the paddles, and adjusts the ball's speed and position accordingly.
     */
    const checkPaddleCollision = () => {
      const ball = ballRef.current;
      const isCollidingWithLeftPaddle = ball.x - ball.radius <= paddleWidth &&
        ball.y >= leftPaddleYRef.current &&
        ball.y <= leftPaddleYRef.current + paddleHeight;
      const isCollidingWithRightPaddle = ball.x + ball.radius >= canvas.width - paddleWidth &&
        ball.y >= rightPaddleYRef.current &&
        ball.y <= rightPaddleYRef.current + paddleHeight;

      if (isCollidingWithLeftPaddle || isCollidingWithRightPaddle) {
        ball.speedX = -ball.speedX;

        // Adjust the ball position slightly away from the paddle to prevent sticking
        if (isCollidingWithLeftPaddle) {
          ball.x = paddleWidth + ball.radius + 1;
        } else if (isCollidingWithRightPaddle) {
          ball.x = canvas.width - paddleWidth - ball.radius - 1;
        }
      }
    };

    /**
     * Resets the ball's position and speed when it collides with the left or right walls.
    */
    const resetBallOnWallCollision = () => {
      const ball = ballRef.current;
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        // Reset the ball to the center
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = -ball.speedX;
        ball.speedY = ball.speedY;
      }
    };

    /**
     * Updates the ball's position based on its speed and handles collisions with walls and paddles.
     * @param {number} deltaTime - The time difference since the last frame.
     */
    const updateBallPosition = (deltaTime) => {
      const ball = ballRef.current;
      ball.x += ball.speedX * deltaTime;
      ball.y += ball.speedY * deltaTime;

      // Ball collision with top and bottom walls
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.speedY = -ball.speedY;
        ball.y = ball.y - ball.radius < 0 ? ball.radius : canvas.height - ball.radius;
      }

      checkPaddleCollision();
      resetBallOnWallCollision();
    };

    /**
     * The main game loop, responsible for updating game state and redrawing the scene.
     * @param {number} time - The current timestamp.
     */
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

