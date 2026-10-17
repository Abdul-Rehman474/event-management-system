import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function Navbar() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const linkClass = ({ isActive }) =>
        isActive
            ? 'text-blue-600 font-semibold'
            : 'text-gray-600 hover:text-blue-600';

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
                EventHub
            </Link>

            <div className="flex items-center gap-6">
                <NavLink to="/" end className={linkClass}>Events</NavLink>

                {currentUser ? (
                    <>
                        <NavLink to="/my-events" className={linkClass}>My Events</NavLink>
                        <span className="text-gray-700">Hi, {currentUser.name}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className={linkClass}>Login</NavLink>
                        <NavLink to="/register" className={linkClass}>Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;