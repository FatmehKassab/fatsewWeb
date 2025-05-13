import CommonForm from "../components/common/form";
import { useToast } from "../components/ui/use-toast";
import { registerFormControls } from "../../config";
import { registerUser } from "../store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { IMAGES } from "../utils/images";
import Button from "./Button";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/sign-in");
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="flex w-full max-w-5xl rounded-xl overflow-hidden shadow-lg bg-white">
        {/* Left panel */}
        <div className="w-1/2 bg-pink-100 p-8 relative flex flex-col items-center justify-center text-center">
         <Link to="/">
                          <img src={IMAGES.logo} className="w-40 " alt="Logo" />
                        </Link>
                
                    <img src={IMAGES.cats}   alt="Cats in basket"
                    className="w-1/2 mt-8"/>
        
        </div>

        {/* Right panel */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-black text-center text-primary">
            Create New Account
          </h2>

          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <div className="flex items-center border-b border-gray-300 py-2">
      
              <input
                type="text"
                required
                placeholder="Username"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
        
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
    
              <input
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full outline-none"
              />
            </div>
         
      <Button
           type="submit"
            title=" Sign up"
            variant="primary-btn"
          />
          

            <p className="text-center text-sm text-gray-500 ">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="mx-2 text-sm text-gray-400">or</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            <div
                         type="button"
                         className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary  rounded-full hover:bg-pink-50"
                       >
                             <img src={IMAGES.google}    alt="Google" className="w-8 h-8"
                       />
                         Use Google Account
                       </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
