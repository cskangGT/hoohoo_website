import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../../style';
import { BlogCategory, BlogCategoryType, BlogDataType } from './BlogCategory';


const Card = styled.div`
  box-shadow: rgba(0, 0, 0, 0.08) 0px 40px 80px 0px;
  background: linear-gradient(
    253deg,
    rgba(200, 200, 200, 0.1) 10%,
    rgba(252, 230, 187, 0.3) 30%
  );
  backdrop-filter: blur(20px);
  border-radius: 15px;
  width: 350px;
  cursor: pointer;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 1100px) {
    padding: 10px 12px 14px;
    width: auto;
  }
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
const Title = styled.h3`
  margin-top: 10px;
  font-size: 22px;
  color: ${theme.darkGray};
  margin-bottom: 5px;
`;
const Content = styled.h3`
  margin-top: 0px;
  color: ${theme.darkGray};
  font-size: 12px;
  font-weight: 500;
`;
const ContainerCD = styled.div`
  justify-content: center;
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
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.7;
  border-radius: 20px;
  margin-right: 0.5rem;
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.color};

`;
const DateBox = styled.div`
  letter-spacing: 0.3px;
  font-size: 0.725rem;
  line-height: 1.7;
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
  const colors: Record<BlogCategoryType, string> = {
    ALL: '#D9EDF8',
    EARTHMERA_CATEGORY: '#FFADAD',
    GLOBAL_WARMING: '#FFD6A5',
    AIR_POLLUTION: '#aae0d4',
    DESERTIFICATION: '#FDFFB6',
    ECOSYSTEM_DESTRUCTION: '#f3ffc0',
    SEA_LEVEL_RISE: '#FFCCFF',
    OCEAN_TRASH: '#ffd085',
  };

  const color = colors[props.category] || '#D9EDF8'; // 기본 색상 처리
  return (
    <CategoryBox color={color} style={props.style}>
      {props.category ? BlogCategory[props.category]?.text : ''}
    </CategoryBox>
  );
}
function BlogCard(props: Props) {
  const navigate = useNavigate();
  if (!props.data || !props.data.blogImage) {
    return null;
  }
  const {blogId, blogCategory, blogImage} = props.data;
  const handleBlog = ()=> {
    props.handleOpen();
    props.setSelectedBlog(props.data);
  }
  return (
    <Card
      onClick={handleBlog}>
      <Image src={blogImage.low} />
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
