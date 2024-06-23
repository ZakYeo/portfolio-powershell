import React, { useEffect, useRef, useState } from 'react';

const Pong = ({ setHasQuitPong }) => {
    const canvasRef = useRef(null);
    const [quitGame, setQuitGame] = useState(false);
    const [scorePlayerOne, setScorePlayerOne] = useState(0);
    const [scorePlayerTwo, setScorePlayerTwo] = useState(0);
    const keysPressed = useRef({});
    const animationFrameId = useRef(null);

    const ballRef = useRef({
        x: 400,
        y: 300,
        speedX: 5,
        speedY: 5,
        radius: 10
    });

    const paddleRef = useRef({
        leftY: 250,
        rightY: 250,
        width: 10,
        height: 100,
        speed: 15
    });

    const confettiRef = useRef([]);
    const soundHit = useRef(new Audio('hit.mp3'));
    const soundScore = useRef(new Audio('score.mp3'));
    const speedIncrement = 0.2;

    useEffect(() => {
        setHasQuitPong(false);
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.8;

        const ctx = canvas.getContext('2d');

        const handleKeyDown = (e) => {
            keysPressed.current[e.key] = true;
            if (e.key === 'Escape' || e.key.toLowerCase() === 'q') {
                if (!quitGame) { // Only stop the game if it's not already stopped
                    setQuitGame(true);
                    setHasQuitPong(true);
                    // Freeze the ball
                    ballRef.current.speedX = 0;
                    ballRef.current.speedY = 0;
                }
            }
        };

        const handleKeyUp = (e) => keysPressed.current[e.key] = false;

        const drawPaddle = (x, y) => {
            ctx.fillStyle = 'white';
            ctx.fillRect(x, y, paddleRef.current.width, paddleRef.current.height);
        };

        const drawBall = (ball) => {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawScore = () => {
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';
            ctx.fillText(`Player 1: ${scorePlayerOne}`, 50, 50);
            ctx.fillText(`Player 2: ${scorePlayerTwo}`, canvas.width - 250, 50);
        };

        const updateGame = () => {
            const ball = ballRef.current;
            const canvas = canvasRef.current;

            if (!quitGame) {
                // Update paddle positions based on keys pressed
                if (keysPressed.current['w']) paddleRef.current.leftY = Math.max(paddleRef.current.leftY - paddleRef.current.speed, 0);
                if (keysPressed.current['s']) paddleRef.current.leftY = Math.min(paddleRef.current.leftY + paddleRef.current.speed, canvas.height - paddleRef.current.height);
                if (keysPressed.current['ArrowUp']) paddleRef.current.rightY = Math.max(paddleRef.current.rightY - paddleRef.current.speed, 0);
                if (keysPressed.current['ArrowDown']) paddleRef.current.rightY = Math.min(paddleRef.current.rightY + paddleRef.current.speed, canvas.height - paddleRef.current.height);

                // Move the ball
                ball.x += ball.speedX;
                ball.y += ball.speedY;

                // Check for collisions with paddles
                if ((ball.x - ball.radius <= paddleRef.current.width && ball.y >= paddleRef.current.leftY && ball.y <= paddleRef.current.leftY + paddleRef.current.height) ||
                    (ball.x + ball.radius >= canvas.width - paddleRef.current.width && ball.y >= paddleRef.current.rightY && ball.y <= paddleRef.current.rightY + paddleRef.current.height)) {
                    ball.speedX = -ball.speedX * (1 + speedIncrement);
                    ball.speedY *= (1 + speedIncrement);
                    soundHit.current.play();
                }

                // Check for collisions with top and bottom walls
                if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
                    ball.speedY = -ball.speedY;
                }

                // Score updating
                if (ball.x - ball.radius < 0) {
                    setScorePlayerTwo(prev => prev + 1);
                    triggerConfetti();
                    soundScore.current.play();
                    resetBall(canvas, ball);
                } else if (ball.x + ball.radius > canvas.width) {
                    setScorePlayerOne(prev => prev + 1);
                    soundScore.current.play();
                    triggerConfetti();
                    resetBall(canvas, ball);
                }
            }

            // Draw everything
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPaddle(0, paddleRef.current.leftY);
            drawPaddle(canvas.width - paddleRef.current.width, paddleRef.current.rightY);
            drawBall(ball);
            drawScore();
        };

        const gameLoop = () => {
            updateGame();
            updateAndDrawConfetti(ctx);
            animationFrameId.current = requestAnimationFrame(gameLoop);
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 0.8;
            resetBall(canvas, ballRef.current);
        });



        window.addEventListener('resize', () => {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 0.8;
            const speeds = calculateBallSpeed(canvas);
            ballRef.current.speedX = speeds.speedX;
            ballRef.current.speedY = speeds.speedY;
            resetBall(canvas, ballRef.current);
        });
        resetBall(canvas, ballRef.current);
        gameLoop();

        return () => {
            cancelAnimationFrame(animationFrameId.current);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight * 0.8;
                resetBall(canvas, ballRef.current);
            });
        };
    }, [scorePlayerOne, scorePlayerTwo]);

    const triggerConfetti = () => {
        const canvas = canvasRef.current;
        const numParticles = 300; // More particles for a fuller effect
        const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'purple', 'turquoise', 'silver', 'gold'];
        for (let i = 0; i < numParticles; i++) {
            confettiRef.current.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                speedX: Math.random() * 10 - 5,  // More explosive speed
                speedY: Math.random() * 10 - 5,  // Allowing negative values for a more varied explosion
                radius: Math.random() * 5 + 2,  // Larger confetti
                color: colors[Math.floor(Math.random() * colors.length)],
                gravity: 0.05,  // Lower gravity for a longer float effect
                drag: 0.99  // Slight drag to simulate air resistance
            });
        }
    };
    const updateAndDrawConfetti = (ctx) => {
        for (let i = confettiRef.current.length - 1; i >= 0; i--) {
            const confetti = confettiRef.current[i];
            confetti.x += confetti.speedX;
            confetti.y += confetti.speedY;
            confetti.speedY += confetti.gravity;  

            // Draw the confetti
            ctx.beginPath();
            ctx.arc(confetti.x, confetti.y, confetti.radius, 0, 2 * Math.PI);
            ctx.fillStyle = confetti.color;
            ctx.fill();

            if (confetti.y > canvasRef.current.height) {
                confettiRef.current.splice(i, 1);
            }
        }
    };

    const resetBall = (canvas, ball) => {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        const speeds = calculateBallSpeed(canvas);
        ball.speedX = speeds.speedX;
        ball.speedY = speeds.speedY;
    };


    const calculateBallSpeed = (canvas) => {
        const baseSpeedX = canvas.width / 250;
        const baseSpeedY = canvas.width / 250;
        return {
            speedX: baseSpeedX * (Math.random() < 0.5 ? 1 : -1),
            speedY: baseSpeedY * (Math.random() < 0.5 ? 1 : -1)
        };
    };

    return <canvas ref={canvasRef} style={{ background: 'black' }}></canvas>;
};

export default Pong;
