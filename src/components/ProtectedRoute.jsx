import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const location = useLocation();

    if (!currentUser) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
}

export default ProtectedRoute;