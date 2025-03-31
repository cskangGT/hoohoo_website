import axios from 'axios';
import { useUserStore } from '../../storage/userStore';
import { __DEV__, APIAddress } from '../../style';
export const ServerAPIVersion = __DEV__ ? 'v1.7.2' : 'v1.7.2';
export const clientAxios = axios.create({
    baseURL: APIAddress,
    withCredentials: true,
    params: {
        version: ServerAPIVersion,
    },
});
clientAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // 401 Unauthorized 에러 발생 시 (세션 만료)
        if (error.response && error.response.status === 401) {
            // 로컬 스토리지/세션 스토리지 클리어
            const logout = useUserStore.getState().logout;
            logout();
            localStorage.clear();
            sessionStorage.clear();

            // 로그인 페이지로 리다이렉트
            window.location.href = '/login';


        }
        return Promise.reject(error);
    }
);
export const redirectUri = window.location.origin;
export const validateLogin = async (email: string, password: string) => {
    try {
        const response = await clientAxios.post(
            APIAddress + 'myProfile/web/login/',
            { email, password },
        );
        if (response.status >= 200 && response.status < 300) {
            return { data: response.data, result: true };
        }
        return { result: false, status: response.status };
    } catch (e: any) {
        return { result: false, status: e?.response?.status };
    }
};

export const sendGoogleLogin = async (code: string, nameTag?: string) => {

    try {

        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', '1441892786-rh1h7vnt7ua7tlece7jts1ca6kasi1uh.apps.googleusercontent.com');
        params.append('client_secret', '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');
        params.append('redirect_uri', 'postmessage');
        params.append('grant_type', 'authorization_code');

        const tokenResponse = await axios.post(
            'https://oauth2.googleapis.com/token',
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }
        );
        console.log("tokenResponse", tokenResponse?.data);
        const tokenData: any = {
            access: tokenResponse?.data?.access_token,
        };
        if (nameTag) {
            tokenData.nameTag = nameTag;
        }
        const response = await clientAxios.post(
            'myProfile/web/googleLogin/',
            tokenData,
        );

        return { result: true, data: response.data };
    } catch (e: any) {
        return { result: false, status: e?.response?.status };
    }
};
export const sendAppleLogin = async (code: string, idToken: string, nameTag?: string) => {

    try {
        const tokenData: any = {
            authCode: code,
            idToken: idToken,
        };
        if (nameTag) {
            tokenData.nameTag = nameTag;
        }
        const response = await clientAxios.post(
            APIAddress + 'myProfile/web/appleLogin/',
            tokenData,
        );
        console.log('response', response);
        return { result: true, data: response.data };
    } catch (e: any) {

        return { result: false, status: e?.response?.status };
    }
};

export const sendKakaoLogin = async (code: string, nameTag?: string) => {
    try {
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: '3646b1cf0a0594f198c66529c902ff1d',
            redirect_uri: redirectUri + '/oauth/kakao',
            code,
        },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            },
        );
        console.log("tokenResponse", tokenResponse?.data);

        const tokenData: any = {
            access: tokenResponse.data.access_token,
        };
        if (nameTag) {
            tokenData.nameTag = nameTag;
        }
        console.log("tokenData", tokenData);

        const response = await clientAxios.post(
            APIAddress + 'myProfile/web/kakaoLogin/',
            tokenData,
        );

        return { result: true, data: response.data };
    } catch (e: any) {

        return { result: false, status: e?.response?.status };
    }
};


export const logoutProfile = async () => {
    try {
        const response = await clientAxios.post('myProfile/web/logout/', {
            withCredentials: true,
        });
        if (response.status >= 200 && response.status < 300) {
            return { result: true };
        }
        return { result: false, status: response.status };
    } catch (e: any) {
        return { result: false, status: e?.response?.status };
    }
};
export const getAPIKey = async () => {
    try {
        const response = await clientAxios.get(APIAddress + 'myProfile/web/fetchAPIKey/', {
            withCredentials: true,
        });
        console.log("response.data", response.data);

        if (response.status >= 200 && response.status < 300) {
            if (response.data.data) {
                for (const item of response.data.data) {
                    const key = item.serviceName;
                    const value = item.APIKey;
                    sessionStorage.setItem(key, value);
                }
            }
            return { result: true, data: response.data.data };
        }
        return { result: false, status: response.status };
    } catch (e: any) {
        return { result: false, status: e?.response?.status };
    }
};