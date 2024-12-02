import {APIAddress} from '../style';

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
    return {isRegistered: false};
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
    return {result: false};
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
    return {isRegistered: false};
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
    return {canDelete: false};
  }
}
