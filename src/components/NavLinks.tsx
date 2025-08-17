import { menuItems } from "../pages/main";
import "../css/Navbar.css";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    // If element doesn't exist, redirect to home
    window.location.href = "/portfolio";
  }
};

export default function NavLinks() {
  return (
    <ul className="flex flex-col md:flex-row gap-6 mx-auto">
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
  );
}
