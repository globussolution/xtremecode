import loginLogo from "../assets/images/loginLogo.png"

function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="lg:w-[400px] w-[320px] px-10 py-10 border border-gray-300 bg-white rounded-lg shadow-xl">
      {/* Logo/Image section */}
      <div className="flex justify-center mb-10 px-3">
        <img
          src={loginLogo}
          alt="Flussonic Admin UI Logo"
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>

      {/* Login Form */}
      <form>
        {/* Login Input Field */}
        <div className="mb-5">
          <label
            htmlFor="login"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Login
          </label>
          <input
            type="text"
            id="login"
            name="login"
            placeholder="Login"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800 placeholder-gray-400"
            aria-label="Login username"
          />
        </div>

        {/* Password Input Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800 placeholder-gray-400"
            aria-label="Login password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out shadow-md hover:shadow-lg"
        >
          Sign In
        </button>
      </form>
    </div>
    </div>
  );
}

export default Login;
