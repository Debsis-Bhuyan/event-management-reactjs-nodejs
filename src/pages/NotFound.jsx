import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../assets/error-image.png";

const App = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <img src={errorImage} alt="Error" className="w-[40vw] h-[40vh] mb-6" />
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">
        Sorry, the page you visited does not exist.
      </p>
      <div className="mt-6">
        <Link to="/">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Back Home
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default App;
