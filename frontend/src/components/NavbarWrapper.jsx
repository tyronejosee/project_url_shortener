import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function NavbarWrapper() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}
