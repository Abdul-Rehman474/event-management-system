// read from local storage
export function loadState(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
}

// Saving value to localStorage
export function saveState(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}