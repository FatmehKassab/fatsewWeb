import React from "react";
import { WhyUs } from "../utils/data";
import { icons } from "../utils/icons";

const WhyUsSection = () => {
  return (
    <section className="flex items-center justify-center p-3  ">
      <div className="md:w-[80%] grid md:grid-cols-2 lg:grid-cols-3 gap-5 text-center">
        {WhyUs.map((item, index) => (
          <div
            key={index}
            className={`-translate-y-24 z-1 bg-white w-auto flex flex-col justify-center items-center gap-5 shadow-md text-primary rounded-xl p-5 ${
              index === 2 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <img src={icons[item.icon]} className="w-12 h-12" alt="insta" />
            <h1 className="text-2xl font-black capitalize">{item.title}</h1>
            <p className="text-lg font-medium">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;
