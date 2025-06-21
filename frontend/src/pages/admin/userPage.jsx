import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUserPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllUsers(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        if (err.response && err.response.status === 401) {
          setError("Unauthorized: Please login again.");
        } else if (err.response && err.response.status === 403) {
          setError("Access denied.");
        } else {
          setError("Failed to load users.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full h-screen bg-gray-300 max-h-full overflow-y-scroll p-4">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[70px] h-[70px] border-[5px] rounded-full  border-blue-400  border-t-blue-700 animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <table className="w-full text-center border border-gray-400">
          <thead>
            <tr className="bg-sky-200">
              <th className="border border-gray-400">S.No</th>
              <th className="border border-gray-400">Name</th>
              <th className="border border-gray-400">Email</th>
              <th className="border border-gray-400">Phone</th>
              <th className="border border-gray-400">Role</th>
              <th className="border border-gray-400">Blocked</th>
              <th className="border border-gray-400">Verified</th>
              <th className="border border-gray-400">Image</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              allUsers.map((user, index) => (
                <tr key={user._id} className="bg-white hover:bg-gray-100">
                  <td className="border border-gray-300">{index + 1}</td>
                  <td className="border border-gray-300">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border border-gray-300">{user.email}</td>
                  <td className="border border-gray-300">{user.phone}</td>
                  <td className="border border-gray-300">{user.role}</td>
                  <td className="border border-gray-300">
                    {user.isBlocked ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300">
                    {user.isEmailVerified ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300">
                    <img

                      src={user.image }
                      alt="User"
                      className="w-[50px] h-[50px] object-cover rounded-full mx-auto"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
