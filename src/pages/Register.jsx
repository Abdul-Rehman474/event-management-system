import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register, clearError } from '../features/auth/authSlice';
import FormInput from '../components/FormInput';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) navigate('/');
    }, [currentUser, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            return setFormError('Please fill in all fields');
        }
        if (name.trim().length < 2) {
            return setFormError('Name must be at least 2 characters');
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return setFormError('Please enter a valid email');
        }
        if (password.length < 6) {
            return setFormError('Password must be at least 6 characters');
        }
        if (password !== confirmPassword) {
            return setFormError('Passwords do not match');
        }

        setFormError('');
        dispatch(
            register({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password,
            })
        );
    };

    return (
        <div className="flex justify-center px-4 py-12">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md p-8 rounded-xl shadow space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">Create Account</h1>

                {(formError || error) && (
                    <p className="bg-red-100 text-red-700 px-3 py-2 rounded">
                        {formError || error}
                    </p>
                )}

                <FormInput label="Name" value={name}
                    onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                <FormInput label="Email" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                <FormInput label="Password" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
                <FormInput label="Confirm Password" type="password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" />

                <button type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Register
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;