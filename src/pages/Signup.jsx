import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import background from "../assets/Background.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("username", name); // Store username in localStorage
      alert("User registered successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="max-w-md w-full space-y-8 bg-black p-8 rounded-lg shadow-lg">
        <div>
          <h2 className=" text-3xl font-bold text-white">Sign Up</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full bg-transparent px-3 py-3 border border-neutral-800 rounded-md shadow-sm focus:outline-none  sm:text-sm"
            placeholder="Username"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full bg-transparent px-3 py-3 border border-neutral-800 rounded-md shadow-sm focus:outline-none sm:text-sm mt-4"
            placeholder="Email address"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block bg-transparent w-full px-3 py-3 mt-4 border border-neutral-800  rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 py-2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <RiEyeOffFill
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              ) : (
                <RiEyeFill className="h-6 w-6 text-white" aria-hidden="true" />
              )}
            </button>
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full px-3 py-3 mt-4 border bg-transparent border-neutral-800 rounded-md shadow-sm focus:outline-none sm:text-sm"
            placeholder="Confirm Password"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-4"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
