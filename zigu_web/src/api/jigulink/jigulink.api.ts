import axios from 'axios';
import { ProfileWidgetItemType } from '../../Pages/Profile/types/WidgetItemType';
import { APIAddress } from '../../style';
import { clientAxios } from '../login/auth';
export const getMyLinkProfile = async () => {
    try {
        const response = await clientAxios.get(`myProfile/web/profile/`, {
            withCredentials: true,
        });

        return { data: response.data, result: true };
    } catch (error: any) {
        return { result: false, status: error?.response?.status };
    }
};
export const getUserLinkProfile = async (nameTag: string) => {
    try {
        const response = await axios.get(APIAddress + `myProfile/web/profile/?nameTag=${nameTag}`,
            {
                withCredentials: true
            }
        );

        return { data: response.data, result: true };
    } catch (error: any) {
        return { result: false, status: error?.response?.status };
    }
};

export const createWidget = async (widgetData: {
    sizeType: string;
    isEmWidget: boolean;
    emWidgetType: string;
    coordinate: { x: number; y: number };
} | {
    sizeType: string;
    bgType: string;
    bgColor: string;
    bgImageUrl: string;
    linkUrl: string;
    description: string;
    coordinate: { x: number; y: number };
}) => {
    try {
        const response = await clientAxios.post(APIAddress + `myProfile/web/widget/`, widgetData, { withCredentials: true });
        console.log("response", response);

        return { result: true, data: response.data };
    } catch (error: any) {
        return { result: false, status: error?.response?.status };
    }
}
export const deleteWidget = async (widgetId: number) => {
    try {
        const response = await clientAxios.delete(APIAddress + `myProfile/web/widget/${widgetId}/`, { withCredentials: true });
        return { result: true, data: response.data };
    } catch (error: any) {
        return { result: false, status: error?.response?.status };
    }
}
export const updateWidgets = async (widgets: any[], deletedWidgetItems: ProfileWidgetItemType[]) => {
    try {
        const body = {
            widgets,
        }
        const response = await clientAxios.put(APIAddress + `myProfile/web/widget/`, body, { withCredentials: true });
        return { result: true, data: response.data };
    } catch (error: any) {
        return { result: false, status: error?.response?.status };
    }
};
export const applyTemplate = async (template: string, language: string) => {
    try {
        const response = await clientAxios.post(APIAddress + `myProfile/web/template/`, { template, clearWidgets: true, language }, { withCredentials: true });
        return { result: true, data: response.data };
    } catch (error: any) {
        return { result: false, status: error?.response?.status };
    }
}

export const applyPromoCode = async (promoCode: string) => {
    try {
        const body = {
            promoCode, planType: 'PROMOTION'
        }
        const response = await clientAxios.post(APIAddress + `myProfile/web/plan/`,
            body, { withCredentials: true });
        console.log("response", response);

        return { result: true, data: response.data };
    } catch (error: any) {
        return { result: false, status: error?.response?.status };
    }
}