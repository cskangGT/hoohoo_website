import axios from 'axios';
import i18next from 'i18next';
import { APIAddress } from '../style';

export async function validateCode(code: string, email: string) {
  try {
    const response = await fetch(
      APIAddress +
      `webAccess/accountDeletion/${encodeURIComponent(email)}/checkCode/?code=${code}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const responseData = await response.json();

    if (!responseData.verified) {
      if (response.status === 401) {
        return { verified: false, blockedAccess: false, error: false };
      } else if (response.status === 429) {
        return { verified: false, blockedAccess: true, error: false };
      }
      return { verified: false, blockedAccess: false, error: true };
    } else {
      return {
        verified: true,
        blockedAccess: false,
        error: false,
      };
    }
  } catch (error) {
    console.error('Error sending validation code to server:', error);
    return { verified: false, blockedAccess: false, error: true };
  }
}
export const kakaoLogin = async (code: string) => {
  const localizedText: any = i18next.t('APIErrorCase', {
    returnObjects: true,
  });
  try {
    const tokenData = {
      access: code,
    };
    const response = await axios.post(
      APIAddress + 'common/auth/kakaoLogin/',
      tokenData,
    );

    return { result: true, data: response.data };
  } catch (e: any) {
    if (e?.response?.status === 401) {
      return { result: false, status: 401 };
    }
    if (e?.response?.status === 500) {
      alert(
        localizedText.error.GeneralErrorText,
      );
      return { result: false, status: 500 };
    }
    return { result: false };
  }
};
