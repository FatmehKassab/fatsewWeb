import React from "react";
import { IMAGES } from "../utils/images";
import { icons } from "../utils/icons";
import Button from "./CustomButton";

const ProductCard = ({ data }) => {
  return (
    <div className="w-auto h-[400px] overflow-hidden flex flex-col items-center justify-between">
      <img
        src={IMAGES[data.image]}
        alt={data.product}
        className="w-full h-3/4 rounded-xl object-cover"
      />
      <div className="w-full h-1/4 text-textGrey">
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-xl font-semibold">{data.product}</h2>
          <img src={icons["stroke_heart"]} alt="wishlist" className="w-6 h-6" />
        </div>
        <p className="text-sm border-b-2 pb-1">{data.category}</p>
        <div className="flex justify-between items-center pr-2">
          <p className="text-lg font-semibold">{data.price}.00 $</p>
          <div className="w-fit">
            <Button
              type="button"
              title="order now"
              variant="primary-btn"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
