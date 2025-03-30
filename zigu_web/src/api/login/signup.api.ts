import axios from 'axios';
import { APIAddress } from '../../style';
import { clientAxios } from './auth';

export const sendVerifyEmailCode = async (email: string, code: string) => {
    try {
        const response = await axios.post(
            APIAddress + 'myProfile/web/verifyEmail/',
            { email, code },
        );
        if (response.status >= 200 && response.status < 300) {
            return { data: response.data, result: true };
        }
        return { result: false, status: response.status };
    } catch (e: any) {
        return { result: false, status: e?.response?.status };
    }

};
export const checkNameTag = async (nameTag: string) => {
    try {

        const response = await axios.get(
            APIAddress + `myProfile/web/tag/?nameTag=${nameTag}`,
        );

        return { data: response.data, result: true, status: response.status };

    } catch (e: any) {
        return { result: false, status: e?.response?.status };
    }
}
export const checkEmail = async (email: string, toChangePassword: boolean = false) => {
    try {
        const response = await axios.post(
            APIAddress + 'myProfile/web/checkEmail/',
            { email, toChangePassword },
        );
        if (response.status >= 200 && response.status < 300) {
            return { data: response.data, result: true, status: response.status };
        }
        return { result: false, status: response.status };
    } catch (e: any) {
        return { result: false, status: e?.response?.status };
    }
}

export const signupProfile = async (
    email: string,
    password: string,
    nameTag: string,
) => {
    const data = {
        email: email,
        password: password,
        nameTag: nameTag,
        username: nameTag,
    }
    try {
        const response = await clientAxios.post(
            APIAddress + 'myProfile/web/signup/',
            data,
        );
        if (response.status >= 200 && response.status < 300) {
            return { data: response.data, result: true };
        }
        return { result: false, status: response.status };
    } catch (e: any) {
        return { result: false, status: e?.response?.status };
    }
}

export const sendQuestionnaire = async (questionnaireData: {
    questionType: string;
    questionResponse: string;
}[], template: string) => {
    try {
        const data: {
            questionnaires: {
                questionType: string;
                questionResponse: string;
            }[];
            template?: string;
        } = {
            questionnaires: questionnaireData,
        }
        if (template) {
            data.template = template;
        }
        const response = await clientAxios.post(
            APIAddress + 'myProfile/web/questionnaire/',
            data,
            { withCredentials: true }
        );

        return { data: response.data, result: true };

    } catch (e: any) {
        return { result: false, status: e?.response?.status };
    }
}