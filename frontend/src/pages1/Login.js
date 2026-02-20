import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate=useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("role"));
    if (userData?.role) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/login", formData);
      console.log(res.data);
      alert(res.data.message);
      localStorage.setItem("role",JSON.stringify({role:res.data.user.role,name:res.data.user.name}));
      navigate("/dashboard")
    } 
    catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 px-4">

      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-wide">
            Welcome Back 
          </h2>
          <p className="text-sm text-gray-300 mt-2">
            Login to continue your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm mb-1 text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 placeholder-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 placeholder-gray-300"
            />
          </div>

          <div className="text-right">
            <span className="text-sm text-pink-400 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-500 shadow-lg hover:shadow-pink-500/50 transform hover:scale-105"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?
          <span className="text-pink-400 cursor-pointer hover:underline ml-1" onClick={()=>navigate("/signup")}>
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
