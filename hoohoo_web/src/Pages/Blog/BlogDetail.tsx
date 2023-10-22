import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { theme } from '../../style';
import { Category } from '../../Component/Blog/BlogCard';
import Wrapper from '../../Component/Wrapper/Wrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0F1512;
`;
const Container = styled.div`
    width: 100% - 30px;
    max-width: 1100px;
    display: flex;
    margin: 0px auto;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    padding: 5rem 15px;
    margin-top: 70px;
`;
const ContentBox = styled.div`
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    justify-content: center;
    color: ${theme.white};
    
`;
const CategoryBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  color: #003319;
  text-align: center;
`;
type BlogData = {
  'id': number;
  'image': string;
  'category': string;
  'date': string;
  'title': string;
  'desc': string;
  'long': string;
};
const Title = styled.h1`
  text-align: center;
  font-size: 2.3rem;
  @media screen and (max-width: 700px) {
    font-size: 1.5rem;
  }
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Image = styled.img`
  object-fit: contain;
  width: 70%;
  max-width: 80%;
  max-height: 750px;
`;
const Date = styled.p`
  text-align: center;
`;
const Line = styled.p`
  margin: 1rem 0;
  letter-spacing: 0.3px;
  font-weight: 300;
`;
type ContentProps = {
  text: string
}
const ContentBlock = styled.div`
    display: flex;
    flex-direction: column;
`;
const Back = styled.a`
  position: absolute;
  left: 15px;
`;

function Content({ text }: ContentProps) {
  if (text) {
    const lines = text.split('\n').map((line, index) => (
      <Line key={index}>{line}</Line>
    ));

    return <ContentBlock>{lines}</ContentBlock>;
  } else {
    return <ContentBlock>{text}</ContentBlock>;
  }
}
function BlogDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const data: BlogData = location.state.blogData;
  return (
    <Background>
      <Wrapper>
        <Container>
          <ContentBox>
            <CategoryBox>
              <Back href='/blog'>
                <FontAwesomeIcon icon={faChevronLeft} color='white' fontSize={30} />
              </Back>
              <Category category={data.category} style={{ fontSize: 20 }}></Category>
            </CategoryBox>
            <Title>{data.title}</Title>
            <ImageBox>
              <Image src={'../' + data.image} alt="Blog Image" />
            </ImageBox>
            <Date>{data.date}</Date>
            <Content text={data.long ? data.long : data.desc}></Content>
          </ContentBox>
        </Container>
      </Wrapper>
    </Background >
  )
}
export default BlogDetail;