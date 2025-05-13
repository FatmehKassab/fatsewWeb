import { Card, CardContent, CardFooter } from "./ui/card";

import {  categoryOptionsMap } from "../../config";
import { Badge } from "./ui/badge";
import React from "react";
import { icons } from "../utils/icons";
import Button from "./Button";
function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
     <div  className="w-auto h-[400px] overflow-hidden flex flex-col items-center justify-between">
    
    
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-3/4 rounded-xl object-cover"
            onClick={() => handleGetProductDetails(product?._id)}
          />
          {product?.totalStock === 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) }
    
    <div className="w-full h-1/4 text-textGrey">
            <div className="flex items-center justify-between pt-1">
              <h2 className="text-xl font-semibold">{product?.title}</h2>
              <img src={icons["stroke_heart"]} alt="wishlist" className="w-6 h-6" />
            </div>
            <p className="text-sm border-b-2 pb-1"> {categoryOptionsMap[product?.category]}</p>
            <div className="flex justify-between items-center pr-2">
              <p className="text-lg font-semibold">{product?.price}.00 $</p>
              <div className="w-fit">
                {product?.totalStock === 0 ? (
          <Button  title="Out Of Stock" className="w-full opacity-60 cursor-not-allowed"/>
         
    
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            title="add to cart"
            variant="primary-btn"
          />
       
        )}
                
              </div>
            </div>
          </div>
       
      </div>
     
  
  );
}

export default ShoppingProductTile;
