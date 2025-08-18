const projectList = [
  {
    title: "DisClone",
    description: `Experimenting with AI fine-tuning. 
      Training data comes from Discord chat logs of a given user, 
      and results in a bot that can generate text based on these logs.`,
    tech: ["Python", "Huggingface", "LoRA"],
    links: [{ label: "GitHub", url: "https://github.com/notangy/DisClone" }],
  },
  // {
  //   title: "Movie Diary",
  //   description: `Studies show that people spend more time choosing something to watch than actually watching things.
  //     This is a small helper site to track movie/show history, offer recommendations, and other neat things.`,
  //   tech: ["TypeScript", "React", "Tailwind CSS"],
  //   links: [],
  // },
  {
    title: "AO3lytics",
    description: `A CLI tool and self-hosted dashboard to aggregate AO3 user statistics.`,
    tech: ["Python", "Flask", "MongoDB"],
    links: [],
  },
  {
    title: "This website!",
    description: "A constantly-updated hub and learning project for React :)",
    tech: ["TypeScript", "React", "Tailwind CSS"],
    links: [],
  },
];

export default function Projects() {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>

      <p className="m-2">A constant work in process...</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectList.map((project, index) => (
          <div
            key={index}
            className="rounded-2xl border-8 shadow-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-sm rounded-lg bg-(--neon-color) text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 neon-bord">
              {project.links.map((link, i) => (
                <a key={i} href={link.url} className="underline">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
