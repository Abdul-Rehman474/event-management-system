import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    // A small helper function that decides the style of each link.
    // NavLink calls it and passes { isActive: true/false }.
    const linkClass = ({ isActive }) =>
        isActive
            ? 'text-blue-600 font-semibold'
            : 'text-gray-600 hover:text-blue-600';

    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
            {/* LEFT: logo / app name — clicking it goes to the home page */}
            <Link to="/" className="text-xl font-bold text-blue-600">
                EventHub
            </Link>

            {/* RIGHT: navigation links */}
            <div className="flex gap-6">
                <NavLink to="/" end className={linkClass}>
                    Events
                </NavLink>
                <NavLink to="/my-events" className={linkClass}>
                    My Events
                </NavLink>
                <NavLink to="/login" className={linkClass}>
                    Login
                </NavLink>
                <NavLink to="/register" className={linkClass}>
                    Register
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;