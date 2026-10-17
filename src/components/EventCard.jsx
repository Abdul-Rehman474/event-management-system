import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../utils/format';

function EventCard({ event }) {
    return (
        <Link
            to={`/events/${event.id}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
            {event.image && (
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-44 object-cover"
                />
            )}

            <div className="p-4 flex flex-col gap-2 flex-1">
                <span className="self-start text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {event.category}
                </span>
                <h2 className="font-semibold text-lg line-clamp-2">{event.name}</h2>
                <p className="text-sm text-gray-600">
                    📅 {formatDate(event.date)} {event.time && `· ${formatTime(event.time)}`}
                </p>
                <p className="text-sm text-gray-600">
                    📍 {event.venue}{event.city && `, ${event.city}`}
                </p>
            </div>
        </Link>
    );
}

export default EventCard;