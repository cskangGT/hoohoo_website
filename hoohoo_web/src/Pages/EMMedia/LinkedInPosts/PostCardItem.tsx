import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useLanguage} from '../../../components/hooks/LanguageContext';
import {theme} from '../../../style';
import {LinkedInPostDataType} from './PostType';

const Card = styled.a`
  box-shadow: rgba(0, 0, 0, 0.117) 0px 5px 5px 0px;
  background: linear-gradient(
    253deg,
    rgba(228, 228, 228, 1) 10%,
    rgba(228, 228, 228, 1) 30%
  );
  backdrop-filter: blur(20px);

  width: 275px;
  cursor: pointer;

  display: flex;
  text-decoration: none;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1rem;
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
const ImageBox = styled.div`
  width: 100%;
  height: 150px;
  object-fit: cover;
  background-color: #fff;
`;
const TextBox = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;

  height: 100%;
  align-content: space-between;
  justify-content: space-between;
`;
const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Title = styled.p`
  font-size: ${theme.fontSize.md};
  font-family: 'Noto Sans';
  font-weight: 600;
  line-height: 1.2;
  word-break: keep-all;
  color: #1e1e1e;
  margin-top: 0px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Description = styled.p`
  font-size: 12px;
  font-family: 'Noto Sans';
  color: #666;
  margin-bottom: 0px;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DateText = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 0px;
`;
const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;
type Props = {
  item: LinkedInPostDataType;
};
function PostCardItem({item}: Props) {
  const navigate = useNavigate();
  const {idx, title, url, uploadAt, thumbnailImage, description} = item;
  const {language} = useLanguage();

  return (
    <Card href={url} target="_blank">
      {thumbnailImage && (
        <ImageBox>
          <Image src={thumbnailImage} />
        </ImageBox>
      )}
      <TextBox>
        <DescriptionBox>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
        </DescriptionBox>
        <DateText>{uploadAt}</DateText>
      </TextBox>
    </Card>
  );
}

export default PostCardItem;
