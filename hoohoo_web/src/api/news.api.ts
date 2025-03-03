import axios from "axios";

const lambdaAddress = 'https://vipd2as8d4.execute-api.us-east-1.amazonaws.com/prod';
export async function getNewsList(language: string, lastKey?: string, subCategory?: string) {
    try {
        let url = lambdaAddress + `/`;
        if (subCategory) {
            url += `?category=${subCategory}&limit=30`;
        } else {
            url += `?limit=30`;
        }
        if (language) {
            url += `&lang=${language}`;
        }
        if (lastKey) {
            url += `&lastKey=${lastKey}`;
        }

        const response = await axios.get(url);

        console.log("response.data", response.data);

        return {
            data: response.data,
        };
    } catch {
        return { data: null };
    }
}
export async function getNewsDetail(idx: number, language: string) {
    try {
        const response = await axios.get(
            lambdaAddress +
            `/?idx=${idx}&lang=${language}`,

        );


        console.log("result", response);
        return {
            data: response.data,
        };
    } catch {
        return { data: null };
    }
}