function ErrorMessage({ message }) {
    return (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded text-center my-6">
            {message}
        </div>
    );
}
export default ErrorMessage;