export type NewsDataType = {
    idx: number;
    url: string;
    title: string;
    uploadAt: string;
    category: string;
    thumbnailImage?: string | null;
    description?: string | null;
};
export const NewsCategory = {
    ALL: {
        text: {
            ko: "모두 보기",
            en: "View All"
        },
        value: "ALL"
    },
    HWANSAENGSA: {
        text: {
            ko: "환생사(환경을 생각하는 사람들)",
            en: "The Environmental People"
        },
        value: "HWANSAENGSA"
    },
}
export const HansaengsaNewsCategoryList = [
    {
        text: {
            ko: "기후 뉴스",
            en: "Climate News"
        },
        value: "climatenews"
    },
    {
        text: {
            ko: "환경 오염 뉴스",
            en: "Pollution News"
        },
        value: "pllutionnews"
    },
    {
        text: {
            ko: "사회 뉴스",
            en: "Social News"
        },
        value: "socialnews"
    },
    {
        text: {
            ko: "지속가능 기술 뉴스",
            en: "Sustainable Technology News"
        },
        value: "technicalnews"
    },

]