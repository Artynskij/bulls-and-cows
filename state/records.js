const STORAGE_KEY = 'bulls-and-cows:records';
const MAX_RECORDS = 10;
export const loadRecords = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    }
    catch {
        return [];
    }
};
export const saveRecord = (entry) => {
    const existing = loadRecords();
    const updated = [...existing, entry]
        .sort((a, b) => a.attempts - b.attempts || a.timeMs - b.timeMs)
        .slice(0, MAX_RECORDS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};
//# sourceMappingURL=records.js.map