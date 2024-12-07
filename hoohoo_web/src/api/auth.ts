import {APIAddress} from '../style';

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
        return {verified: false, blockedAccess: false, error: false};
      } else if (response.status === 429) {
        return {verified: false, blockedAccess: true, error: false};
      }
      return {verified: false, blockedAccess: false, error: true};
    } else {
      return {
        verified: true,
        blockedAccess: false,
        error: false,
      };
    }
  } catch (error) {
    console.error('Error sending validation code to server:', error);
    return {verified: false, blockedAccess: false, error: true};
  }
}
