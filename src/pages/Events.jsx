import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../features/events/eventsSlice';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function Events() {
    const dispatch = useDispatch();
    const { list, status, error } = useSelector((state) => state.events);

    // Load events once when the page first opens
    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

            {status === 'loading' && <Loader />}

            {status === 'failed' && <ErrorMessage message={error} />}

            {status === 'succeeded' && list.length === 0 && (
                <p className="text-center text-gray-500 py-12">No events found.</p>
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