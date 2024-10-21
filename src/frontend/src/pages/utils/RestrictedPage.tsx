import { Link } from 'react-router-dom';

const RestrictedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
        Go to Home
      </Link>
    </div>
  );
};

export default RestrictedPage;