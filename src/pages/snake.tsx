import React, { useState, useEffect, useRef } from "react";

import {
  LuGrape,
  LuCherry,
  LuApple,
  LuBanana,
  LuZoomIn,
  LuZoomOut,
} from "react-icons/lu";

import snakeDead from "../assets/snakeDead.gif";

/*
TODO

- Add a timer for each fruit, if not eaten in 10 seconds it disappears
- Add hunger mechanic: the longer the snake, the more food it needs to keep going
Eating fruit resets hunger meter
- Prettier game board?  
- High score table at side
- add sound effects
*/

type Coord = [number, number]; // board coordinates

const DEFAULT_BOARD_SIZE = 20;
const MIN_BOARD_SIZE = 10;
const MAX_BOARD_SIZE = 40;
const INITIAL_SNAKE_SIZE = 6; // initial length of the snake

const INITIAL_SNAKE: Coord[] = [[10, 10]];

for (let i = 1; i < INITIAL_SNAKE_SIZE; i++) {
  let coord: Coord = [10, 10 - i];
  INITIAL_SNAKE.push(coord);
}

const INITIAL_DIRECTION: Coord = [0, 1];

const ICON_SIZE = 20; // size of each food icon

const fruits = [LuCherry, LuGrape, LuApple, LuBanana];

// Keep track of how many fruits are on the board
// todo Each fruit has 10 seconds to be eaten before it disappears
// let fruitsOnBoard = [];

let defaultFoodIcon = <LuApple color="var(--neon-color)" size={ICON_SIZE} />;

const SnakeGame: React.FC = () => {
  function getRandomFoodPosition(snake: Coord[]): Coord {
    while (true) {
      const pos: Coord = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize),
      ];
      if (!snake.some(([r, c]) => r === pos[0] && c === pos[1])) {
        return pos;
      }
    }
  }

  const [snake, setSnake] = useState<Coord[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Coord>(INITIAL_DIRECTION);
  const [boardSize, setBoardSize] = useState(DEFAULT_BOARD_SIZE);
  const [food, setFood] = useState<Coord>(() =>
    getRandomFoodPosition(INITIAL_SNAKE)
  );

  const [hunger, setHunger] = useState<number>(100);

  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const [foodIcon, setFoodIcon] = useState<React.ReactNode>(defaultFoodIcon);

  const [playCount, setPlayCount] = useState(0); // slightly hacky way to force death gif to play

  const directionRef = useRef(direction);
  directionRef.current = direction;

  const setDead = () => {
    setGameOver(true);
    setIsPlaying(false);
    setPlayCount((prev) => prev + 1);
  };

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

  // Separate loop for managing hunger decrease
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const hungerInterval = setInterval(() => {
      setHunger((prev) => {
        const decreaseAmount = score * 0.3;
        const nextHunger = Math.max(prev - decreaseAmount, 0);

        if (nextHunger === 0) {
          setDead();
        }

        return nextHunger;
      });
    }, 1000);

    return () => clearInterval(hungerInterval);
  }, [isPlaying, gameOver, score]);

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
        const wrappedRow = (newHead[0] + boardSize) % boardSize;
        const wrappedCol = (newHead[1] + boardSize) % boardSize;
        const wrappedHead: Coord = [wrappedRow, wrappedCol];

        // Checking collision with body
        if (prev.some(([r, c]) => r === wrappedRow && c === wrappedCol)) {
          setDead();
          return prev;
        }

        // Eat food
        const ateFood = wrappedRow === food[0] && wrappedCol === food[1];
        if (ateFood) {
          setFood(getRandomFoodPosition([wrappedHead, ...prev]));
          const Icon = fruits[Math.floor(Math.random() * fruits.length)];
          setFoodIcon(<Icon color="var(--neon-color)" size={ICON_SIZE} />);
          setScore((prevScore) => prevScore + 1);
          setHunger((prev) => Math.min(prev + 20, 100)); // restore 20 hunger
          return [wrappedHead, ...prev]; // grow snake
        }

        // Move as normal
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
    setHunger(100);
  };

  return (
    <>
      <div className="pt-10 mt-20 overflow-scroll">
        <div className="flex m-4 gap-2 items-center">
          <h2>You found the secret snake game!!</h2>
          <small>
            Ironically not written in Python... backend server calls are
            expensive!
          </small>
        </div>

        <p className="m-4 gap-2 items-center">
          <span className="flex">Use arrow keys to move the snake.</span>
          <span className="flex items-center gap-2">
            Use the zoom icons to increase and decrease the size of the board.
            <LuZoomIn
              className="cursor-pointer"
              size={25}
              onClick={() =>
                setBoardSize(
                  boardSize == MAX_BOARD_SIZE ? boardSize : boardSize + 5
                )
              }
            />
            <LuZoomOut
              className="cursor-pointer"
              size={25}
              onClick={() =>
                setBoardSize(
                  boardSize == MIN_BOARD_SIZE ? boardSize : boardSize - 5
                )
              }
            />
          </span>
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
          width: boardSize * 20,
          paddingBottom: "30px",
          margin: "20px",
        }}
      >
        <div className="m-4">
          <p>
            <b>Score: {score}</b>
          </p>
          <div className="flex items-center gap-3">
            <b>Hunger:</b>
            <div style={{ width: "100px", border: "1px solid black" }}>
              <div
                style={{
                  width: `${hunger}%`,
                  height: "10px",
                  backgroundColor: "green",
                }}
              />
            </div>
          </div>
        </div>

        {/* Actual board is here */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: `repeat(${boardSize}, 20px)`,
            gridTemplateColumns: `repeat(${boardSize}, 20px)`,
            border: "2px solid black",
            width: boardSize * 20,
            height: boardSize * 20,
            position: "relative",
            borderRadius: "8px",
          }}
        >
          {[...Array(boardSize * boardSize)].map((_, idx) => {
            const row = Math.floor(idx / boardSize);
            const col = idx % boardSize;

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
                {gameOver && isSnake && (
                  <img
                    key={playCount}
                    src={`${snakeDead}?reload=${playCount}`} /* need to append playcount to force reload*/
                    style={{
                      position: "absolute",
                      width: "40px",
                      height: "40px",
                    }}
                  />
                )}
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
                      backgroundColor: "red",
                      color: "white",
                    }}
                  >
                    Restart
                  </button>
                </>
              ) : (
                <button
                  onClick={startGame}
                  className="bg-green-600 bold cursor-pointer b-0 rounded-[8px]"
                  style={{
                    padding: "12px 24px",
                    fontSize: "20px",
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
