import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";

const email = import.meta.env.VITE_EMAIL;
const linkedin = import.meta.env.VITE_LINKEDIN;

export default function Links() {
  const socials = [
    {
      name: "GitHub",
      icon: <LuGithub size={24} />,
      url: "https://github.com/notangy",
    },
    {
      name: "LinkedIn",
      icon: <LuLinkedin size={24} />,
      url: linkedin,
    },
    {
      name: "Email",
      icon: <LuMail size={24} />,
      url: `mailto:${email}`,
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Let’s Connect</h2>
        <p className="text-gray-600 mb-12">
          I’m always open to collaborations, new opportunities, or just a
          friendly chat! Reach out through any of the platforms below:
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-3 rounded-2xl bg-white shadow-md border hover:shadow-lg hover:border-gray-300 transition-all duration-300"
            >
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {social.icon}
              </span>
              <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
