import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../../style';
import {useLanguage} from '../hooks/LanguageContext';
import {BlogCategory, BlogCategoryType, BlogDataType} from './BlogCategory';

const Card = styled.div`
  background-color: transparent;
  backdrop-filter: blur(20px);
  border-radius: 15px;
  max-width: 350px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  @media screen and (max-width: 1100px) {
    padding: 10px 12px 14px;
    width: auto;
  }
`;
const ImageBox = styled.div`
  box-shadow: rgba(0, 0, 0, 0.08) 0px 40px 80px 0px;
  width: 100%;
  border-radius: 10px;
  &:hover {
    box-shadow:
      inset 0 -3em 3em rgba(0, 0, 0, 0.1),
      0 0 0 2px rgba(113, 247, 69, 0.7),
      0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  }
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const ContainerCD = styled.div`
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  display: flex;
  margin: 0.25rem 0px;
  margin-top: 14px;
`;
interface CategoryProps {
  color: string;
}
const CategoryBox = styled.div<CategoryProps>`
  letter-spacing: 0.3px;
  color: ${theme.white};
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.2;
  border-radius: 20px;
  margin-right: 0.5rem;
  padding: 0.25rem 1rem;
  background-color: ${props => props.color};
`;

type Props = {
  data: BlogDataType;
  setSelectedBlog: (blog: BlogDataType) => void;
  handleOpen: () => void;
};
type CateProps = {
  category: BlogCategoryType;
  style?: {};
};
export function Category(props: CateProps) {
  const {language} = useLanguage();
  const colors: Record<BlogCategoryType, string> = {
    ALL: '#D9EDF8',
    EARTHMERA_CATEGORY: '#4229fe',
    GLOBAL_WARMING: '#fd2020',
    AIR_POLLUTION: '#3CA6DE',
    DESERTIFICATION: '#E8BF29',
    ECOSYSTEM_DESTRUCTION: '#8cab00',
    SEA_LEVEL_RISE: '#ff5dff',
    OCEAN_TRASH: '#260000',
  };

  const color = colors[props.category] || '#D9EDF8'; // 기본 색상 처리
  return (
    <CategoryBox color={color} style={props.style}>
      {props.category
        ? language === 'ko'
          ? BlogCategory[props.category]?.text.ko
          : BlogCategory[props.category]?.text.en
        : ''}
    </CategoryBox>
  );
}
function BlogCard(props: Props) {
  const {language} = useLanguage();
  const navigate = useNavigate();
  if (!props.data || !props.data.blogImage) {
    return null;
  }
  const {blogId, blogCategory, blogImage} = props.data;
  const handleBlog = () => {
    props.handleOpen();
    props.setSelectedBlog(props.data);
  };
  return (
    <Card onClick={handleBlog}>
      <ImageBox>
        <Image src={blogImage.low} />
      </ImageBox>
      {/* <Title>{}</Title> */}
      <ContainerCD>
        <Category category={blogCategory} />
        {/* <DateBox>{props.data.date}</DateBox> */}
      </ContainerCD>
      {/* <Content>{props.data.desc}</Content> */}
    </Card>
  );
}
export default BlogCard;
