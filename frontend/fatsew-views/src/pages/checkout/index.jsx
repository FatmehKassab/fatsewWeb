import Address from "../../components/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "../../components/cart-items-content";
import  Button  from "../../components/Button";
import { useState } from "react";
import { createNewOrder } from "../../store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { useToast } from "../../components/ui/use-toast";
import React from "react";
import { IMAGES } from "../../utils/images";
import NavBar from "../../components/NavBar";
import CTA2 from "../../components/CTA2";
import Footer from "../../components/Footer";
function Checkout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            ( currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },

      totalAmount: totalCartAmount,
      orderDate: new Date(),
  

    };

    dispatch(createNewOrder(orderData)).then((data) => {
 
        setIsPaymemntStart(true);
      
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

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
             Checkout
              </h1>
            </div>
          </section>
    
          <section className="flex flex-col items-center gap-5 pb-10">
          
        <div className=" w-[80%]">
             <div className="flex flex-col">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4 text-textGrey">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            
                   <Button
                
                  onClick={handleInitiatePaypalPayment}
                    variant="primary-btn  w-full"
                    title=   {isPaymentStart
                ? "Processing Payment..."
                : "Checkout"}
                  />
                 
           
          </div>
        </div>
      </div>
    </div>
        </div>
              
          </section>
          <CTA2 />
    
          <Footer />
        </>

  );
}

export default Checkout;
