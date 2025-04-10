export const getSessionItem = (key: string, defaultValue: any = null): any => {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error getting ${key} from sessionStorage:`, error);
        return defaultValue;
    }
};

export const setSessionItem = (key: string, value: any): void => {
    if (typeof window === 'undefined') return;
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting ${key} in sessionStorage:`, error);
    }
};
export const removeSessionItem = (key: string): void => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(key);
};
