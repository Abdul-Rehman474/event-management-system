import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../features/events/eventsSlice';

// Ticketmaster categories
const CATEGORIES = ['All', 'Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'];

function CategoryFilter() {
    const dispatch = useDispatch();
    const activeCategory = useSelector((state) => state.events.filters.category);

    return (
        <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
                const value = cat === 'All' ? '' : cat;   // "All" = no category filter
                const isActive = activeCategory === value;

                return (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => dispatch(setFilters({ category: value }))}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${isActive
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50'
                            }`}
                    >
                        {cat}
                    </button>
                );
            })}
        </div>
    );
}

export default CategoryFilter;