import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../utils/images";
import { NavLinks } from "../utils/data";
import { icons } from "../utils/icons";
import Button from "./Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser,loginUser } from "../store/auth-slice";
// import { Button } from "./ui/button";
import { Sheet} from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import UserCartWrapper from "./cart-wrapper";


const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate(); // To navigate after logout

  useEffect(() => {
 

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }
    function handleLogin() {
   navigate("/sign-in");
  }



  return (
    <nav
      className={`fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "w-full md:px-10 bg-white shadow-md"
          : "w-full md:w-[80%] px-3"
      } ${isAuthenticated ? "" : ""}`} // Apply red background if authenticated
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
            {!isAuthenticated && (
              <Button
                title="sign in"
                variant="primary-btn"
                onClick={handleLogin}
              />
            )}
          </div>
        </div>
      )}

      <div className="bg-white flex items-center justify-between rounded-xl mx-auto pl-2 pr-6">
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

        {/* Conditional rendering of sign in or logout button */}
        <div className={`w-fit ${isScrolled ? "hidden md:block" : "hidden"}`}>
          {!isAuthenticated ? (
            <Button title="sign in" variant="primary-btn" onClick={"j"} />
          ) : (

            <Button
              title="log out"
              variant="secondary-btn"
              onClick={handleLogout}
            />
          )}
        </div>

{isAuthenticated &&  <div className="">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <div
          onClick={() => setOpenCartSheet(true)}
       
          className="relative bg-white"
        >
          <ShoppingCart className="w-10 h-10" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </div>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
   </div> }
        
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
 
      </div>
    </nav>
  );
};

export default NavBar;
