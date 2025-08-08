import React, { useState, useEffect, useRef } from "react";

type Coord = [number, number]; // board coordinates

const BOARD_SIZE = 20;
const INITIAL_SNAKE_SIZE = 6; // initial length of the snake

const INITIAL_SNAKE: Coord[] = [[10, 10]];

for (let i = 1; i < INITIAL_SNAKE_SIZE; i++) {
  if (i >= INITIAL_SNAKE_SIZE) break; // prevent out of bounds
  let coord: Coord = [10, 10 - i];
  INITIAL_SNAKE.push(coord);
}

const INITIAL_DIRECTION: Coord = [0, 1];

function getRandomFoodPosition(snake: Coord[]): Coord {
  while (true) {
    const pos: Coord = [
      Math.floor(Math.random() * BOARD_SIZE),
      Math.floor(Math.random() * BOARD_SIZE),
    ];
    if (!snake.some(([r, c]) => r === pos[0] && c === pos[1])) {
      return pos;
    }
  }
}

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Coord[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Coord>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Coord>(() =>
    getRandomFoodPosition(INITIAL_SNAKE),
  );
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const directionRef = useRef(direction);
  directionRef.current = direction;

  // Handle keyboard input only when playing
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          if (directionRef.current[0] !== 1) setDirection([-1, 0]);
          break;
        case "ArrowDown":
          e.preventDefault();
          if (directionRef.current[0] !== -1) setDirection([1, 0]);
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (directionRef.current[1] !== 1) setDirection([0, -1]);
          break;
        case "ArrowRight":
          e.preventDefault();
          if (directionRef.current[1] !== -1) setDirection([0, 1]);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, gameOver]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead: Coord = [
          head[0] + directionRef.current[0],
          head[1] + directionRef.current[1],
        ];

        // Wrap around edges
        const wrappedRow = (newHead[0] + BOARD_SIZE) % BOARD_SIZE;
        const wrappedCol = (newHead[1] + BOARD_SIZE) % BOARD_SIZE;
        const wrappedHead: Coord = [wrappedRow, wrappedCol];

        // Collision with self
        if (prev.some(([r, c]) => r === wrappedRow && c === wrappedCol)) {
          setGameOver(true);
          setIsPlaying(false);
          return prev;
        }

        // Eat food
        const ateFood = wrappedRow === food[0] && wrappedCol === food[1];
        if (ateFood) {
          setFood(getRandomFoodPosition([wrappedHead, ...prev]));
          return [wrappedHead, ...prev]; // grow snake
        }

        // Move normally
        return [wrappedHead, ...prev.slice(0, -1)];
      });
    }, 150);

    return () => clearInterval(interval);
  }, [food, gameOver, isPlaying]);

  // Start / restart game
  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFoodPosition(INITIAL_SNAKE));
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <>
      <div>
        <p className="flex m-4 gap-2 items-center">
          <h2>You found the secret snake game!!</h2>
          <small>
            Ironically not written in Python... backend server calls are
            expensive!
          </small>
        </p>

        <p className="flex m-4 gap-2 items-center">
          <span>Use arrow keys to move the snake.</span>
          <span>
            Eat the <span className="text-red-500">red</span> squares to grow!
          </span>
        </p>
      </div>
      <div
        style={{
          userSelect: "none",
          width: BOARD_SIZE * 20,
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: `repeat(${BOARD_SIZE}, 20px)`,
            gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
            border: "2px solid black",
            width: BOARD_SIZE * 20,
            height: BOARD_SIZE * 20,
            position: "relative",
          }}
        >
          {/* Render board */}
          {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, idx) => {
            const row = Math.floor(idx / BOARD_SIZE);
            const col = idx % BOARD_SIZE;

            const isSnake = snake.some(([r, c]) => r === row && c === col);
            const isFood = food[0] === row && food[1] === col;

            return (
              <div
                key={idx}
                style={{
                  width: 20,
                  height: 20,
                  boxSizing: "border-box",
                  backgroundColor: isSnake ? "green" : isFood ? "red" : "black",
                }}
              />
            );
          })}

          {/* Overlay for play / restart */}
          {(!isPlaying || gameOver) && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
                color: "white",
              }}
            >
              {gameOver ? (
                <>
                  <h2>Game Over!</h2>
                  <button
                    onClick={startGame}
                    style={{
                      padding: "10px 20px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "rgba(255, 0, 0, 0.8)",
                      color: "white",
                    }}
                  >
                    Restart
                  </button>
                </>
              ) : (
                <button
                  onClick={startGame}
                  style={{
                    padding: "12px 24px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "rgba(0, 128, 0, 0.8)",
                    color: "white",
                  }}
                >
                  ▶ Play
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SnakeGame;
