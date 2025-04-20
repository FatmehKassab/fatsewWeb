// src/components/UserList.js
import { useContext, useEffect } from "react";
import { DataContext } from "../../contexts/dataContext";
import { userAPI } from "../../apis/api";

const Users = () => {
  const { data, loading, error, getAll } = useContext(DataContext);

  useEffect(() => {
    getAll(userAPI);
  }, []);

  if (loading) return <div className="text-center py-4">Loading users...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((user) => (
          <div key={user._id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phoneNo}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              //   onClick={() => getUserDetails(user._id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
