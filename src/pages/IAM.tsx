import {
  SiTypescript,
  SiJavascript,
  SiTerraform,
  SiSvelte,
  SiPython,
  SiReact,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import React from "react";
import "../css/Iam.css";
import chunk from "lodash/chunk";
import { Tooltip } from "@material-tailwind/react";

interface HexagonProps {
  tooltip: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const hexagons: HexagonProps[] = [
  { tooltip: "Python", icon: SiPython },
  { tooltip: "Typescript", icon: SiTypescript },
  { tooltip: "Javascript", icon: SiJavascript },
  { tooltip: "Terraform", icon: SiTerraform },
  { tooltip: "Golang", icon: FaGolang },
  { tooltip: "Svelte", icon: SiSvelte },
  { tooltip: "React", icon: SiReact },
  { tooltip: "PostgreSQL", icon: SiPostgresql },
  { tooltip: "Docker", icon: SiDocker },
];

// Split hexagons into rows

let hexagonsPerRow = 5; // Number of hexagons per row
const hexagonRows = chunk(hexagons, hexagonsPerRow);

function Iam() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <small className="block text-gray-400 mb-4">Last updated 08/2025</small>

      <h1 className="text-3xl font-bold mb-3">Nice of you to stop by!</h1>
      <p className="text-lg mb-6">
        Nicole is a mid-level fullstack software engineer with 3 years
        experience in the cybersecurity industry.
        <br />
        Her skillset is as follows (hover over for names):
      </p>

      <div className="grid grid-cols-1 md:grid-rows-2 gap-6">
        <div className="rounded-2xl w-full flex justify-center items-center">
          <div className="hexGrid items-center">
            {hexagonRows.map((row: HexagonProps[], rowIndex: number) => (
              <div key={rowIndex} className="hexRow flex justify-center mb-2">
                {row.map((hex, index) => (
                  <div key={index} className="mx-1">
                    <Tooltip
                      content={<div className="p-2">{hex.tooltip}</div>}
                      placement="bottom"
                    >
                      <hex.icon
                        className="items-center m-auto mt-8 text-white transition-transform hover:scale-110"
                        size={30}
                      />
                    </Tooltip>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="rounded-2xl shadow-lg p-6 ">
          <h2 className="text-xl font-semibold mb-4">Fun facts!</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              She graduated from Abertay University in 2020 with first class
              honors in Computing 🎓
            </li>
            <li>Her favorite Transformer is Soundwave</li>
            <li>When she isn't coding, she likes to sew custom plushies</li>
            <li>
              She is interested in DevOps and is currently learning Java ☕️
            </li>
            <li>
              Scared of spiders, but doesn't mind{" "}
              <a href="./snake" className="underline text-blue-400">
                snakes
              </a>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Iam;
