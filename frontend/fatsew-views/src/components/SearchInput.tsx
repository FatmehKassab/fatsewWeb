import React from "react";
import Button from "./Button";

const SearchInput = () => {
  return (
    <form className="max-w-md mx-auto relative">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="search"
          id="default-search"
          className="block w-full py-2.5 ps-10 pr-28 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
          required
        />

        {/* Button inside input */}
        <div className="absolute inset-y-0 end-1 flex items-center">
          <Button title="Search" variant="primary-btn " />
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
