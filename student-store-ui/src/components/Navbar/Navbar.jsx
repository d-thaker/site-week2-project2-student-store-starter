import { Link } from "react-router-dom";

import "./Navbar.css";
import Logo from "../Logo/Logo";

export default function Navbar() {
  return (
    <nav className="Navbar">
      <div className="content">
        <div className="logo">
          <Logo />
        </div>
        <ul className="links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/#About">About Us</Link>
          </li>
          <li>
            <Link to="/#Contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/#Buy">Buy Now</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
