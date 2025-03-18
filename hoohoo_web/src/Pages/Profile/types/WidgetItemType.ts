export type ProfileWidget = Array<ProfileWidgetItemType>;
export type ProfileWidgetItemType = {
    id: number;
    sizeType: ProfileWidgetItemSize;
    type?: ProfileWidgetTypeEnum;
    bgType?: ProfileWidgetBgType;
    bgImageUrl?: string;
    bgColor?: string;
    hasBorder?: boolean;
    description?: string;
    linkUrl?: string;
    coordinate: {
        x: number;
        y: number;
    };
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