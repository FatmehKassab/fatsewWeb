import React from "react";
import { IMAGES } from "../utils/images";
import Button from "./Button";

const CTA = () => {
  return (
    <section className="w-full h-[250px] flex justify-center items-center text-white text-center text-[20px] font-semibold bg-primary">
      {/* Left image */}
      <div>
        <div>
          <img src={IMAGES.boy} alt="girl" className="w-[103px] h-[237px]" />
        </div>
      </div>

      {/* Center text and button */}
      <div className="w-[60%] h-full flex flex-col justify-center items-center gap-5">
        <p>
          Bring your imagination to life with our custom crochet amigurumi
          dolls! Perfectly handmade, uniquely yours, and crafted with love.
          Order now to create your one-of-a-kind treasure!
        </p>
        <div className="w-fit">
          {" "}
          <Button
            title="Customize now !"
            variant="border-btn"
            icon="chevron_right"
            onClick={"j"}
          />
        </div>
      </div>

      {/* Right image */}
      <div>
        <img src={IMAGES.girl} alt="girl" className="w-[103px] h-[237px]" />
      </div>
    </section>
  );
};

export default CTA;
