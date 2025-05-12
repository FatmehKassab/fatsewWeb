import React from "react";
import { IMAGES } from "../utils/images";
import { icons } from "../utils/icons";
import { FooterLinks, NavLinks } from "../utils/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full h-full bg-white flex flex-col items-center ">
      <div className="w-[90%] md:w-[80%] h-[75%]  flex flex-wrap justify-between items-start gap-10 p-4 font-bold ">
        <ul className="flex flex-col gap-2 list-none  ">
          {NavLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                className="block cursor-pointer text-lg text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-2 list-none  ">
          {FooterLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                className="block cursor-pointer text-lg text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 text-primary text-lg font-bold">
          <p>Are you a crocheter?</p>
          <p>Discover our crochet app now!</p>
        </div>
      </div>

      <div className="w-[90%] md:w-4/5 h-[25%] border-t border-primary flex justify-between items-center px-4">
        <div>
          <img src={IMAGES.logo} className="h-24" alt="Logo" />
        </div>
        <div className="flex gap-4 ">
          <div className="bg-primary rounded-full p-2">
            <img src={icons.instagram} className="w-6 h-6 " alt="insta" />
          </div>
          <div className="bg-primary rounded-full p-2">
            <img src={icons.pinterest} className="w-6 h-6  " alt="pinterest" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
