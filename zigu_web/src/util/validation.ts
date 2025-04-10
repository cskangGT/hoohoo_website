export function isValidPassword(pw: string) {
    console.log('pw:', pw);

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/;

    return passwordRegex.test(pw);
}
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
export const isValidURL = (url: string): boolean => {
    if (!url) return true;

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;
        return !!hostname && hostname.includes('.') && /\.[a-z]{2,}$/i.test(hostname);
    } catch (e) {
        return false;
    }
};
