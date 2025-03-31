import i18next from "i18next";
import { ProfileEMWidgetType } from "../types/WidgetItemType";

export const EMWidgetImage: Record<ProfileEMWidgetType, string> = {
    LEADERBOARD: '/Images/widget/emwidget_leaderboard.png',
    MY_ITEMS: '/Images/widget/emwidget_myitems.png',
    ACHIEVEMENT: '/Images/widget/emwidget_achievement.png',
    GROUPS: '/Images/widget/emwidget_groups.png',
    MY_STORE: '/Images/widget/emwidget_mystore.png',
    CO2_SAVED: '/Images/widget/emwidget_co2.png',
    MY_GALLERY: '/Images/widget/emwidget_gallery.png',
    TEMP: '/Images/widget/emwidget_gallery.png',
};
const deeplink = 'https://earthmera.com/redirect?link=earthmera://';

export const getEMWidgetData = (): Record<string, { title: any; image: string; link: string }> => {
    const localizedTexts: any = i18next.t('ProfileCreateWidgetPage', {
        returnObjects: true,
    });
    return {
        [ProfileEMWidgetType.Leaderboard]: {
            image: EMWidgetImage.LEADERBOARD,
            title: localizedTexts.widgetList['LEADERBOARD'],
            link: deeplink + 'userldbd',
        },
        [ProfileEMWidgetType.MyItems]: {
            image: EMWidgetImage.MY_ITEMS,
            title: localizedTexts.widgetList['MY_ITEMS'],
            link: deeplink + 'useritems',
        },// 준비중
        [ProfileEMWidgetType.Achievement]: {
            image: EMWidgetImage.ACHIEVEMENT,
            title: localizedTexts.widgetList['ACHIEVEMENT'],
            link: deeplink + 'achievement',
        },
        [ProfileEMWidgetType.Groups]: {
            image: EMWidgetImage.GROUPS,
            title: localizedTexts.widgetList['GROUPS'],
            link: deeplink + 'usergrps',
        },// 그룹페이지 만들어서 보여주기
        [ProfileEMWidgetType.MyStore]: {
            image: EMWidgetImage.MY_STORE,
            title: localizedTexts.widgetList['MY_STORE'],
            link: deeplink + 'userstores',
        }, // 준비중
        [ProfileEMWidgetType.CO2Saved]: {
            image: EMWidgetImage.CO2_SAVED,
            title: localizedTexts.widgetList['CO2_SAVED'],
            link: deeplink + 'userdashboard',
        },
        [ProfileEMWidgetType.MyGallery]: {
            image: EMWidgetImage.MY_GALLERY,
            title: localizedTexts.widgetList['MY_GALLERY'],
            link: deeplink + 'profile?initTab=2',
        },

    }
};
export const getBadgeList = (): Record<string, { title: any; image: any }> => {
    const utillocalizedTexts: any = i18next.t('Util', {
        returnObjects: true,
    });
    return {
        EARLY_HERO: {
            title: utillocalizedTexts.UserBadgeType.EARLY_HERO,
            image: '/Images/badges/EarlyHeroBadge.png',
        },
        STUDENT_CLIMATE_ACTION: {
            title: utillocalizedTexts.UserBadgeType.STUDENT_CLIMATE_ACTION,
            image: '/Images/badges/StudentClimateAction.png',
        },
        PEOPLE_CARE_ENV: {
            title: utillocalizedTexts.UserBadgeType.PEOPLE_CARE_ENV,
            image: '/Images/badges/PeopleCareEnv.png',
        },
        LITTLE_BY_LITTLE: {
            title: utillocalizedTexts.UserBadgeType.LITTLE_BY_LITTLE,
            image: '/Images/badges/lv_1.png',
        },
        FIRST_GREEN_LEAVES: {
            title: utillocalizedTexts.UserBadgeType.FIRST_GREEN_LEAVES,
            image: '/Images/badges/lv_10.png',
        },
        GREEN_SPARKS_FLY: {
            title: utillocalizedTexts.UserBadgeType.GREEN_SPARKS_FLY,
            image: '/Images/badges/lv_20.png',
        },
        ANYWHERE_GREEN: {
            title: utillocalizedTexts.UserBadgeType.ANYWHERE_GREEN,
            image: '/Images/badges/lv_30.png',
        },
        LINK_BETWEEN_US: {
            title: utillocalizedTexts.UserBadgeType.LINK_BETWEEN_US,
            image: '/Images/badges/lv_40.png',
        },
        LOCAL_ECO_ADVOCATE: {
            title: utillocalizedTexts.UserBadgeType.LOCAL_ECO_ADVOCATE,
            image: '/Images/badges/lv_50.png',
        },
        PURSUING_GREENER_TOMORROW: {
            title: utillocalizedTexts.UserBadgeType.PURSUING_GREENER_TOMORROW,
            image: '/Images/badges/lv_60.png',
        },
        WALKING_ON_EGGSHELLS: {
            title: utillocalizedTexts.UserBadgeType.WALKING_ON_EGGSHELLS,
            image: '/Images/badges/lv_70.png',
        },
        MAY_EARTHMERA_BE_WITH_YOU: {
            title: utillocalizedTexts.UserBadgeType.MAY_EARTHMERA_BE_WITH_YOU,
            image: '/Images/badges/lv_80.png',
        },
        NO_PLANET_FOR_OLD_WAYS: {
            title: utillocalizedTexts.UserBadgeType.NO_PLANET_FOR_OLD_WAYS,
            image: '/Images/badges/lv_90.png',
        },
        BITE_THE_BULLET: {
            title: utillocalizedTexts.UserBadgeType.BITE_THE_BULLET,
            image: '/Images/badges/lv_100.png',
        },
        BEYOND_WORLD: {
            title: utillocalizedTexts.UserBadgeType.BEYOND_WORLD,
            image: '/Images/badges/lv_110.png',
        },
        FEEL_THE_TAILWIND: {
            title: utillocalizedTexts.UserBadgeType.FEEL_THE_TAILWIND,
            image: '/Images/badges/lv_120.png',
        },
        I_LOVE_EM: {
            title: utillocalizedTexts.UserBadgeType.I_LOVE_EM,
            image: '/Images/badges/lv_130.png',
        },
        IN_HARMONY_WITH_NATURE: {
            title: utillocalizedTexts.UserBadgeType.IN_HARMONY_WITH_NATURE,
            image: '/Images/badges/lv_140.png',
        },
        EARTH_HERO: {
            title: utillocalizedTexts.UserBadgeType.EARTH_HERO,
            image: '/Images/badges/lv_150.png',
        },
    };
}
export const getMedalList = (): Record<string, { title: any; image: string[] }> => {
    const utilLocalizedTexts: any = i18next.t('Util', {
        returnObjects: true,
    });
    return {
        ECO_ACTION_TUMBLER: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_TUMBLER,
            image: [
                '',
                '/Images/medals/ECO_ACTION_TUMBLER_1_L.png',
                '/Images/medals/ECO_ACTION_TUMBLER_2_L.png',
                '/Images/medals/ECO_ACTION_TUMBLER_3_L.png',
                '/Images/medals/ECO_ACTION_TUMBLER_4_L.png',
                '/Images/medals/ECO_ACTION_TUMBLER_5_L.png',
            ],
        },
        ECO_ACTION_NO_LEFTOVERS: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_NO_LEFTOVERS,
            image: [
                '',
                '/Images/medals/ECO_ACTION_NO_LEFTOVERS_1_L.png',
                '/Images/medals/ECO_ACTION_NO_LEFTOVERS_2_L.png',
                '/Images/medals/ECO_ACTION_NO_LEFTOVERS_3_L.png',
                '/Images/medals/ECO_ACTION_NO_LEFTOVERS_4_L.png',
                '/Images/medals/ECO_ACTION_NO_LEFTOVERS_5_L.png',
            ],
        },
        ECO_ACTION_CAFE_REUSABLE_CUP: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_CAFE_REUSABLE_CUP,
            image: [
                '',
                '/Images/medals/ECO_ACTION_CAFE_REUSABLE_CUP_1_L.png',
                '/Images/medals/ECO_ACTION_CAFE_REUSABLE_CUP_2_L.png',
                '/Images/medals/ECO_ACTION_CAFE_REUSABLE_CUP_3_L.png',
                '/Images/medals/ECO_ACTION_CAFE_REUSABLE_CUP_4_L.png',
                '/Images/medals/ECO_ACTION_CAFE_REUSABLE_CUP_5_L.png',
            ],
        },
        ECO_ACTION_ECO_FRIENDLY_PRODUCTS: {
            title:
                utilLocalizedTexts.AchievementType.ECO_ACTION_ECO_FRIENDLY_PRODUCTS,
            image: [
                '',
                '/Images/medals/ECO_ACTION_ECO_FRIENDLY_PRODUCTS_1_L.png',
                '/Images/medals/ECO_ACTION_ECO_FRIENDLY_PRODUCTS_2_L.png',
                '/Images/medals/ECO_ACTION_ECO_FRIENDLY_PRODUCTS_3_L.png',
                '/Images/medals/ECO_ACTION_ECO_FRIENDLY_PRODUCTS_4_L.png',
                '/Images/medals/ECO_ACTION_ECO_FRIENDLY_PRODUCTS_5_L.png',
            ],
        },
        ECO_ACTION_DISPOSING_TRASH: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_DISPOSING_TRASH,
            image: [
                '',
                '/Images/medals/ECO_ACTION_DISPOSING_TRASH_1_L.png',
                '/Images/medals/ECO_ACTION_DISPOSING_TRASH_2_L.png',
                '/Images/medals/ECO_ACTION_DISPOSING_TRASH_3_L.png',
                '/Images/medals/ECO_ACTION_DISPOSING_TRASH_4_L.png',
                '/Images/medals/ECO_ACTION_DISPOSING_TRASH_5_L.png',
            ],
        },
        ECO_ACTION_RECYCLING: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_RECYCLING,

            image: [
                '',
                '/Images/medals/ECO_ACTION_RECYCLING_1_L.png',
                '/Images/medals/ECO_ACTION_RECYCLING_2_L.png',
                '/Images/medals/ECO_ACTION_RECYCLING_3_L.png',
                '/Images/medals/ECO_ACTION_RECYCLING_4_L.png',
                '/Images/medals/ECO_ACTION_RECYCLING_5_L.png',
            ],
        },
        ECO_ACTION_TRANSPORTATION: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_TRANSPORTATION,
            image: [
                '',
                '/Images/medals/ECO_ACTION_TRANSPORTATION_1_L.png',
                '/Images/medals/ECO_ACTION_TRANSPORTATION_2_L.png',
                '/Images/medals/ECO_ACTION_TRANSPORTATION_3_L.png',
                '/Images/medals/ECO_ACTION_TRANSPORTATION_4_L.png',
                '/Images/medals/ECO_ACTION_TRANSPORTATION_5_L.png',
            ],
        },
        ECO_ACTION_EM_BAG: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_EM_BAG,
            image: [
                '',
                '/Images/medals/ECO_ACTION_EM_BAG_1_L.png',
                '/Images/medals/ECO_ACTION_EM_BAG_2_L.png',
                '/Images/medals/ECO_ACTION_EM_BAG_3_L.png',
                '/Images/medals/ECO_ACTION_EM_BAG_4_L.png',
                '/Images/medals/ECO_ACTION_EM_BAG_5_L.png',
            ],
        },
        ECO_ACTION_SUSTAINABLE_STRAW: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_SUSTAINABLE_STRAW,
            image: [
                '',
                '/Images/medals/ECO_ACTION_SUSTAINABLE_STRAW_1_L.png',
                '/Images/medals/ECO_ACTION_SUSTAINABLE_STRAW_2_L.png',
                '/Images/medals/ECO_ACTION_SUSTAINABLE_STRAW_3_L.png',
                '/Images/medals/ECO_ACTION_SUSTAINABLE_STRAW_4_L.png',
                '/Images/medals/ECO_ACTION_SUSTAINABLE_STRAW_5_L.png',
            ],
        },
        ECO_ACTION_LABEL_OFF: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_LABEL_OFF,
            image: [
                '',
                '/Images/medals/ECO_ACTION_LABEL_OFF_1_L.png',
                '/Images/medals/ECO_ACTION_LABEL_OFF_2_L.png',
                '/Images/medals/ECO_ACTION_LABEL_OFF_3_L.png',
                '/Images/medals/ECO_ACTION_LABEL_OFF_4_L.png',
                '/Images/medals/ECO_ACTION_LABEL_OFF_5_L.png',
            ],
        },
        ECO_ACTION_REUSABLE_CONTAINER: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_REUSABLE_CONTAINER,
            image: [
                '',
                '/Images/medals/ECO_ACTION_REUSABLE_CONTAINER_1_L.png',
                '/Images/medals/ECO_ACTION_REUSABLE_CONTAINER_2_L.png',
                '/Images/medals/ECO_ACTION_REUSABLE_CONTAINER_3_L.png',
                '/Images/medals/ECO_ACTION_REUSABLE_CONTAINER_4_L.png',
                '/Images/medals/ECO_ACTION_REUSABLE_CONTAINER_5_L.png',
            ],
        },
        ECO_ACTION_ECO_BAG: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_ECO_BAG,
            image: [
                '',
                '/Images/medals/ECO_ACTION_ECO_BAG_1_L.png',
                '/Images/medals/ECO_ACTION_ECO_BAG_2_L.png',
                '/Images/medals/ECO_ACTION_ECO_BAG_3_L.png',
                '/Images/medals/ECO_ACTION_ECO_BAG_4_L.png',
                '/Images/medals/ECO_ACTION_ECO_BAG_5_L.png',
            ],
        },
        ECO_ACTION_REUSE: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_REUSE,
            image: [
                '',
                '/Images/medals/ECO_ACTION_REUSE_1_L.png',
                '/Images/medals/ECO_ACTION_REUSE_2_L.png',
                '/Images/medals/ECO_ACTION_REUSE_3_L.png',
                '/Images/medals/ECO_ACTION_REUSE_4_L.png',
                '/Images/medals/ECO_ACTION_REUSE_5_L.png',
            ],
        },
        GROUP_CHALLENGE_REWARD_MEDAL: {
            title: utilLocalizedTexts.AchievementType.GROUP_CHALLENGE_REWARD_MEDAL,
            image: [
                '',
                '/Images/medals/GROUP_CHALLENGE_REWARD_MEDAL_1_L.png',
                '/Images/medals/GROUP_CHALLENGE_REWARD_MEDAL_2_L.png',
                '/Images/medals/GROUP_CHALLENGE_REWARD_MEDAL_3_L.png',
                '/Images/medals/GROUP_CHALLENGE_REWARD_MEDAL_4_L.png',
                '/Images/medals/GROUP_CHALLENGE_REWARD_MEDAL_5_L.png',
            ],
        },
        GROUP_EVENT_REWARD_MEDAL: {
            title: utilLocalizedTexts.AchievementType.GROUP_EVENT_REWARD_MEDAL,
            image: [
                '',
                '/Images/medals/GROUP_EVENT_REWARD_MEDAL_1_L.png',
                '/Images/medals/GROUP_EVENT_REWARD_MEDAL_2_L.png',
                '/Images/medals/GROUP_EVENT_REWARD_MEDAL_3_L.png',
                '/Images/medals/GROUP_EVENT_REWARD_MEDAL_4_L.png',
                '/Images/medals/GROUP_EVENT_REWARD_MEDAL_5_L.png',
            ],
        },
        ECO_ACTION_CARBON_REDUCTION: {
            title: utilLocalizedTexts.AchievementType.ECO_ACTION_CARBON_REDUCTION,
            image: [
                '',
                '/Images/medals/ECO_ACTION_CARBON_REDUCTION_1_L.png',
                '/Images/medals/ECO_ACTION_CARBON_REDUCTION_2_L.png',
                '/Images/medals/ECO_ACTION_CARBON_REDUCTION_3_L.png',
                '/Images/medals/ECO_ACTION_CARBON_REDUCTION_4_L.png',
                '/Images/medals/ECO_ACTION_CARBON_REDUCTION_5_L.png',
            ],
        },
        GROUP_PLOGGING_ECO_PLOGGER: {
            title: utilLocalizedTexts.AchievementType.GROUP_PLOGGING_ECO_PLOGGER,
            image: [
                '',
                '/Images/medals/GROUP_PLOGGING_ECO_PLOGGER_1_L.png',
                '/Images/medals/GROUP_PLOGGING_ECO_PLOGGER_2_L.png',
                '/Images/medals/GROUP_PLOGGING_ECO_PLOGGER_3_L.png',
                '/Images/medals/GROUP_PLOGGING_ECO_PLOGGER_4_L.png',
                '/Images/medals/GROUP_PLOGGING_ECO_PLOGGER_5_L.png',
            ],
        },
        REWARD_REDEEM_MEDAL: {
            title: utilLocalizedTexts.AchievementType.REWARD_REDEEM_MEDAL,
            image: [
                '',
                '/Images/medals/REWARD_REDEEM_MEDAL_1_L.png',
                '/Images/medals/REWARD_REDEEM_MEDAL_2_L.png',
                '/Images/medals/REWARD_REDEEM_MEDAL_3_L.png',
                '/Images/medals/REWARD_REDEEM_MEDAL_4_L.png',
                '/Images/medals/REWARD_REDEEM_MEDAL_5_L.png',
            ],
        },
        EM_POST_UPLOAD_MEDAL: {
            title: utilLocalizedTexts.AchievementType.EM_POST_UPLOAD_MEDAL,
            image: [
                '',
                '/Images/medals/EM_POST_UPLOAD_MEDAL_1_L.png',
                '/Images/medals/EM_POST_UPLOAD_MEDAL_2_L.png',
                '/Images/medals/EM_POST_UPLOAD_MEDAL_3_L.png',
                '/Images/medals/EM_POST_UPLOAD_MEDAL_4_L.png',
                '/Images/medals/EM_POST_UPLOAD_MEDAL_5_L.png',
            ],
        },
    };
};
