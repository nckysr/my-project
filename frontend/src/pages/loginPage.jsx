import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        {
          email,
          password,
        }
      );
      toast.success(response.data.message || "Login successful!");
      localStorage.setItem("token", response.data.token || "");
      console.log(
        "Token stored in localStorage:",
        localStorage.getItem("token")
      );

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] backdrop-blur bg-cover bg-center flex items-center justify-center">
      <div className="w-[50%] h-full justify-center items-center"></div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-8 rounded-lg shadow-md w-full max-w-sm backdrop-blur-mx bg-white/50">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={email}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={password}
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-2 rounded transition duration-200 ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
