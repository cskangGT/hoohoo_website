import axios from "axios";
import { BlogCategory } from "../constant/category";
import { APIAddress } from "./counter";
export const getBlogList = async (page: number, category?: string) => {
    let url = `${APIAddress}/webAccess/blog/?page=${page}`;
    if (category) {
      url += `&blogCategory=${category}`;
    }
    const response = await axios.get(url);
    return { data: response.data, status: response.status };
  };
  