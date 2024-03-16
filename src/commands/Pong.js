
import React, { useEffect, useRef, useState } from 'react';

/**
 * Pong using HTML Canvas element
 * Up & Down arrow to move player one
 * W & S to move player two
 */
const Pong = ({ hasQuitPong, setHasQuitPong }) => {

	const canvasRef = useRef(null);
	const confettiRef = useRef([]);
	const leftPaddleYRef = useRef(250);
	const rightPaddleYRef = useRef(250);
	const lastTimeRef = useRef(null);
	const ballRef = useRef({ x: 400, y: 300, speedX: 0, speedY: 0, radius: 10 });
	const keysPressed = useRef({ w: false, s: false, ArrowUp: false, ArrowDown: false });
	const [quitGame, setQuitGame] = useState(false);
	const [scorePlayerOne, setScorePlayerOne] = useState(0);
	const [scorePlayerTwo, setScorePlayerTwo] = useState(0);

	const soundScore = useRef(new Audio('score.mp3'));
	const soundHit = useRef(new Audio('hit.mp3'));
	const speedIncreaseFactor = 1.2;

	const quitGameRef = useRef(quitGame);
	useEffect(() => {
		quitGameRef.current = quitGame;
	}, [quitGame]);

	useEffect(() => {
		setHasQuitPong(false);

		const handleQuitKeyPress = (event) => {
			if (event.key === 'Escape' || event.key.toLowerCase() === 'q') {
				setHasQuitPong(true);
				setQuitGame(true);
			}
		};

		/**
		 * Reset the ball to the center of the canvas
		 * Give it a randomly defined direction (with constraints)
		*/
		const initializeBall = () => {
			const canvas = canvasRef.current;

			const baseSpeed = canvas.width / 150; // Base speed, adjust as needed
			let angle;

			// Ensure the angle is not too steep by keeping it within specified bounds
			do {
				angle = Math.random() * Math.PI * 2;
			} while (angle > Math.PI / 4 && angle < 3 * Math.PI / 4 || // Exclude steep upwards
				angle > 5 * Math.PI / 4 && angle < 7 * Math.PI / 4); // Exclude steep downwards

			ballRef.current = {
				...ballRef.current,
				x: canvas.width / 2,
				y: canvas.height / 2,
				speedX: Math.cos(angle) * baseSpeed,
				speedY: Math.sin(angle) * baseSpeed,
			};
		};
		initializeBall();

		/**
		 * When the window gets bigger or smaller, auto adjust the canvas size to match
		*/
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
		 * Checks for collisions between the ball and the paddles, adjusting the ball's direction while maintaining its speed.
		 * 
		 * The function first checks for collisions with the left and right paddles. If a collision is detected,
		 * it calculates the impact point relative to the center of the paddle to determine the new angle of reflection.
		 * 
		 * To ensure the ball's speed remains consistent after reflection, the function calculates the magnitude of the
		 * ball's velocity (its speed) before the collision and uses this to adjust the ball's speedX and speedY components
		 * after setting the new direction. This maintains the overall speed of the ball constant, altering only its direction.
		 *
		 *It also checks if the paddle is moving and adjusts the ball's velocity slightly to simulate a more dynamic bounce.
		 */
		const checkPaddleCollision = () => {
			const ball = ballRef.current;
			const paddleHeightHalf = paddleHeight / 2;
			let impactPoint;



			// Calculate the current velocity of the ball
			const currentVelocity = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);

			// Check collision with left paddle
			if (ball.x - ball.radius <= paddleWidth && ball.y >= leftPaddleYRef.current && ball.y <= leftPaddleYRef.current + paddleHeight) {
				impactPoint = (ball.y - (leftPaddleYRef.current + paddleHeightHalf)) / paddleHeightHalf;
				const paddleMovingUp = keysPressed.current.w;
				const paddleMovingDown = keysPressed.current.s;
				ball.speedX = Math.abs(ball.speedX); // Ensure ball moves right

				// Calculate new angle based on impact point
				let angle = impactPoint * (Math.PI / 4); // Max reflection angle is 45 degrees
				if (paddleMovingUp) angle -= Math.PI / 12; // Decrease angle if paddle moving up
				if (paddleMovingDown) angle += Math.PI / 12; // Increase angle if paddle moving down
				ball.speedY = currentVelocity * Math.sin(angle);
				ball.speedX = currentVelocity * Math.cos(angle);
				ball.speedX *= speedIncreaseFactor;
				ball.speedY *= speedIncreaseFactor;

				ball.x = paddleWidth + ball.radius + 1; // Move ball slightly away from paddle
				soundHit.current.play();

			}
			// Check collision with right paddle
			else if (ball.x + ball.radius >= canvas.width - paddleWidth && ball.y >= rightPaddleYRef.current && ball.y <= rightPaddleYRef.current + paddleHeight) {
				impactPoint = (ball.y - (rightPaddleYRef.current + paddleHeightHalf)) / paddleHeightHalf;
				const paddleMovingUp = keysPressed.current.ArrowUp;
				const paddleMovingDown = keysPressed.current.ArrowDown;
				ball.speedX = -Math.abs(ball.speedX); // Ensure ball moves left

				// Calculate new angle based on impact point
				let angle = impactPoint * (Math.PI / 4); // Max reflection angle is 45 degrees
				if (paddleMovingUp) angle -= Math.PI / 12; // Decrease angle if paddle moving up
				if (paddleMovingDown) angle += Math.PI / 12; // Increase angle if paddle moving down
				ball.speedY = currentVelocity * Math.sin(angle);
				ball.speedX = -currentVelocity * Math.cos(angle); // Negate to ensure ball moves left
				ball.speedX *= speedIncreaseFactor;
				ball.speedY *= speedIncreaseFactor;

				ball.x = canvas.width - paddleWidth - ball.radius - 1; // Move ball slightly away from paddle

				soundHit.current.play();
			}


		};
		/**
		* Resets the ball's position and speed when it collides with the left or right walls.
		*/
		const resetBallOnWallCollision = () => {
			const ball = ballRef.current;
			if (ball.x - ball.radius < 0) {
				// Ball hit the left wall, score for player two
				setScorePlayerTwo((prevScore) => prevScore + 1);
				soundScore.current.play();
				triggerConfetti();
				initializeBall();
			} else if (ball.x + ball.radius > canvas.width) {
				// Ball hit the right wall, score for player one
				setScorePlayerOne((prevScore) => prevScore + 1);
				soundScore.current.play();
				triggerConfetti();
				initializeBall();
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
		* Draws the current score for both players on the canvas.
		*/
		const drawScore = () => {
			const ctx = canvasRef.current.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.font = '30px Arial';
			ctx.fillText(`Player 1: ${scorePlayerOne}`, 50, 50);
			ctx.fillText(`Player 2: ${scorePlayerTwo}`, canvas.width - 200, 50);
		};

		/**
		 * The main game loop, responsible for updating game state and redrawing the scene.
		 * @param {number} time - The current timestamp.
		 */
		const gameLoop = (time) => {
			if (!quitGameRef.current) {
				const deltaTime = lastTimeRef.current ? (time - lastTimeRef.current) / 16.67 : 0;
				updatePaddlePositions(deltaTime);
				updateBallPosition(deltaTime);

				const ctx = canvasRef.current.getContext('2d');
				ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
				drawPaddle(0, leftPaddleYRef.current);
				drawPaddle(canvasRef.current.width - paddleWidth, rightPaddleYRef.current);
				drawBall(ballRef.current);

				lastTimeRef.current = time;
				drawScore();

				// Render confetti particles if there are any
				if (confettiRef.current.length > 0) {
					confettiRef.current.forEach((particle, index) => {
						particle.x += particle.speedX;
						particle.y += particle.speedY;
						particle.speedY += particle.gravity;

						ctx.fillStyle = particle.color;
						ctx.beginPath();
						ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
						ctx.fill();

						// Remove particle if it falls below the bottom edge
						if (particle.y > canvasRef.current.height) {
							confettiRef.current.splice(index, 1);
						}
					});
				}
				requestAnimationFrame(gameLoop);
			}
		};

		const handleKeyDown = (e) => {
			if (quitGame) return; // Ignore keydown events if game is quit
			keysPressed.current[e.key] = true;
		};


		const handleKeyUp = (e) => {
			if (quitGame) return; // Ignore keyup events if game is quit
			keysPressed.current[e.key] = false;
		};


		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);
		document.addEventListener('keydown', handleQuitKeyPress);


		requestAnimationFrame(gameLoop);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
			document.removeEventListener('keydown', handleQuitKeyPress);
			window.removeEventListener('resize', updateCanvasSize);
		};
	}, [quitGame, scorePlayerOne, scorePlayerTwo]);


	const triggerConfetti = () => {
		const confettiCount = 200;
		const confettiParticles = [];
		for (let i = 0; i < confettiCount; i++) {
			const angle = Math.random() * 2 * Math.PI; // Angle between 0 and 360 degrees for full-circle trajectory
			const speed = Math.random() * 2 + 2;
			confettiParticles.push({
				x: canvasRef.current.width / 2,
				y: canvasRef.current.height / 2,
				speedX: Math.cos(angle) * speed,
				speedY: Math.sin(angle) * speed,
				radius: Math.random() * 4 + 1,
				color: `hsl(${Math.random() * 360}, 100%, 50%)`,
				gravity: 0.01,
			});
		}

		confettiRef.current = confettiParticles;
	};

	return < canvas ref={canvasRef} style={{ background: 'black' }}></canvas >;
};

export default Pong;

