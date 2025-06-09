import i18next from 'i18next';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../../../style';
import {BackButton, BackButtonIcon} from './CoverDetailPage';

const Container = styled.div`
  width: 100%;
  max-width: 62.5rem;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  box-sizing: border-box;
  font-family: 'Noto Sans';
`;

const Title = styled.h1`
  font-size: ${theme.fontSize.xl};
  font-weight: 600;
  margin-bottom: 1.25rem;
  font-family: 'Noto Sans';
  @media (max-width: 768px) {
    font-size: ${theme.fontSize.lg};
    font-weight: 500;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 0.625rem;
  color: #666;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    gap: 0.3125rem;
  }
`;

const BlockContainer = styled.div`
  margin-bottom: 2.5rem;
`;
const RowEnd = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    align-items: flex-start;
    gap: 0.625rem;
    flex-direction: column;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: center;

  justify-content: flex-start;
  gap: 0.625rem;
  flex-direction: row;
`;
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const LinkButton = styled.a`
  font-size: 0.8rem;
  line-height: 1.5;
  color: #ffffff;
  background-color: #1e1e1e;
  padding: 0.4rem 0.75rem;
  border-radius: 20px;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }
`;
const LinkHighlight = styled.span`
  color: ${theme.mainNeon};
  font-weight: 600;
`;
const Author = styled.span`
  font-size: 0.875rem;
  color: #1e1e1e;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
const DateText = styled.span`
  font-size: 0.875rem;
  color: #666;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
const BlockTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.25rem;
  color: #333;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 0.625rem;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0.9375rem;
  word-break: keep-all;
  color: #444;
`;
const ListItem = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0.9375rem;
  white-space: normal;
  overflow-wrap: anywhere;
  color: #444;
`;
type Props = {
  detailData: any;
  title: string;
};
function DetailContent({detailData, title}: Props) {
  const localizedText: any = i18next.t('NewsContent', {returnObjects: true});
  const {blocks, author, uploadAt} = detailData;
  const navigate = useNavigate();

  const defaultImage =
    'https://earthmera-media-storage.s3-accelerate.amazonaws.com/profile/default/default_profile_image.jpeg';
  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <BackButtonIcon />
      </BackButton>
      <Title>{title}</Title>
      <RowEnd>
        <ProfileBox>
          <ProfileImage src={defaultImage} alt="기본 프로필 이미지" />
          <MetaInfo>
            <Author>{author}</Author>
            <DateText>
              {localizedText.date}: {uploadAt}
            </DateText>
          </MetaInfo>
        </ProfileBox>
        <LinkButton target="_blank">
          {localizedText.move}
          <LinkHighlight>{localizedText.moveHighlight}</LinkHighlight> →
        </LinkButton>
      </RowEnd>

      {blocks.map((block: any) => (
        <BlockContainer key={block.title}>
          <BlockTitle>{block.title}</BlockTitle>
          {block.content.map((content: any, index: number) => (
            <React.Fragment key={index}>
              {content.type === 'image' || content.type === 'card' ? (
                <Image src={content.value} alt="뉴스 이미지" />
              ) : content.type === 'text' ? (
                <Text>{content.value}</Text>
              ) : content.type === 'list_item' ? (
                <ListItem>{content.value}</ListItem>
              ) : null}
            </React.Fragment>
          ))}
        </BlockContainer>
      ))}
    </Container>
  );
}

export default DetailContent;
