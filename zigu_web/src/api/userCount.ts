import { APIAddress } from "../style";

export const getUserCount = async () => {
    let url = `${APIAddress}webAccess/countUsers/`;
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseData = await response.json();
        if (response.status >= 200 && response.status < 300) {
            return { data: responseData, result: true };
        } else {
            return { data: {userCount : 0}, result: false };
        }
    } catch (error) {
        return { data: 0, result: false };
    }
    
  };
  