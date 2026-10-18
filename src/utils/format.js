// Date to text like "Mon, Jan 1, 2024"
export function formatDate(date) {
    if (!date) return 'Date TBA';
    return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

//19:30:00 to 7:30 PM
export function formatTime(time) {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const d = new Date();
    d.setHours(hours, minutes);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
export const today = () => new Date().toLocaleDateString('en-CA');