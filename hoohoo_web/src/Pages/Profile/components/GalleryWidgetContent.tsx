import React from 'react';
import styled from 'styled-components';
import {ProfileWidgetItemSize} from '../types/WidgetItemType';
type GalleryWidgetContentProps = {
  width: number;
  cellHeight: number;
  sizeType: ProfileWidgetItemSize;
  thumbnails: string[];
};
const GalleryContainer = styled.div<{
  big?: boolean;
  long?: boolean;
  small?: boolean;
}>`
  width: calc(100% - 24px);
  height: calc(100% - 24px);

  border-radius: 12px;
  padding: 12px;
  overflow: hidden;
  @media (max-width: 600px) {
    padding: 8px;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
  }
  @media (max-width: 400px) {
    padding: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    ${props =>
      props.big &&
      `
      padding: 8px;
      width: calc(100% - 16px);
      height: calc(100% - 16px);
    `}
    ${props =>
      props.long &&
      `
      padding: 4px;
      width: calc(100% - 8px);
      height: calc(100% - 8px);
    `}
    ${props =>
      props.small &&
      `
      padding: 4px;
      width: calc(100% - 8px);
      height: calc(100% - 8px);
    `}
  }
`;

const GalleryGrid = styled.div<{big?: boolean; long?: boolean}>`
  display: grid;
  width: 100%;
  height: 100%;
  gap: 8px;

  ${props =>
    props.big &&
    `
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  `}

  ${props =>
    props.long &&
    `
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    overflow-x: auto;
    gap: 8px;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  `}
`;

const GalleryScroll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;

  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const GalleryImageWrapper = styled.div<{
  small?: boolean;
  tiny?: boolean;
  width: number;
  numColumns: number;
  cellHeight: number;
}>`
  position: relative;
  overflow: hidden;

  border-radius: 30px;
  ${props =>
    props.small &&
    `
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 30px;
  `}

  ${props =>
    props.tiny &&
    `
    flex: 0 0 auto;
    border-radius: 12px;
    width: ${props.cellHeight - 24}px;
    height: ${props.cellHeight - 24}px;
  `}
  @media (max-width: 600px) {
    border-radius: 15px;
    ${props =>
      props.tiny &&
      `
    
    width: ${props.cellHeight - 16}px;
    height: ${props.cellHeight - 16}px;
  `}
  }
  @media (max-width: 400px) {
    border-radius: 12px;
    ${props =>
      props.tiny &&
      `
    
    width: ${props.cellHeight - 8}px;
    height: ${props.cellHeight - 8}px;
  `}
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

function GalleryWidgetContent({
  width,
  cellHeight,
  sizeType,
  thumbnails,
}: GalleryWidgetContentProps) {
  if (sizeType === 'BIG') {
    // 큰 사이즈 (상단 이미지) - 4개 이미지를 2x2 그리드로 표시
    return (
      <GalleryContainer big>
        <GalleryGrid big>
          {thumbnails
            .slice(0, Math.min(4, thumbnails.length))
            .map((img, index) => (
              <GalleryImageWrapper
                key={index}
                width={width}
                numColumns={2}
                cellHeight={cellHeight}>
                <GalleryImage src={img} alt={`Gallery ${index + 1}`} />
              </GalleryImageWrapper>
            ))}
        </GalleryGrid>
      </GalleryContainer>
    );
  } else if (sizeType === 'LONG') {
    // 긴 사이즈 (중간 이미지) - 4개 이미지를 가로로 배치
    return (
      <GalleryContainer long>
        <GalleryGrid long>
          {thumbnails
            .slice(0, Math.min(8, thumbnails.length))
            .map((img, index) => (
              <GalleryImageWrapper
                key={index}
                tiny
                width={width}
                numColumns={8}
                cellHeight={cellHeight}>
                <GalleryImage src={img} alt={`Gallery ${index + 1}`} />
              </GalleryImageWrapper>
            ))}
        </GalleryGrid>
      </GalleryContainer>
    );
  } else {
    // 작은 사이즈 (하단 이미지) - 갤러리 효과로 이미지 나열
    return (
      <GalleryContainer small>
        <GalleryScroll>
          {thumbnails
            .slice(0, Math.min(4, thumbnails.length))
            .map((img, index) => (
              <GalleryImageWrapper
                key={index}
                tiny
                width={width}
                numColumns={8}
                cellHeight={cellHeight}>
                <GalleryImage src={img} alt={`Gallery ${index + 1}`} />
              </GalleryImageWrapper>
            ))}
        </GalleryScroll>
      </GalleryContainer>
    );
  }
}

export default GalleryWidgetContent;
