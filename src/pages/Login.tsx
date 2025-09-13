import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        { email, password }
      );
      const data = response.data;
      localStorage.setItem('token', data.jwt || data.token || '');
      window.location.href = '/';
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Animated Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition duration-700 ease-out hover:scale-[1.02] animate-fade-in"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 text-red-500 bg-red-50 p-2 rounded">{error}</div>
        )}

        {/* Email */}
        <div className="mb-5 relative">
          <input
            type="email"
            id="email"
            placeholder=" "
            className="peer w-full border-b-2 border-gray-300 px-2 pt-10 pb-2 text-gray-800 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            htmlFor="email"
            className="absolute left-2  top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder=" "
            className="peer w-full border-b-2 border-gray-300 px-2  pt-10 pb-2 text-gray-800 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label
            htmlFor="password"
            className="absolute left-2 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-3 text-gray-500 hover:text-blue-500 text-sm"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* <div className="mt-4 text-center">
          <a
            href="#"
            className="text-sm text-blue-500 hover:underline transition-colors"
          >
            Forgot your password?
          </a>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
