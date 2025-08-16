import "../css/Navbar.css";
import { menuItems } from "../pages/main.tsx";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  return (
    <nav className="navbar w-full h-12 p-15 flex items-center relative">
      <div className="logo-box text-2xl font-bold">
        <span>N</span>
        <sub className="text-xs top-3">2</sub>
        <div className="atom" />
      </div>
      <ul className="flex flex-row space-x-6 list-none m-0 p-0 mx-auto gap-4">
        {menuItems.map((item) => (
          <li key={item.label} className="highlight">
            <button
              className="font-extrabold flex items-center gap-2"
              onClick={() => scrollToSection(item.path)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
