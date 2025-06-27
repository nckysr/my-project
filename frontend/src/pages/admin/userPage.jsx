import { use, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdminUserPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
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
        <Loading />
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

              <th className="border border-gray-400">Actions</th>
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
              allUsers.map(
                (user, index) => (
                  console.log(user.image),
                  (
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
                          src={user.image}
                          alt="User"
                          className="w-[50px] h-[50px] object-cover rounded-full mx-auto"
                        />
                      </td>
                      <td className="border border-gray-300">
                        <div className="flex justify-center items-center w-full gap-2">
                          <FaEdit
                            onClick={() =>
                              Navigate(`/admin/edit-user/`, { state: user })
                            }
                            className="text-blue-600 text-[20px] mx-2 cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  )
                )
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
