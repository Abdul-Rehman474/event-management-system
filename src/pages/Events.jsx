import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, resetFilters } from '../features/events/eventsSlice';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import FilterBar from '../components/FilterBar';
import CategoryFilter from '../components/CategoryFilter';

function Events() {
    const dispatch = useDispatch();
    const { list, status, error, filters } = useSelector((state) => state.events);

    // Re-fetch whenever anY filter changes
    useEffect(() => {
        dispatch(fetchEvents(filters));
    }, [dispatch, filters]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                {filters.category || 'Upcoming'} Events
            </h1>

            <div className="space-y-4 mb-8">
                <FilterBar />
                <CategoryFilter />
            </div>

            {status === 'loading' && <Loader />}

            {status === 'failed' && <ErrorMessage message={error} />}

            {status === 'succeeded' && list.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No events match your search.</p>
                    <button
                        onClick={() => dispatch(resetFilters())}
                        className="text-blue-600 hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}

            {status === 'succeeded' && list.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Events;