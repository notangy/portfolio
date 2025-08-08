import baba from "./assets/baba.png";
import "./App.css";
import Typewriter from 'typewriter-effect';

const typingText: string[] = [
  "Hello world!", 
  "¡Feliz jueves!", 
  "if(goingToCrash)\n { dont(); }", 
  "I am a teapot 🫖", 
  "Don't panic! (unless you're using Golang)", 
  "Freedom is the right of all sentient beings.",
  "Break things fast, fix them faster.",
  "Robert') DROP TABLE Students;"];

function App() {
  return (
    <>
      <div className="flex h-screen w-screen p-5">
        <div className="w-1/2 ">
        <div className="mb-10">
        <h1>
        <Typewriter options={{
          strings: typingText, autoStart: true, delay: 50, loop: true}}
          />
          </h1>
          </div>
          <p>Welcome! This page was made by Nicole to host projects, custom tools and other things she wants to show off.</p>
          <p>Feel free to poke around using the links above! ☝️</p>
          </div>
        <div className="w-1/2">
        
          <div className="neon-border float-right ">
            <img src={baba} className="rounded-full " />
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
