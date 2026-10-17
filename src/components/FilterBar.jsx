import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../features/events/eventsSlice';

const inputClass =
    'border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';

function FilterBar() {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.events.filters);

    // Local state ,starts from redux so values survive navigation
    const [keyword, setKeyword] = useState(filters.keyword);
    const [city, setCity] = useState(filters.city);
    const [startDate, setStartDate] = useState(filters.startDate);

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            setFilters({
                keyword: keyword.trim(),
                city: city.trim(),
                startDate,
            })
        );
    };

    const handleReset = () => {
        setKeyword('');
        setCity('');
        setStartDate('');
        dispatch(resetFilters());
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-3"
        >
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search events, artists, teams..."
                className={`${inputClass} flex-1`}
            />
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (e.g. London)"
                className={`${inputClass} md:w-44`}
            />
            <input
                type="date"
                value={startDate}
                min={today}
                onChange={(e) => setStartDate(e.target.value)}
                className={`${inputClass} md:w-44`}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
                Search
            </button>
            <button
                type="button"
                onClick={handleReset}
                className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50"
            >
                Reset
            </button>
        </form>
    );
}

export default FilterBar;