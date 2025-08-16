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
import { Tooltip } from "@mui/material";

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
    <div>
      <small className="text-white">Last updated 08/2025</small>
      <div className="p-2">
        <h1 className="mb-3">Nice of you to stop by!</h1>
        <p className="mb-4">
          Nicole is a mid-level fullstack software engineer with 3 years
          experience in the cybersecurity industry.
          <br />
          Her skillset is as follows (hover over for names):
        </p>

        <div className="hexGrid block w-1/2">
          {hexagonRows.map((row: HexagonProps[], rowIndex: number) => (
            <div key={rowIndex} className="hexRow flex justify-center">
              {row.map((hex, index) => (
                <div key={index} className="mx-1">
                  <Tooltip title={hex.tooltip} placement="top">
                    <hex.icon
                      className="items-center m-auto mt-8 text-white"
                      size={30}
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
          ))}
        </div>
        <b>Fun facts!</b>

        <div className="m-[5px] block flex w-1/2">
          <ul className="list-disc m-4">
            <li>
              She graduated from Abertay Universtiy in 2020 with first class
              honors in Computing 🎓
            </li>
            <li>Her favorite Transformer is Soundwave</li>
            <li>When she isn't coding, she likes to sew custom plushies</li>
            <li>
              She is interested in DevOps and is currently learning Java ☕️
            </li>
            <li>
              Scared of spiders, but doesn't mind <a href="./snake">snakes</a>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Iam;
