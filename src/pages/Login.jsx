import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, clearError } from '../features/auth/authSlice';
import FormInput from '../components/FormInput';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, error } = useSelector((state) => state.auth);

    // clears old error msgs when the user starts typing agai
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    // if the user is already logged in, redirect to home page
    useEffect(() => {
        if (currentUser) navigate('/');
    }, [currentUser, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!email.trim() || !password) {
            setFormError('Please fill in all fields');
            return;
        }

        setFormError('');
        dispatch(login({ email: email.trim().toLowerCase(), password }));
    };

    return (
        <div className="flex justify-center px-4 py-12">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md p-8 rounded-xl shadow space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">Login</h1>

                {(formError || error) && (
                    <p className="bg-red-100 text-red-700 px-3 py-2 rounded">
                        {formError || error}
                    </p>
                )}

                <FormInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                />
                <FormInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-600">
                    No account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;