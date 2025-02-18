import { Link } from "react-router-dom";

const menuItems = [
  { name: "Prices", href: "/prices" },
  { name: "Sign in", href: "/sign-in" },
  { name: "Sign up", href: "/sign-up" },
];

export default function Navbar() {
  return (
    <nav className="border-b border-b-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold">URL Shortener</span>
        </Link>
        <ul className="flex space-x-8">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="block py-2 px-3 hover:text-gray-500"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
