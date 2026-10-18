import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelRegistration } from '../features/registrations/registrationsSlice';
import EventCard from '../components/EventCard';
import { today } from '../utils/format';

function MyEvents() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const items = useSelector((state) => state.registrations.items);
    const [tab, setTab] = useState('upcoming');

    // Only this user's registrations
    const mine = items.filter((r) => r.userEmail === currentUser.email);

    const now = today();
    const upcoming = mine
        .filter((r) => !r.event.date || r.event.date >= now)
        .sort((a, b) => a.event.date.localeCompare(b.event.date)); // soonest first
    const completed = mine
        .filter((r) => r.event.date && r.event.date < now)
        .sort((a, b) => b.event.date.localeCompare(a.event.date)); // most recent first

    const shown = tab === 'upcoming' ? upcoming : completed;

    const handleCancel = (eventId) => {
        if (!window.confirm('Cancel your registration for this event?')) return;
        dispatch(cancelRegistration({ userEmail: currentUser.email, eventId }));
    };

    const tabClass = (name) =>
        `px-4 py-2 rounded-lg font-medium ${tab === name ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
        }`;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Events</h1>

            {mine.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">You haven't registered for any events yet.</p>
                    <Link to="/" className="text-blue-600 hover:underline">
                        Browse events →
                    </Link>
                </div>
            ) : (
                <>
                    <div className="flex gap-2 mb-6">
                        <button onClick={() => setTab('upcoming')} className={tabClass('upcoming')}>
                            Upcoming ({upcoming.length})
                        </button>
                        <button onClick={() => setTab('completed')} className={tabClass('completed')}>
                            Completed ({completed.length})
                        </button>
                    </div>

                    {shown.length === 0 ? (
                        <p className="text-center text-gray-500 py-12">
                            No {tab} events.
                        </p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {shown.map((r) => (
                                <div key={r.event.id} className="flex flex-col gap-2">
                                    <EventCard event={r.event} />
                                    {tab === 'upcoming' ? (
                                        <button
                                            onClick={() => handleCancel(r.event.id)}
                                            className="border border-red-500 text-red-600 py-2 rounded-lg hover:bg-red-50"
                                        >
                                            Cancel registration
                                        </button>
                                    ) : (
                                        <p className="text-center text-sm text-gray-500">✓ Attended</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default MyEvents;