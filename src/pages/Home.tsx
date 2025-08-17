import "../css/Home.css";
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

function Home() {
  return (
    <div className="flex">
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
          Feel free to poke around using the links up there <LuPointer /> or
          scroll down if you'd prefer!
        </p>
      </div>

      <div className="w-1/2 flex flex-col items-end mr-40">
        <div className="neon-border rounded-full inline-block">
          <img
            src={"https://github.com/notangy.png"}
            className="rounded-full block"
          />
        </div>
        <p className="mt-10 text-center text-sm mr-20">
          Pictured above: my current GitHub avatar
        </p>
      </div>
    </div>
  );
}

export default Home;
