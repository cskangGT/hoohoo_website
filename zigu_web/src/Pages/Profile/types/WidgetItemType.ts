export type ProfileWidget = Array<ProfileWidgetItemType>;
export type ProfileWidgetItemType = {
    id: number;
    sizeType: ProfileWidgetItemSize;
    bgType?: ProfileWidgetBgType;
    bgImageUrl?: string;
    bgColor?: string;
    hasBorder?: boolean;
    description?: string;
    linkUrl?: string;
    isEmWidget?: boolean;
    emWidgetType?: ProfileEMWidgetType;
    isTemp?: boolean;
    isExchangedWidget?: boolean;
    widgetData?: EMWidgetData;
    coordinate: {
        x: number;
        y: number;
    };
};
export type EMWidgetData = {
    level?: number;
    numBadges?: number;
    numMedals?: number;
    equippedMedals?: MedalType[];
    equippedBadge?: string;
    annualEcoActionCount?: number;
    annualCarbonReduction?: number;
    treeEffect?: number;
    userRank?: number;
    lastMonthRank?: number;
    higherRankInfo?: {
        gap: number;
        ecoActionCount: number;
    };
    lowerRankInfo?: {
        gap: number;
        ecoActionCount: number;
    };
    ecoActionCount?: number;

    thumbnails?: string[];
}
export type MedalType = {
    medalTitle: string;
    medalLevel: number;
}
export enum ProfileEMWidgetType {
    Leaderboard = 'LEADERBOARD',
    MyItems = 'MY_ITEMS',
    Achievement = 'ACHIEVEMENT',
    Groups = 'GROUPS',
    MyStore = 'MY_STORE',
    CO2Saved = 'CO2_SAVED',
    MyGallery = 'MY_GALLERY',
    Temp = 'TEMP',
};
export type ProfileWidgetBgType = 'IMAGE' | 'COLOR';
export type ProfileWidgetItemSize = 'BIG' | 'SMALL' | 'LONG';
export enum ProfileWidgetTypeEnum {
    AppNav = 'AppNav',
    AppRank = 'AppRank',
    AppRecycle = 'AppRecycle',
    AppShop = 'AppShop',
    AppGroup = 'AppGroup'
}