import CommonForm from "../components/common/form";
import { useToast } from "../components/ui/use-toast";
import { loginFormControls } from "../../config";
import { loginUser } from "../store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { IMAGES } from "../utils/images";
import Button from "./Button";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
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
          <h2 className="text-2xl font-bold text-center text-pink-600">
            Welcome to fatsew
          </h2>

          <form onSubmit={onSubmit} className="mt-8 space-y-6">
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

            <div className="flex justify-between text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" /> Remember me
              </label>
              <Link to="/forgot-password" className="hover:underline">
                Forget password?
              </Link>
            </div>
  <Button
           type="submit"
            title=" Sign in"
            variant="primary-btn"
          />
           

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link to="/sign-up" className="text-primary hover:underline">
                Sign up
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

export default Login;
