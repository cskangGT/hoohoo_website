import { clientAxios } from "../login/auth";

export const updateUserProfile = async (data: { name?: string; profileImage?: string }) => {
    const body: any = {

    };
    if (data?.name) {
        body.name = data.name;
    }
    if (data?.profileImage) {
        body.profileImage = data.profileImage;
    }
    try {
        const response = await clientAxios.put('myProfile/web/profile/', body);
        return { result: true, data: response.data };
    } catch (error: any) {
        return { result: false, status: error?.response?.status };
    }
};
export const getSyncUserId = async () => {
    try {
        const response = await clientAxios.get('myProfile/web/userId/');
        return { result: true, data: response.data };
    } catch (error: any) {
        return { result: false, status: error?.response?.status };
    }
};

export const syncEMUser = async (userId: string) => {
    try {
        const response = await clientAxios.post('myProfile/web/sync/', {
            appUserId: userId,
        });
        return { result: true, data: response.data };
    } catch (error: any) {
        return { result: false, status: error?.response?.status };
    }
};