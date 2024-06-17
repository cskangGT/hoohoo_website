import axios from "axios";
export const APIAddress = "https://app.earthmera.com";

export const countVisitor = async () => {
    const response = await axios.post(`${APIAddress}/webAccess/visitTracker/`);

    return { data: response.data, status: response.status };
};
export const getVisitor = async () => {
    const response = await axios.get(`${APIAddress}/webAccess/visitTracker/`);

    return { data: response.data, status: response.status };
};
