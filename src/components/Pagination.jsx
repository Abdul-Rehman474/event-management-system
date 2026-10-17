function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const btn =
        'px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed';

    return (
        <div className="flex justify-center items-center gap-4 mt-10">
            <button
                className={btn}
                onClick={() => onPageChange(page - 1)}
                disabled={page === 0}
            >
                ← Previous
            </button>
            <span className="text-gray-700">
                Page {page + 1} of {totalPages}
            </span>
            <button
                className={btn}
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages - 1}
            >
                Next →
            </button>
        </div>
    );
}

export default Pagination;