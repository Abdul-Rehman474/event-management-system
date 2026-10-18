import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../features/events/eventsSlice';
import { formatDate, formatTime } from '../utils/format';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function Detail({ label, children }) {
    return (
        <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
            <p className="text-gray-800">{children}</p>
        </div>
    );
}

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selected: event, selectedStatus, selectedError } = useSelector(
        (state) => state.events
    );

    useEffect(() => {
        dispatch(fetchEventById(id));
    }, [dispatch, id]);

    // Early returns: handle loading / error first
    if (selectedStatus === 'loading' || selectedStatus === 'idle') return <Loader />;
    if (selectedStatus === 'failed') return <ErrorMessage message={selectedError} />;
    if (!event) return null;

    const price = event.priceRange
        ? `${event.priceRange.min} – ${event.priceRange.max} ${event.priceRange.currency}`
        : 'See Ticketmaster for prices';

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline mb-4">
                ← Back
            </button>

            {event.image && (
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-64 md:h-96 object-cover rounded-xl shadow"
                />
            )}

            <div className="grid gap-6 md:grid-cols-3 mt-6">
                {/* LEFT: main info */}
                <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {event.category}
                        </span>
                        {event.genre && (
                            <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                {event.genre}
                            </span>
                        )}
                        {event.status && event.status !== 'onsale' && (
                            <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded uppercase">
                                {event.status}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl font-bold">{event.name}</h1>

                    {event.info && (
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h2 className="font-semibold mb-2">About this event</h2>
                            <p className="text-gray-700 whitespace-pre-line">{event.info}</p>
                        </div>
                    )}

                    {event.seatmap && (
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h2 className="font-semibold mb-2">Seat map</h2>
                            <img src={event.seatmap} alt="Seat map" className="w-full rounded" />
                        </div>
                    )}
                </div>

                {/* RIGHT: details */}
                <div className="bg-white p-5 rounded-xl shadow space-y-4 h-fit">
                    <Detail label="Date">{formatDate(event.date)}</Detail>
                    {event.time && <Detail label="Time">{formatTime(event.time)}</Detail>}
                    <Detail label="Venue">{event.venue}</Detail>
                    <Detail label="Location">
                        {[event.address, event.city, event.country].filter(Boolean).join(', ')}
                    </Detail>
                    <Detail label="Price">{price}</Detail>
                    {event.promoter && <Detail label="Promoter">{event.promoter}</Detail>}



                    <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
                    >
                        View on Ticketmaster ↗
                    </a>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;