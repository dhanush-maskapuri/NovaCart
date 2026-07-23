import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-primary-600 mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-6">Oops! Page not found.</p>
      <Link to="/" className="text-primary-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
