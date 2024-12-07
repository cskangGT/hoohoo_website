export const BlogCategory = {
  ALL: {
    text: "All",
    value: "ALL",
  },
  EARTHMERA_CATEGORY: {
    text: "EarthMera's Category",
    value: "EARTHMERA_CATEGORY",
  },
  GLOBAL_WARMING: {
    text: "Global warming",
    value: "GLOBAL_WARMING",
  },
  AIR_POLLUTION: {
    text: "Air pollution",
    value: "AIR_POLLUTION",
  },
  DESERTIFICATION: {
    text: "Desertification",
    value: "DESERTIFICATION",
  },
  ECOSYSTEM_DESTRUCTION: {
    text: "Ecosystem destruction",
    value: "ECOSYSTEM_DESTRUCTION",
  },
  SEA_LEVEL_RISE: {
    text: "Sea level rise",
    value: "SEA_LEVEL_RISE",
  },
  OCEAN_TRASH: {
    text: "Ocean trash",
    value: "OCEAN_TRASH",
  },
};
export type BlogCategoryType = keyof typeof BlogCategory;
export type BlogDataType = {
  blogId: number;
  blogImage: {
    high: string;
    low: string;
  };
  blogCategory: BlogCategoryType;
  
};

