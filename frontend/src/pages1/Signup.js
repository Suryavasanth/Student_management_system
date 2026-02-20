import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/signup", formData);
      console.log(res.data);
      alert(res.message);
      setFormData({ name: "", email: "", password: "", role: "" });
    } catch (err) {
      console.log(err.response.data);
      alert(err.response?.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 px-4 py-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg  backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 text-white">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold tracking-wide">Create Account</h2>
          <p className="text-sm text-gray-300 mt-2">
            Join us and start your journey today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 text-sm py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 placeholder-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 text-sm py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 placeholder-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-200">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 text-sm py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 text-white"
            >
              <option value="" className="text-black">
                Select Role
              </option>
              <option value="user" className="text-black">
                user
              </option>
              <option value="admin" className="text-black">
                admin
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 text-sm py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 placeholder-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-500 shadow-lg hover:shadow-pink-500/50 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?
          <span
            className="text-pink-400 cursor-pointer hover:underline ml-1"
            onClick={() => navigate("/")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
