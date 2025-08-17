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

// const spinningWords = [
//   "Software Engineer",
//   "Frontend",
//   "Backend",
//   "UI/UX",
//   "DevOps",
//   "CI/CD",
// ];

function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <div className="w-1/2 ">
        <div className="mb-10">
          <h1>
            <Typewriter
              options={{
                strings: typingText,
                autoStart: true,
                delay: 90,
                loop: true,
              }}
            />
          </h1>
        </div>
        <p>
          Welcome! This page was made by Nicole to host projects, custom tools
          and other things she wants to show off.
        </p>
        <p>
          Feel free to poke around using the links up there
          <LuPointer
            size={24}
            className="inline-block align-text-bottom mx-1"
          />{" "}
          or scroll down if you'd prefer!
        </p>
      </div>

      {/* Image Div here */}
      <div className="w-full md:w-1/2 flex flex-col items-center sm:mt-20 md:items-end md:mr-40 mb-10 md:mb-0">
        <div className="neon-border rounded-full inline-block">
          <img
            src={"https://github.com/notangy.png"}
            className="rounded-full block md:w-64 md:h-64 lg:w-80 lg:h-80"
          />
        </div>
        <p className="mt-10 text-center text-sm lg:mr-10">
          Pictured above: my current GitHub avatar
        </p>
      </div>
    </div>
  );
}

export default Home;
