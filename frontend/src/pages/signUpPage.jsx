import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../utils/mediaUploadPage";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    console.log("Submitting:", {
      firstName,
      lastName,
      email,
      password,
      phone,
      image,
    });

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!image) {
      toast.error("Please select profile image");
      return;
    }

    setLoading(true);
    try {
      // Upload image first
      const imageUrl = await mediaUpload(image);
      console.log("Image uploaded successfully:", imageUrl);

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/",
        {
          firstName,
          lastName,
          email,
          password,
          phone,
          image: imageUrl,
        }
      );

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(
        error?.response?.data?.message || "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] backdrop-blur bg-cover bg-center flex items-center justify-center">
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="p-8 rounded-lg shadow-md w-full max-w-sm backdrop-blur bg-white/30">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="bg-white mb-3 w-full px-3 py-2 border rounded"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="bg-white mb-3 w-full px-3 py-2 border rounded"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-white mb-3 w-full px-3 py-2 border rounded"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mb-3 w-full bg-white px-3 py-2 border rounded"
              required
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="bg-white mb-4 w-full px-3 py-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="bg-white mb-4 w-full px-3 py-2 border rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
