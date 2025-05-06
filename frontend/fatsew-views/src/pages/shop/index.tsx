import React, { useState } from "react";
import { IMAGES } from "../../utils/images";
import NavBar from "../../components/NavBar";
import SearchInput from "../../components/SearchInput";
import ProductCard from "../../components/ProductCard"; // new component
import Button from "../../components/Button";
import { icons } from "../../utils/icons";
import CTA2 from "../../components/CTA2";
import Footer from "../../components/Footer";

export const CATEGORIES_FILTERS = [
  "All",
  "Clothes",
  "Plushies",
  "Keychain",
  "Bags",
  "Amigurumi",
  "Summer",
  "Beanies",
  "Scarves",
];

export const Products = [
  { image: "sweater", category: "Clothes", product: "Sweater", price: 120 },
  { image: "bee", category: "Plushies", product: "Bee", price: 25 },
  {
    image: "keychain",
    category: "Keychain",
    product: "Teddy Keychain",
    price: 20,
  },
  { image: "bag", category: "Bags", product: "Shoulder Bag", price: 40 },
  { image: "koala", category: "Plushies", product: "Koala Doll", price: 35 },
  { image: "shrug", category: "Clothe", product: "Shrug", price: 110 },
  { image: "koala4", category: "Plushies", product: "Koala", price: 35 },
  { image: "bra", category: "Clothes", product: "Bralette", price: 60 },
];

const Shop = () => {
  const allProducts = Products;
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts =
    activeFilter === "all"
      ? allProducts
      : allProducts.filter(
          (product) => product.category.toLowerCase() === activeFilter
        );

  return (
    <>
      <section className="relative w-full h-[400px]">
        <img
          src={IMAGES.banner}
          className="absolute w-full h-full object-cover"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-gradient-white z-1" />
        <div className="absolute inset-0 flex flex-col items-center justify-between z-2 px-4">
          <div className="w-full flex justify-center">
            <NavBar />
          </div>
          <h1 className="absolute top-[60%] text-5xl text-white font-black uppercase">
            Shop
          </h1>
        </div>
      </section>

      <section className="flex flex-col items-center gap-5 pb-10">
        <div className="w-[80%]">
          <SearchInput />
        </div>

        <div className="w-[80%] flex flex-col gap-10">
          <div className="flex flex-wrap gap-2 lg:gap-3 items-center">
            <span className="text-textGrey">Categories:</span>
            {CATEGORIES_FILTERS.map((filter, index) => (
              <div
                key={index}
                className={`${
                  activeFilter === filter.toLowerCase()
                    ? "bg-secondary text-white"
                    : "bg-white border-secondary border-2 text-secondary"
                } rounded-md py-1 px-5 font-semibold cursor-pointer`}
                onClick={() => setActiveFilter(filter.toLowerCase())}
              >
                <p className="text-sm">{filter}</p>
              </div>
            ))}
            <span className="text-textGrey">
              Shop and Customize: Find Your Perfect Crochet Piece or Create
              Something Uniquely Yours!
            </span>
          </div>

          <div className="grid grid-cols-4 gap-10 items-center justify-between">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
        </div>

        <Button
          title="View more products"
          variant="border-btn-primary"
          onClick={"j"}
        />
      </section>
      <CTA2 />

      <Footer />
    </>
  );
};

export default Shop;
