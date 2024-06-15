import { BlogCategory } from "../constant/category";
export const getBlogList = async (category: string, page: number) => {
    //   const response = await apiClient.get(`${APIAddress}/ticketeer/web/BlogList`);
    //   https://earthmera-media-storage.s3.amazonaws.com/verification/desertification3.png
    //   https://earthmera-media-storage.s3.amazonaws.com/verification/generalCategoryContainer.png
    //   https://earthmera-media-storage.s3.amazonaws.com/verification/generalCategoryCigarButts2.png
    const response = {
      data: {
        totalPage: 1,
        blogs : [
        {
          blogId: 1,
          blogCategory: BlogCategory.DESERTIFICATION.value,
          blogImage:
            "https://earthmera-media-storage.s3.amazonaws.com/verification/desertification3.png",
        },
        {
          blogId: 2,
          blogCategory: BlogCategory.DESERTIFICATION.value,
          blogImage:
            "https://earthmera-media-storage.s3.amazonaws.com/verification/desertification1.png",
        },
        {
          blogId: 3,
          blogCategory: BlogCategory.DESERTIFICATION.value,
          blogImage:
            "https://earthmera-media-storage.s3.amazonaws.com/verification/desertification2.png",
        },
        {
          blogId: 13,
          blogCategory: BlogCategory.EARTHMERA_CATEGORY.value,
          blogImage:
            "https://earthmera-media-storage.s3.amazonaws.com/verification/generalCategoryCigarButts2.png",
        },
        {
          blogId: 22,
          blogCategory: BlogCategory.OCEAN_TRASH.value,
          blogImage:
            "https://earthmera-media-storage.s3.amazonaws.com/verification/oceanTrash1.png",
        },
        {
          blogId: 31,
          blogCategory: BlogCategory.EARTHMERA_CATEGORY.value,
          blogImage:
            "https://earthmera-media-storage.s3.amazonaws.com/verification/generalCategoryContainer.png",
        },
      ]
    },
      status: 200,
    };
    return { data: response.data, status: response.status };
  };
  