import i18next from 'i18next';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../../../style';
import {
  PressCoverPostType,
  PressCoverPostTypeList,
  PressCoverType,
} from './PressCoverType';

const CardContainer = styled.a`
  display: flex;
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  margin-bottom: 16px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 500px) {
    flex-direction: row;
  }
`;

const ThumbnailContainer = styled.div<{$hasImage: boolean; $imageUrl?: string}>`
  width: 40%;
  min-width: 400px;
  height: 300px;
  background-image: ${props =>
    props.$hasImage && props.$imageUrl
      ? `url(${props.$imageUrl})`
      : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
  @media (max-width: 1200px) {
    min-width: 380px;
  }
  @media (max-width: 1000px) {
    min-width: 340px;
  }
  @media (max-width: 768px) {
    min-width: 300px;
  }

  @media (max-width: 600px) {
    min-width: auto;
  }
  @media (max-width: 500px) {
    min-width: auto;
    width: 30%;

    height: 200px;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 500px) {
    padding: 16px;
  }
`;

const TopSection = styled.div``;

const TypeTag = styled.div<{$type: PressCoverPostType}>`
  display: inline-block;
  padding: 4px 12px;
  background-color: ${props =>
    props.$type === PressCoverPostType.NEWS ? '#e3f2fd' : '#f3e5f5'};
  color: ${props =>
    props.$type === PressCoverPostType.NEWS ? '#1976d2' : '#7b1fa2'};
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin-bottom: 12px;

  @media (max-width: 500px) {
    font-size: ${theme.fontSize.rg};
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 16px;
  justify-content: flex-start;
  margin-top: auto;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const DateText = styled.span`
  color: #666;
  font-size: 14px;
`;

const LinkedInButton = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: transparent;
  text-decoration: none;
  color: #0077b5;
  border: 1px solid #0077b5;
  border-radius: 20px;
  font-size: ${theme.fontSize.rg};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0077b5;
    color: white;
  }
  @media (max-width: 500px) {
    padding: 4px 8px;
    font-size: ${theme.fontSize.xs};
  }
`;

const LinkedInIcon = styled.svg`
  width: 14px;
  height: 14px;
  fill: #0077b5;
  transition: fill 0.2s ease;

  ${LinkedInButton}:hover & {
    fill: white;
  }
`;

function PressCoverCardItem({item}: {item: PressCoverType}) {
  const localizedTexts: any = i18next.t('PressCoverCardItem', {
    returnObjects: true,
  });
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (item.url) {
      if (item.idx === 10) {
        navigate(`/${i18next.language}/cover_detail/${item.idx}`);
      } else {
        window.open(item.url, '_blank');
      }
    }
  };

  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.linkedInUrl) {
      window.open(item.linkedInUrl, '_blank');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '.')
      .replace(/ /g, '');
  };

  return (
    <CardContainer
      onClick={handleCardClick}
      href={item.idx === 10 ? undefined : item.url}
      target="_blank">
      {/* 썸네일 이미지 */}
      <ThumbnailContainer
        $hasImage={!!item.thumbnailImage}
        $imageUrl={item.thumbnailImage || undefined}>
        {!item.thumbnailImage && 'No Image'}
      </ThumbnailContainer>

      {/* 콘텐츠 영역 */}
      <ContentContainer>
        {/* 상단: 태그와 제목 */}
        <TopSection>
          <TypeTag $type={item.type}>
            {
              PressCoverPostTypeList[item.type].text[
                i18next.language as 'ko' | 'en'
              ]
            }
          </TypeTag>

          <Title>{item.title}</Title>
        </TopSection>

        {/* 하단: 날짜와 LinkedIn 버튼 */}
        <BottomSection>
          {item.linkedInUrl && (
            <LinkedInButton
              onClick={handleLinkedInClick}
              href={item.linkedInUrl}
              target="_blank">
              <LinkedInIcon viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </LinkedInIcon>
              {localizedTexts.linkedIn}
            </LinkedInButton>
          )}
          <DateText>{formatDate(item.uploadAt)}</DateText>
        </BottomSection>
      </ContentContainer>
    </CardContainer>
  );
}

export default PressCoverCardItem;
