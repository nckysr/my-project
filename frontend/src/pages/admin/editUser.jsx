import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditUserPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract initial user data from location.state
  const [userId] = useState(location.state._id);
  const [firstName, setFirstName] = useState(location.state.firstName);
  const [lastName, setLastName] = useState(location.state.lastName);
  const [email, setEmail] = useState(location.state.email);
  const [phone, setPhone] = useState(location.state.phone || "");
  const [image, setImage] = useState(location.state.image);
  const [role, setRole] = useState(location.state.role || "user");
  const [isBlocked, setIsBlocked] = useState(location.state.isBlocked || false);
  const [isEmailVerified, setIsEmailVerified] = useState(
    location.state.isEmailVerified || false
  );
  const [loading, setLoading] = useState(false);

  async function updateUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);

      if (!firstName || !lastName || !email) {
        toast.error("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      const userData = {
        firstName,
        lastName,
        email,
        phone,
        image,
        role,
        isBlocked,
        isEmailVerified,
      };

      await axios.put(
        import.meta.env.VITE_BACKEND_URL + `/api/users/${email}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User updated successfully!");
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Update User
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            disabled
            placeholder="User ID"
            value={userId}
            className={`${inputClass} bg-gray-100 cursor-not-allowed`}
          />

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
          />

          <input
            type="email"
            disabled
            placeholder="Email"
            value={email}
            className={`${inputClass} bg-gray-100 cursor-not-allowed`}
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            disabled
            placeholder="Image URL"
            value={image}
            className={`${inputClass} bg-gray-100 cursor-not-allowed`}
          />

          {image && (
            <div className="flex justify-center">
              <img
                src={image}
                alt="User Profile"
                className="w-24 h-24 rounded-full object-cover mt-2 shadow-md"
              />
            </div>
          )}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputClass}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              id="blocked"
              type="checkbox"
              checked={isBlocked}
              onChange={(e) => setIsBlocked(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="blocked" className="text-gray-700">
              Is Blocked
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="emailVerified"
              type="checkbox"
              checked={isEmailVerified}
              onChange={(e) => setIsEmailVerified(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="emailVerified" className="text-gray-700">
              Is Email Verified
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Link
            to="/admin/users"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Cancel
          </Link>
          <button
            onClick={updateUser}
            disabled={loading}
            className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Editing..." : "Edit User"}
          </button>
        </div>
      </div>
    </div>
  );
}
