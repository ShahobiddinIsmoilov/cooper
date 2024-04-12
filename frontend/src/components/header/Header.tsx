import { Link } from "react-router-dom";
import { Authentication } from "./Authentication";

export default function Header() {
  return (
    <div className="flex justify-between bg-dark-900 h-full text-white px-4 xs:px-8 py-2 items-center">
      <Link to="/home" className="no-underline">
        <p className="text-base xs:text-2xl">Shredded</p>
      </Link>
      <Authentication />
    </div>
  );
}
