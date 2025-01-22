export const BlogCategory = {
  ALL: {
    text: {
      ko: '모두 보기',
      en: 'All',
    },
    value: "ALL",
  },
  EARTHMERA_CATEGORY: {
    text: {
      ko: "EarthMera의 카테고리",
      en: "EarthMera's Category",
    },
    value: "EARTHMERA_CATEGORY",
  },
  GLOBAL_WARMING: {
    text: {
      ko: "지구 온난화",
      en: "Global warming",
    },
    value: "GLOBAL_WARMING",
  },
  AIR_POLLUTION: {
    text: {
      ko: "대기 오염",
      en: "Air pollution",
    },
    value: "AIR_POLLUTION",
  },
  DESERTIFICATION: {
    text: {
      ko: "사막화",
      en: "Desertification",
    },
    value: "DESERTIFICATION",
  },
  ECOSYSTEM_DESTRUCTION: {
    text: {
      ko: "생태계 파괴",
      en: "Ecosystem destruction",
    },
    value: "ECOSYSTEM_DESTRUCTION",
  },
  SEA_LEVEL_RISE: {
    text: {
      ko: "해수면 상승",
      en: "Sea level rise",
    },
    value: "SEA_LEVEL_RISE",
  },
  OCEAN_TRASH: {
    text: {
      ko: "해양 쓰레기",
      en: "Ocean trash",
    },
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

