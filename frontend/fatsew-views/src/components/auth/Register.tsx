import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    role: "user",
    addresses: [
      {
        country: "",
        city: "",
        street: "",
        building: "",
        floor: "",
        isDefault: true,
      },
    ],
  });
  const [error, setError] = useState(null);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    name,
    email,
    password,
    phoneNo,
    role,
    addresses: [{ country, city, street, building, floor, isDefault }],
  } = formData;

  const onChange = (e) => {
    if (
      ["country", "city", "street", "building", "floor"].includes(e.target.name)
    ) {
      setFormData({
        ...formData,
        addresses: [
          {
            ...formData.addresses[0],
            [e.target.name]: e.target.value,
          },
        ],
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={name}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNo" className="sr-only">
                Phone Number
              </label>
              <input
                id="phoneNo"
                name="phoneNo"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">Address</h3>
              <div className="mt-2 grid grid-cols-1 gap-y-4">
                <div>
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Country"
                    value={country}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label htmlFor="city" className="sr-only">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="City"
                    value={city}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label htmlFor="street" className="sr-only">
                    Street
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Street"
                    value={street}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label htmlFor="building" className="sr-only">
                    Building
                  </label>
                  <input
                    id="building"
                    name="building"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Building"
                    value={building}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label htmlFor="floor" className="sr-only">
                    Floor
                  </label>
                  <input
                    id="floor"
                    name="floor"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Floor"
                    value={floor}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
