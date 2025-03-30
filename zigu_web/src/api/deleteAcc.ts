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
export async function sendCode(email: string) {
  try {
    const response = await fetch(
      APIAddress +
      `webAccess/accountDeletion/${encodeURIComponent(email)}/sendCode`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const result = await response.json();
    return {
      isRegistered: result.isRegistered,
    };
  } catch {
    return { isRegistered: false };
  }
}

export async function deleteAccountAPI(
  email: string,
  deletionReason: string,
  description: string,
) {
  try {
    const body = {
      deletionReason,
      detail: description,
    };
    const response = await fetch(
      APIAddress +
      `webAccess/accountDeletion/${encodeURIComponent(email)}/detail/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    const result = await response.json();
    return result;
  } catch {
    return { result: false };
  }
}
export async function lookupEmail(email: string) {
  console.log('email', email);
  try {
    const response = await fetch(
      APIAddress + `webAccess/accountDeletion/emailLookUp/?email=${email}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const isRegistered = response.status >= 200 && response.status < 300;
    return {
      isRegistered: isRegistered,
    };
  } catch {
    return { isRegistered: false };
  }
}
export async function getAccStatus(email: string) {
  try {
    const response = await fetch(
      APIAddress +
      `webAccess/accountDeletion/${encodeURIComponent(email)}/status/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const result = await response.json();
    return result;
  } catch {
    return { canDelete: false };
  }
}
