import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SocialIcons() {
  return (
    <div className="flex mt-2 gap-2 text-2xl">
      <Link
        to="https://t.me"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        <FaTelegram />
      </Link>
      <Link
        to="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        <FaInstagram />
      </Link>
      <Link
        to="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        <FaFacebook />
      </Link>
      <Link
        to="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        <FaSquareXTwitter />
      </Link>
    </div>
  );
}
