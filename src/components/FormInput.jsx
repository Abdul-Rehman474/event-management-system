function FormInput({ label, type = 'text', value, onChange, placeholder }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </label>
    );
}

export default FormInput;