import { APIAddress } from "../style";

export const getBlogList = async (page: number, category: string) => {
    let url = `${APIAddress}webAccess/blog/?page=${page}`;
    if (category) {
      url += `&blogCategory=${category}`;
    }
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseData = await response.json();
        return { data: responseData, status: response.status };
    } catch (error) {
      console.error("Error fetching blog list:",
        error);
        return { data: null, status: 400 };
      }
    
  };
  