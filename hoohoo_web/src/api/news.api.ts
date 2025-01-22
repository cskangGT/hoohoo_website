import axios from "axios";

const lambdaAddress = 'https://h1n75m5fxa.execute-api.us-east-1.amazonaws.com/';
export async function getNewsList() {
    try {
        const response = await axios.get(
            lambdaAddress +
            `prod/`,

        );


        return {
            data: response.data,
        };
    } catch {
        return { data: null };
    }
}
export async function getNewsDetail(id: number) {
    try {
        const response = await axios.get(
            lambdaAddress +
            `prod/?linkId=${id}`,

        );


        console.log("result", response);
        return {
            data: response.data,
        };
    } catch {
        return { data: null };
    }
}