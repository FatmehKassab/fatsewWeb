// import React, { useState } from "react";
// import { IMAGES } from "../../utils/images";
// import NavBar from "../../components/NavBar";
// import SearchInput from "../../components/SearchInput";
// import ProductCard from "../../components/ProductCard"; // new component
// import Button from "../../components/CustomButton";
// import { icons } from "../../utils/icons";
// import CTA2 from "../../components/CTA2";
// import Footer from "../../components/Footer";

// export const CATEGORIES_FILTERS = [
//   "All",
//   "Clothes",
//   "Plushies",
//   "Keychain",
//   "Bags",
//   "Amigurumi",
//   "Summer",
//   "Beanies",
//   "Scarves",
// ];

// export const Products = [
//   { image: "sweater", category: "Clothes", product: "Sweater", price: 120 },
//   { image: "bee", category: "Plushies", product: "Bee", price: 25 },
//   {
//     image: "keychain",
//     category: "Keychain",
//     product: "Teddy Keychain",
//     price: 20,
//   },
//   { image: "bag", category: "Bags", product: "Shoulder Bag", price: 40 },
//   { image: "koala", category: "Plushies", product: "Koala Doll", price: 35 },
//   { image: "shrug", category: "Clothe", product: "Shrug", price: 110 },
//   { image: "koala4", category: "Plushies", product: "Koala", price: 35 },
//   { image: "bra", category: "Clothes", product: "Bralette", price: 60 },
// ];

// const Shop = () => {
//   const allProducts = Products;
//   const [activeFilter, setActiveFilter] = useState("all");

//   const filteredProducts =
//     activeFilter === "all"
//       ? allProducts
//       : allProducts.filter(
//           (product) => product.category.toLowerCase() === activeFilter
//         );

//   return (
//     <>
//       <section className="relative w-full h-[400px]">
//         <img
//           src={IMAGES.banner}
//           className="absolute w-full h-full object-cover"
//           alt="Banner"
//         />
//         <div className="absolute inset-0 bg-gradient-white z-1" />
//         <div className="absolute inset-0 flex flex-col items-center justify-between z-2 px-4">
//           <div className="w-full flex justify-center">
//             <NavBar />
//           </div>
//           <h1 className="absolute top-[60%] text-5xl text-white font-black uppercase">
//             Shop
//           </h1>
//         </div>
//       </section>

//       <section className="flex flex-col items-center gap-5 pb-10">
//         <div className="w-[80%]">
//           <SearchInput />
//         </div>

//         <div className="w-[80%] flex flex-col gap-10">
          // <div className="flex flex-wrap gap-2 lg:gap-3 items-center">
          //   <span className="text-textGrey">Categories:</span>
          //   {CATEGORIES_FILTERS.map((filter, index) => (
          //     <div
          //       key={index}
          //       className={`${
          //         activeFilter === filter.toLowerCase()
          //           ? "bg-secondary text-white"
          //           : "bg-white border-secondary border-2 text-secondary"
          //       } rounded-md py-1 px-5 font-semibold cursor-pointer`}
          //       onClick={() => setActiveFilter(filter.toLowerCase())}
          //     >
          //       <p className="text-sm">{filter}</p>
          //     </div>
          //   ))}
          //   <span className="text-textGrey">
          //     Shop and Customize: Find Your Perfect Crochet Piece or Create
          //     Something Uniquely Yours!
          //   </span>
          // </div>

//           <div className="grid grid-cols-4 gap-10 items-center justify-between">
//             {filteredProducts.map((product, index) => (
//               <ProductCard key={index} data={product} />
//             ))}
//           </div>
//         </div>

//         <Button
//           title="View more products"
//           variant="border-btn-primary"
//           onClick={"j"}
//         />
//       </section>
//       <CTA2 />

//       <Footer />
//     </>
//   );
// };

// export default Shop;


import { IMAGES } from "../../utils/images";
import NavBar from "../../components/NavBar";
import SearchInput from "../../components/SearchInput";
// import ProductCard from "../../components/ProductCard"; // new component
import Button from "../../components/Button";
// import { icons } from "../../utils/icons";
import CTA2 from "../../components/CTA2";
import Footer from "../../components/Footer";
import ProductFilter from "../../components/filter";
import ProductDetailsDialog from "../../components/product-details";
import ShoppingProductTile from "../../components/product-tile";
// import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useToast } from "../../components/ui/use-toast";
import { sortOptions } from "../../../config";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import React from "react";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

function Shop() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  console.log(productList, "productListproductListproductList");

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
    <div className=" w-[80%]">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
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
}

export default Shop;
