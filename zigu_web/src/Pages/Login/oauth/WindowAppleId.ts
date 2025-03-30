interface ClientConfig {
    clientId: string;
    redirectURI: string;
    scope?: string;
    state?: string;
    nonce?: string;
    usePopup?: boolean;
}

interface Authorization {
    code: string;
    id_token: string;
    state?: string;
}

interface User {
    email: string;
    name: string;
}

interface SigninResponse {
    authorization: Authorization;
    user?: User;
}

interface SigninError {
    error: string;
}
export { }; // 모듈로 인식되도록 export 문 추가

// script 추가 시 window 객체에 AppleID가 추가되므로 declare 키워드를 통해 추가해줍니다.
declare global {
    interface Window {
        AppleID: {
            auth: {
                init: (config: ClientConfig) => void;
                signIn: (config?: ClientConfig) => Promise<SigninResponse>;
            };
        };
    }
}