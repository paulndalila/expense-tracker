import { useState } from "react";
import Alert from "@mui/material/Alert";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import LightRays from "../components/LightRays";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

import { Helmet } from "react-helmet";

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
  const [err, setErr] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      //Note to self:- No need for redirect here since Supabase will handle it
    } catch (err) {
      setErr(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setErr("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      await register(email, password);
      Navigate("/mail");
    } catch (error) {
      console.error("Registration error:", error.message);
      setErr(error.message);
    } finally {
      setErr(null);
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign Up | Expense Tracker</title>
        <meta
          name="description"
          content="Create your Expense Tracker account to securely manage expenses, incomes, loans, and budgets all in one place."
        />
        <link rel="canonical" href="https://et.paulndalila.top/register" />

        {/* Open Graph / Social Preview */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://et.paulndalila.top/register" />
        <meta property="og:title" content="Register | Expense Tracker" />
        <meta
          property="og:description"
          content="Sign up for Expense Tracker and take control of your finances today."
        />
        <meta
          property="og:image"
          content="https://et.paulndalila.top/banner.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Register | Expense Tracker" />
        <meta
          name="twitter:description"
          content="Sign up for Expense Tracker and take control of your finances today."
        />
        <meta
          name="twitter:image"
          content="https://et.paulndalila.top/banner.png"
        />
      </Helmet>

      {/* Background light rays */}
      <LightRays
        raysOrigin="top-right"
        raysColor="#fafafa"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />

      {/* Registration card */}
      <div className="absolute top-0 left-0 w-full h-screen flex md:flex-row flex-col md:items-center md:justify-center gap-2">
        {/* Left side image */}
        <div className="w-full md:w-2/5 h-60 md:h-full rounded-r-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1709534486708-fb8f94150d0a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Expense Tracker Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side form */}
        <div className="w-full h-full md:h-fit md:w-3/5 flex items-center justify-center">
          <div className="w-full md:w-120 bg-white/50 backdrop-blur-lg rounded-2xl md:shadow-2xl p-8 border border-white/20">
            <div className="h-10 w-full flex items-center justify-center overflow-hidden gap-2 mb-4">
              <img
                src="./logo.png"
                alt="Expense Tracker Logo"
                className="h-full object-contain"
              />
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Expense Tracker
              </h2>
            </div>
            <p className="text-gray-700 text-center mb-6">Registration Form</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {err && (
                <Alert
                  severity="error"
                  onClose={() => {
                    setErr(null);
                  }}
                >
                  {err}
                </Alert>
              )}

              {/* Email with icon */}
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password with icon */}
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password with icon */}
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Register button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-2 rounded-lg font-medium shadow-lg cursor-pointer"
              >
                {loading ? (
                  <CircularProgress
                    size={14}
                    thickness={8}
                    sx={{ color: "white" }}
                  />
                ) : (
                  <span>Register</span>
                )}
              </button>
              <p className="text-center text-xs text-gray-700">- OR -</p>
              {/* Google login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium shadow-lg text-xs cursor-pointer"
              >
                <GoogleIcon />
                Continue with Google
              </button>
            </form>

            <p className="text-gray-500 text-sm text-center mt-6">
              Have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
