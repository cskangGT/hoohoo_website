export type PressCoverType = {
    idx: number;
    title: string;
    url: string;
    uploadAt: string;
    linkedInUrl?: string | null;
    thumbnailImage?: string | null;
    type: PressCoverPostType;
};
export enum PressCoverPostType {
    NEWS = "NEWS",
    INTERVIEW = "INTERVIEW",
}
export const PressCoverPostTypeList = {
    ["ALL"]: {
        text: {
            ko: "모두 보기",
            en: "View All",
        },
        value: "ALL",
    },
    [PressCoverPostType.NEWS]: {
        text: {
            ko: "뉴스",
            en: "News",
        },
        value: PressCoverPostType.NEWS,
    },
    [PressCoverPostType.INTERVIEW]: {
        text: {
            ko: "인터뷰",
            en: "Interviews",
        },
        value: PressCoverPostType.INTERVIEW,
    },
};