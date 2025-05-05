import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../utils/images";
import { NavLinks } from "../utils/data";
import { icons } from "../utils/icons";
import Button from "./Button";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "w-full md:px-10 bg-white shadow-md"
          : "w-full md:w-[80%] px-3"
      }`}
    >
      {!isScrolled && (
        <div className="flex flex-col sm:flex-row items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <span className="text-white text-xl font-medium">
              Call to our crochet app
            </span>
            <img src={icons.chevron_right} className="w-4 h-4 mt-1" alt=">" />
          </div>

          <div className="flex items-center justify-center gap-4">
            <img src={icons.instagram} className="w-6 h-6" alt="insta" />
            <img src={icons.pinterest} className="w-6 h-6" alt="pinterest" />
            <Button title="sign in" variant="primary-btn" onClick={"j"} />
          </div>
        </div>
      )}

      <div className="bg-white  flex items-center justify-between rounded-xl mx-auto pl-2 pr-6">
        <Link to="/home">
          <img src={IMAGES.logo} className="w-32 h-24" alt="Logo" />
        </Link>

        <div className="inline-flex items-center justify-center md:hidden">
          <img src={icons.burger_menu} className="w-10 h-10" alt="Menu" />
        </div>

        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
            {NavLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className="block cursor-pointer text-xl font-bold text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`w-fit ${isScrolled ? "hidden md:block" : "hidden"}`}>
          <Button title="sign in" variant="primary-btn " onClick={"j"} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
