import { filterOptions } from "../../config";
import { Fragment } from "react";
import React from "react";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="py-4 space-y-2">
      {Object.keys(filterOptions).map((keyItem) => (
        <Fragment key={keyItem}>
    
          
           <div className="flex flex-wrap gap-2 lg:gap-3 items-center">
             <span className="text-textGrey">Categories:</span>
              {filterOptions[keyItem].map((option) => {
                const isActive =
                  filters &&
                  filters[keyItem] &&
                  filters[keyItem].includes(option.id);

                return (
                  <div
                    key={option.id}
                    onClick={() => handleFilter(keyItem, option.id)}
                    className={`px-4 py-1 rounded-md cursor-pointer text-sm font-semibold border-2 transition-colors
                      ${
                        isActive
                          ? "bg-secondary text-white border-secondary"
                          : "bg-white text-secondary border-secondary hover:bg-secondary hover:text-white"
                      }`}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
        <span className="text-textGrey">
     Shop and Customize: Find Your Perfect Crochet Piece or Create
           Something Uniquely Yours!
          </span>
         
        </Fragment>
      ))}
    </div>
  );
}

export default ProductFilter;
