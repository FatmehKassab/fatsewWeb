import  Button  from "./Button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import React from "react";
function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 text-textGrey ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
         <Button
       onClick={() => handleEditAddress(addressInfo)}
       
        variant="primary-btn"
        title=" edit"
      />
       <Button
     onClick={() => handleDeleteAddress(addressInfo)}
       
        variant="border-btn-primary"
        title="delete"
      />
       
      
      
       
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
