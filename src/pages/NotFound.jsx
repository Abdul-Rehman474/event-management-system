import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="text-center py-20 px-4">
            <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
            <p className="text-gray-600 mb-6">Sorry, this page doesn't exist.</p>
            <Link to="/" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                Back to events
            </Link>
        </div>
    );
}

export default NotFound;