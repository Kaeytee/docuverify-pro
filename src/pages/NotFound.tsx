import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl text-center">
        <img
          src="/404.svg"
          alt="404 illustration"
          className="w-full max-h-[60vh] object-contain mb-8"
        />
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 