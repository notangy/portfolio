import "../css/Home.css";
import Typewriter from "typewriter-effect";
import { LuPointer } from "react-icons/lu";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../css/swiperOverride.css";

import Alfie from "../assets/alfie.jpg";
import Fancy from "../assets/fancy.jpg";

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

const imageCarousel = [
  {
    url: Alfie,
    caption: "Me & Alfie",
  },
  {
    url: "https://github.com/notangy.png",
    caption: "My current GitHub avatar",
  },
  {
    url: Fancy,
    caption: "From my wedding!",
  },
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
    <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
      <div className="w-full md:w-1/2">
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

      {/* <div className="neon-border rounded-[20%] inline-block">
          <img
            src={"https://github.com/notangy.png"}
            
          />
        </div>
        */}

      <div className="w-full md:w-1/2 p-5">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          className="min-w-[200px]"
          loop={true}
        >
          {imageCarousel.map((img, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center p-20"
            >
              <div className="overflow-hidden rounded-[20%] neon-border w-full ">
                <img
                  src={img.url}
                  alt={`Avatar ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="mt-3 text-center text-sm">Image: {img.caption}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Home;
