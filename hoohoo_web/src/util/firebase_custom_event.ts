import { logEvent } from "firebase/analytics";
import { analytics } from "../\bfirebase";
export const PageName = {
    home: 'home',
    vision: 'vision',
    about_team: 'about_team',
    partnership: 'partnership',
    platform: 'platform',
    ticketeer: 'ticketeer',
    corp: 'corp',
    dropb: 'dropb',
    climate_card: 'climate_card',
    admin: 'admin',
    news: 'news',
    support: 'support',
    privacy: 'privacy',
    terms_of_use: 'terms_of_use',
    redirect: 'redirect',
    climate_card_detail: 'climate_card_detail',
    news_detail: 'news_detail',
}
const logButtonEvent = (buttonName: string, page_path: string) => {
    logEvent(analytics, "custom_button_click", {
        button_name: buttonName,
        page_path: page_path,
    });
};
export { logButtonEvent };
