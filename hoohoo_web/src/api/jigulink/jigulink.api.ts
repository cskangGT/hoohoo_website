import axios from 'axios';
import { APIAddress } from '../../style';
import { clientAxios } from '../login/auth';

export const getUserLinkProfile = async (nameTag: string) => {
    try {
        const response = await axios.get(APIAddress + `myProfile/web/profile/?nameTag=${nameTag}`,
            { withCredentials: true });

        return { data: response.data, result: true };
    } catch (error: any) {
        return { result: false, status: error?.response?.status };
    }
};

export const createWidget = async (widgetData: {
    sizeType: string;
    bgType: string;
    bgColor: string;
    bgImageUrl: string;
    linkUrl: string;
    description: string;
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