import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGES } from "../utils/images";

const testimonials = [
  {
    text: `Fatsew produce perfect cozy and neat items highly recommended. I bought a bag and a cardigan—they are perfect. Customization is a perfect feature and a fast delivery. Plushies are amazing, many ideas. Keep going!`,
    name: "Fatmeh Kassab",
  },
  {
    text: `I love the plushies! They’re adorable and very well made. Highly recommend!`,
    name: "Sara L.",
  },
  {
    text: `Fatsew produce perfect cozy and neat items highly recommended. I bought a bag and a cardigan—they are perfect. Customization is a perfect feature and a fast delivery. Plushies are amazing, many ideas. Keep going!`,
    name: "Fatmeh Kassaffffffffffb",
  },

  {
    text: `I love the plushies! They’re adorable and very well made. Highly recommend!`,
    name: "Sara Lffffff.",
  },
];

export default function Swiper() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1.5 } },
      { breakpoint: 500, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="w-full h-auto flex items-center py-10  ">
      <div className="  w-[40%] ">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="">
              <div className="bg-primary w-[450px] h-[450px] text-white p-6 rounded-xl ">
                <div className="text-4xl mb-4">“</div>
                <p className="text-sm leading-relaxed">{item.text}</p>
                <div className="flex items-center mt-4">
                  <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
                  <span className="font-semibold">{item.name}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-[60%]">
        <img
          src={IMAGES.customers}
          className=" w-full h-full object-contain rounded-l-xl"
          alt="Banner"
        />
      </div>
    </section>
  );
}
