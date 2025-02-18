import Link from "next/link";

const links = [
  { name: "Home", href: "/" },
  { name: "Feedback", href: "/feedback" },
  { name: "Prices", href: "/prices" },
  { name: "Data Policy", href: "/data-policy" },
  { name: "Terms Service", href: "/terms-service" },
  { name: "Donate", href: "/donate" },
];

export const Footer = () => {
  return (
    <footer className="mt-auto bg-white text-gray-700 py-8 border-t border-t-neutral-300">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="flex space-x-6">
          {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} URL Shortener. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
