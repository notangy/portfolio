const projectList = [
  {
    name: "This website!",
    description: "React, Typescript, Tailwind CSS...",
  },
  {
    name: "DisClone",
    description:
      "Trying out AI fine-tuning by training a base model on Discord chat logs.",
  },
];

function Projects() {
  return (
    <div className="w-full h-full">
      <small>Last updated 08/2025</small>
      <p>A constant work in progress ;)</p>

      <div className="m-2">
        {projectList.map((p) => (
          <div className="w-full border-4 rounded-lg p-5">
            {p.name}
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
