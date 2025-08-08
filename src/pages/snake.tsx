import React, { useState, useEffect, useRef } from "react";

import { LuGrape, LuCherry, LuApple, LuBanana } from "react-icons/lu";

/*
TODO

- Add a timer for each fruit, if not eaten in 10 seconds it disappears
- Add hunger mechanic: the longer the snake, the more food it needs to keep going
Eating fruit resets hunger meter
- Prettier game board?  
- High score table at side
*/

type Coord = [number, number]; // board coordinates

const BOARD_SIZE = 30;
const INITIAL_SNAKE_SIZE = 6; // initial length of the snake

const INITIAL_SNAKE: Coord[] = [[10, 10]];

for (let i = 1; i < INITIAL_SNAKE_SIZE; i++) {
  if (i >= INITIAL_SNAKE_SIZE) break; // prevent out of bounds
  let coord: Coord = [10, 10 - i];
  INITIAL_SNAKE.push(coord);
}

const INITIAL_DIRECTION: Coord = [0, 1];

const ICON_SIZE = 20; // size of each food icon

const fruits = [LuCherry, LuGrape, LuApple, LuBanana];

// Keep track of how many fruits are on the board
// Each fruit has 10 seconds to be eaten before it disappears
let fruitsOnBoard = [];

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

let defaultFoodIcon = <LuApple color="var(--neon-color)" size={ICON_SIZE} />;

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Coord[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Coord>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Coord>(() =>
    getRandomFoodPosition(INITIAL_SNAKE),
  );
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const [foodIcon, setFoodIcon] = useState<React.ReactNode>(defaultFoodIcon);

  const directionRef = useRef(direction);
  directionRef.current = direction;

  // Handle keyboard input only when playing
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current[0] !== 1) setDirection([-1, 0]);
          break;
        case "ArrowDown":
          if (directionRef.current[0] !== -1) setDirection([1, 0]);
          break;
        case "ArrowLeft":
          if (directionRef.current[1] !== 1) setDirection([0, -1]);
          break;
        case "ArrowRight":
          if (directionRef.current[1] !== -1) setDirection([0, 1]);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, gameOver]);

  // Main game loop
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

        // Checking collision with body
        if (prev.some(([r, c]) => r === wrappedRow && c === wrappedCol)) {
          setGameOver(true);
          setIsPlaying(false);
          return prev;
        }

        // Eat food
        const ateFood = wrappedRow === food[0] && wrappedCol === food[1];
        if (ateFood) {
          setFood(getRandomFoodPosition([wrappedHead, ...prev]));
          const Icon = fruits[Math.floor(Math.random() * fruits.length)];
          setFoodIcon(<Icon color="var(--neon-color)" size={ICON_SIZE} />);
          setScore((prevScore) => prevScore + 1);
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

    const Icon = fruits[Math.floor(Math.random() * fruits.length)];
    setFoodIcon(<Icon color="var(--neon-color)" size={ICON_SIZE} />);

    setGameOver(false);
    setIsPlaying(true);
    setScore(0);
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

        <p className="m-4 gap-2 items-center">
          <span>Use arrow keys to move the snake.</span>
          <span className="flex items-center ">
            Eat the fruit{" "}
            {fruits.map((IconComponent, idx) => (
              <IconComponent
                key={idx}
                size={16}
                color="var(--neon-color)"
                className="ml-2 mr-2"
              />
            ))}{" "}
            to grow and score points!
          </span>

          <span>
            The longer your snake gets, the more food it needs to keep going.
            Keep an eye on its hunger, don't let it starve!
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
        <p>
          <b>Score: {score}</b>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateRows: `repeat(${BOARD_SIZE}, 20px)`,
            gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
            border: "2px solid black",
            width: BOARD_SIZE * 20,
            height: BOARD_SIZE * 20,
            position: "relative",
            borderRadius: "8px",
          }}
        >
          {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, idx) => {
            const row = Math.floor(idx / BOARD_SIZE);
            const col = idx % BOARD_SIZE;

            const isSnake = snake.some(([r, c]) => r === row && c === col);
            const isFood = food[0] === row && food[1] === col;

            // Each cell of the board including snake and food is rendered below
            return (
              <div
                key={idx}
                style={{
                  width: 20,
                  height: 20,
                  boxSizing: "border-box",
                  backgroundColor: isSnake ? "var(--neon-color)" : "black",
                }}
              >
                {isFood ? foodIcon : ""}
              </div>
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
