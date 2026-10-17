const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;


function pickImage(images = []) {
    const wide = images
        .filter((img) => img.ratio === '16_9')
        .sort((a, b) => b.width - a.width);
    return (wide[0] || images[0])?.url || '';
}

export function formatEvent(e) {
    const venue = e._embedded?.venues?.[0];
    const classification = e.classifications?.[0];
    const price = e.priceRanges?.[0];

    return {
        id: e.id,
        name: e.name,
        url: e.url,
        image: pickImage(e.images),
        date: e.dates?.start?.localDate || '',
        time: e.dates?.start?.localTime || '',
        status: e.dates?.status?.code || '',
        category: classification?.segment?.name || 'Other',
        genre: classification?.genre?.name || '',
        venue: venue?.name || 'Venue TBA',
        city: venue?.city?.name || '',
        country: venue?.country?.name || '',
        address: venue?.address?.line1 || '',
        priceRange: price
            ? { min: price.min, max: price.max, currency: price.currency }
            : null,
        info: e.info || e.pleaseNote || '',
    };
}

// Ticketmaster wants dates like 2026-10-17T10:00:00Z (no milliseconds)
function toApiDate(date) {
    return date.toISOString().split('.')[0] + 'Z';
}

export async function searchEvents({
    keyword = '',
    category = '',
    city = '',
    startDate = '',
    page = 0,
} = {}) {
    const params = new URLSearchParams({
        apikey: API_KEY,
        size: '20',
        page: String(page),
        sort: 'date,asc',
        // Only upcoming events
        startDateTime: startDate
            ? `${startDate}T00:00:00Z`
            : toApiDate(new Date()),
    });

    if (keyword) params.append('keyword', keyword);
    if (category) params.append('classificationName', category);
    if (city) params.append('city', city);

    const response = await fetch(`${BASE_URL}/events.json?${params}`);
    if (!response.ok) {
        throw new Error(`Could not load events (error ${response.status})`);
    }

    const data = await response.json();

    return {
        events: (data._embedded?.events || []).map(formatEvent),
        totalPages: data.page?.totalPages || 0,
        page: data.page?.number || 0,
    };
}