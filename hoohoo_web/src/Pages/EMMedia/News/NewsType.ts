export type NewsDataType = {
    idx: number;
    url: string;
    title: string;
    uploadAt: string;
    category: string;
    thumbnailImage?: string | null;
    description?: string | null;
};
export const EMMediaContentsCategory = {
    ECO_JOURNAL: {
        text: {
            ko: "에코 저널",
            en: "Eco Journal"
        },
        value: "ECO_JOURNAL"
    },
    LINKEDIN_POSTS: {
        text: {
            ko: "게시글",
            en: "Posts"
        },
        value: "LINKEDIN_POSTS"
    },
    CLIMATE_CARD: {
        text: {
            ko: "기후 카드",
            en: "Climate Cards"
        },
        value: "CLIMATE_CARD"
    },
    ECO_ACTIONS: {
        text: {
            ko: "에코액션",
            en: "Eco-Actions"
        },
        value: "ECO_ACTIONS"
    }

}
export const HansaengsaNewsCategoryList = [
    {
        text: {
            ko: "모두 보기",
            en: "View All"
        },
        value: "ALL"
    },
    {
        text: {
            ko: "기후",
            en: "Climate"
        },
        value: "climatenews"
    },
    {
        text: {
            ko: "환경오염",
            en: "Pollution"
        },
        value: "pllutionnews"
    },
    {
        text: {
            ko: "사회",
            en: "Social"
        },
        value: "socialnews"
    },
    {
        text: {
            ko: "기술",
            en: "Technology"
        },
        value: "technicalnews"
    },

]