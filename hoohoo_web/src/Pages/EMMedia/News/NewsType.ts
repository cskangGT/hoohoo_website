export type NewsDataType = {
    id: number;
    url: string;
    title: string;
    createdAt: string;
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
            en: "환생사(People who think about the environment)"
        },
        value: "HWANSAENGSA"
    }
}