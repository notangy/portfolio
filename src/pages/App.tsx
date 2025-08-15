import baba from "../assets/baba.png";
import "../css/App.css";
import Typewriter from "typewriter-effect";
import { LuPointer } from "react-icons/lu";

const typingText: string[] = [
  "Hello world!",
  "¡Feliz jueves!",
  "if(goingToCrash)\n { dont(); }",
  "I am a teapot 🫖",
  "Don't panic! (unless you're using Golang)",
  "Freedom is the right of all sentient beings.",
  "Break things fast, fix them faster.",
  "Robert') DROP TABLE Students;",
];

const spinningWords = [
  "Software Engineer",
  "Frontend",
  "Backend",
  "UI/UX",
  "DevOps",
  "CI/CD",
];

function App() {
  return (
    <>
      <div className="w-full h-full flex p-2">
        <div className="w-1/2 ">
          <div className="mb-10">
            <h1>
              <Typewriter
                options={{
                  strings: typingText,
                  autoStart: true,
                  delay: 50,
                  loop: true,
                }}
              />
            </h1>
          </div>
          <p>
            Welcome! This page was made by <a href="/IAM">Nicole</a> to host
            projects, custom tools and other things she wants to show off.
          </p>
          <p className="flex gap-2">
            Feel free to poke around using the links up there!{" "}
            <LuPointer />{" "}
          </p>
        </div>
        <div className="w-1/2">
          <div className="neon-border float-right mr-8rem">
            <img src={baba} className="rounded-full " />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
