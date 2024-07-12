import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import background from "../assets/Background.jpg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User signed in successfully");
      navigate("/"); // Redirect to /home upon successful sign-in using navigate
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show/hide password
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-black opacity-105 p-8 rounded-lg shadow-md w-96 ">
        <h2 className="text-2xl font-bold mb-4 text-white">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border bg-transparent border-neutral-800 rounded"
            placeholder="Email"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Conditional rendering based on showPassword state
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border bg-transparent border-neutral-800 rounded"
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
                  className="h-6 w-6 mb-3 text-white"
                  aria-hidden="true"
                />
              ) : (
                <RiEyeFill
                  className="h-6 w-6 mb-3 text-white"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-red-700 text-white font-bold py-2 px-4 rounded mb-5"
          >
            Sign In
          </button>
          <div className="text-center">
            <span>
              If you don't have an account{" "}
              <Link to="/signup">
                <button className="text-blue-700 ml-2">Sign Up</button>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;