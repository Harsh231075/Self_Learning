import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser'

function SignupLogin() {
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { fetchUserDetails } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
  });
  console.log("login", import.meta.env.VITE_API_URL)
  // Check for referral code and switch to register mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setReferralCode(ref);
      setIsLogin(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      photo: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!isLogin && !formData.name) {
      toast.error("Name is required for registration!");
      return;
    }

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required!");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);

      if (!isLogin) {
        formDataToSend.append("name", formData.name);
        formDataToSend.append("photo", formData.photo);
        if (referralCode) {
          formDataToSend.append("referralCode", referralCode);
          console.log('Using referral code:', referralCode);
        }
      }
      const response = await fetch(

        isLogin ? `${import.meta.env.VITE_API_URL}/user/login` : `${import.meta.env.VITE_API_URL}/user/register`,
        {
          method: "POST",
          body: formDataToSend,
          mode: "cors",
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("token", result.token);
          await fetchUserDetails();
          window.dispatchEvent(new Event("tokenUpdated"));
          toast.success("Login Successful!");
          navigate("/my-dashbaord");
        } else {
          toast.success("Registration Successful! Please login to continue.");
          resetForm();
          setIsLogin(true);
        }
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Network Error! Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        {/* Referral Banner */}
        {!isLogin && referralCode && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-purple-700 text-sm">
              Signing up with referral code: <span className="font-semibold">{referralCode}</span>
            </p>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex justify-center gap-6 mb-6">
          <button
            className={`w-1/2 py-2 text-lg font-semibold rounded-lg transition-all ${isLogin ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-lg font-semibold rounded-lg transition-all ${!isLogin ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
              value={formData.name}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
            value={formData.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
                onChange={handleChange}
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupLogin;