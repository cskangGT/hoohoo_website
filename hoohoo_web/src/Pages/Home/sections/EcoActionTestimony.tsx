import i18next from 'i18next';
import React, {useMemo, useState} from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';
import {EcoActionData} from '../../../../public/Images/EcoActionData';
import VerticalDottedLine from '../../../components/VerticalDottedLine';
import {theme} from '../../../style';
import MediaModal from './MediaModal';
const gap = 16;
const numColumns = 9;
const mobileNumColumns = 3;
const WIDTH = window.innerWidth > 1400 ? 1400 : window.innerWidth;
const Container = styled.div<{isExpanded: boolean}>`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => (props.isExpanded ? 'flex-start' : 'flex-end')};
  min-height: 100vh;

  padding-top: ${props => (props.isExpanded ? '20px' : '60px')};
  margin-bottom: 150px;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  max-width: 1500px;
`;
const TopGradientOverlay = styled.div<{isExpanded: boolean}>`
  position: absolute;
  width: 100%;
  height: 120px;
  z-index: 2;
  top: 0px;
  margin-top: ${props => (props.isExpanded ? '30px' : '0px')};
  background: linear-gradient(to bottom, white 0%, transparent 120px);
`;
const BottomGradientOverlay = styled.div`
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: 100px;

  z-index: 2;
  background: linear-gradient(to top, white 0%, transparent 100px);
`;
const MarqueeContainer = styled.div`
  height: 95%;
  width: calc((${WIDTH}px - ${gap * (numColumns + 1)}px) / ${numColumns});
  transform: rotate(90deg);
  @media screen and (max-width: 500px) {
    width: calc(
      (${WIDTH}px - ${gap * (mobileNumColumns - 1)}px) / ${mobileNumColumns}
    );
  }
`;
const TitleContainer = styled.div<{isExpanded: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;

  transition: all 0.8s ease-in-out;
  display: ${props => (props.isExpanded ? 'none' : 'flex')};
  opacity: ${props => (props.isExpanded ? 0 : 1)};
  transform: translateY(${props => (props.isExpanded ? '50px' : '0')});
  padding-bottom: 100px;
`;
const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
  @media screen and (max-width: 850px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.75rem;
    margin-bottom: 0px;
  }
`;

const Subtitle = styled.h3`
  font-size: 2.5rem;
  color: #888;
  font-weight: 600;
  margin: 0px;

  text-align: center;
  @media screen and (max-width: 850px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  text-align: center;
  margin: 3rem 10px;
  max-width: 800px;

  font-weight: 600;
  letter-spacing: 0.1em;
  @media screen and (max-width: 850px) {
    font-size: 1rem;
    letter-spacing: 0.05em;
  }
  @media screen and (max-width: 500px) {
    font-size: 1rem;
    letter-spacing: 0.05em;
  }
`;

const Button = styled.button`
  background-color: ${theme.green};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  font-size: 1.2rem;
  cursor: pointer;

  transition: all 0.3s ease;
  z-index: 10;
  &:hover {
    background-color: ${theme.green};
    transform: scale(1.05);
  }
`;

const TestimonialTag = styled.div`
  background-color: white;
  color: ${theme.green};
  border: 1px solid ${theme.green};
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 0.9rem;

  margin-top: 40px;
`;

const ImageCollage = styled.div<{isExpanded: boolean}>`
  display: flex;
  justify-content: flex-start;
  ${props =>
    !props.isExpanded
      ? `
    position: absolute;
    top: -30px;
    align-items: flex-start;
  `
      : `
    
  `}
  column-gap: ${gap}px;

  opacity: ${props => (props.isExpanded ? 1 : 0.7)};
  transition: opacity 0.8s ease-in-out;
`;

const ImageColumn = styled.div<{isOdd: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(${props => (props.isOdd ? '0' : '-80px')});
  row-gap: ${gap}px;
  height: auto;
  padding-top: 20px;
`;
const ImageButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const MarqueeImageButton = styled.button`
  background-color: transparent;

  cursor: pointer;
  border: none;

  position: relative;
  transition: all 0.3s ease;
  margin: 0px;
  padding: 0px;
  margin-right: 51px;
  transform: rotate(-90deg);
  z-index: 10;
  &:hover {
  }
`;
const CollageImage = styled.img<{imageUrl: string}>`
  border-radius: 8px;
  margin: 0px;
  padding: 0px;
  z-index: 10;
  width: calc((${WIDTH}px - ${gap * (numColumns + 1)}px) / ${numColumns});
  height: calc(
    (${WIDTH}px - ${gap * (numColumns + 1)}px) / ${numColumns} * 5 / 4
  );
  opacity: 0.9;
  object-fit: cover;
  @media screen and (max-width: 500px) {
    width: calc(
      (${WIDTH}px - ${gap * (mobileNumColumns - 1)}px) / ${mobileNumColumns}
    );
    height: calc(
      (${WIDTH}px - ${gap * (mobileNumColumns - 1)}px) / ${mobileNumColumns} * 5 /
        4
    );
  }
`;

const AbsCloseButtonContainer = styled.div`
  position: absolute;
  bottom: 40px;
  width: 50%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const AbsCloseButton = styled.button`
  background-color: #1e1e1eb0;
  backdrop-filter: blur(10px);
  color: white;
  border: none;
  cursor: pointer;
  z-index: 10;
  width: 100%;
  border-radius: 50px;
  padding: 15px 30px;
  font-size: ${theme.fontSize.xl};
`;
type MediaDataType = {
  dataType: 'IMG' | 'VID';
  path: string;
  thumbnailPath?: string;
};
type MarqueeImageItemProps = {
  colIndex: number;
  isMarqueeActive: boolean;
  isOdd: boolean;
  column: {
    images: MediaDataType[];
    isOdd: boolean;
  };
  openMediaModal: (media: MediaDataType) => void;
};
const MarqueeImageItem = ({
  colIndex,
  isMarqueeActive,
  isOdd,
  column,
  openMediaModal,
}: MarqueeImageItemProps) => {
  function handleMediaClick(media: MediaDataType) {
    openMediaModal(media);
  }
  return isMarqueeActive ? (
    <MarqueeContainer>
      <Marquee
        direction={column.isOdd ? 'left' : 'right'}
        speed={2}
        gradient={false}
        loop={0}
        pauseOnHover={true}
        style={{
          width: window.innerHeight,
        }}
        play={isMarqueeActive}>
        {column.images.map((media: MediaDataType, imgIndex) => (
          <MarqueeImageButton
            key={`${colIndex}-${imgIndex}`}
            onClick={() => handleMediaClick(media)}>
            {media.dataType === 'IMG' ? (
              <CollageImage src={media.path} imageUrl={media.path} />
            ) : (
              <CollageImage src={media.thumbnailPath} imageUrl={media.path} />
            )}
          </MarqueeImageButton>
        ))}
      </Marquee>
    </MarqueeContainer>
  ) : (
    <ImageColumn key={colIndex} isOdd={column.isOdd}>
      {column.images.map((media: MediaDataType, imgIndex) =>
        media.dataType === 'IMG' ? (
          <CollageImage src={media.path} imageUrl={media.path} key={imgIndex} />
        ) : (
          <CollageImage
            src={media.thumbnailPath}
            imageUrl={media.path}
            key={imgIndex}
          />
        ),
      )}
      <div style={{height: Math.abs(4 - colIndex) * 40 + 50 + 'px'}}>
        <VerticalDottedLine
          height="100%"
          color="#CCCCCC"
          dotSize={3}
          dotGap={2}
        />
      </div>
    </ImageColumn>
  );
};
const EcoActionTestimony = () => {
  const [isMarqueeActive, setIsMarqueeActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaDataType | null>(
    null,
  );
  const localizedTexts: any = i18next.t('EcoActionTestimony', {
    returnObjects: true,
  });
  console.log('(width - ${gap * 8}px) / 9', (WIDTH - gap * 8) / 9);

  // 예시 이미지 URL 배열 (실제 이미지로 교체 필요)

  // 열 구성 정의 (3-3-2-2-2-2-2-3-3)
  const columnCounts = [3, 3, 2, 2, 2, 2, 2, 3, 3];

  // 9개의 열을 만들고 각 열에 이미지 배치
  const columns = columnCounts.map((_, colIndex) => {
    // 각 열에 이미지 복제하여 연속적인 마퀴 효과 생성
    const startIndex = colIndex * 6; // 각 열마다 3개씩 건너뛰기
    const columnImages = [
      ...EcoActionData.slice(startIndex, startIndex + 6),
      ...EcoActionData.slice(startIndex, startIndex + 6),
    ];

    return {
      images: columnImages,
      isOdd: colIndex % 2 === 0, // 홀수 열 여부 (인덱스는 0부터 시작하므로 짝수 인덱스가 홀수 열)
      count: columnImages.length, // 열당 이미지 수
    };
  });
  console.log('columns', columns);

  const handleButtonClick = () => {
    setIsMarqueeActive(true);
    setIsExpanded(true);
  };
  const handleCloseButtonClick = () => {
    setIsMarqueeActive(false);
    setIsExpanded(false);
  };
  const openMediaModal = (media: MediaDataType) => {
    setIsMediaModalOpen(true);
    setSelectedMedia(media);
  };
  const visibleColumns = useMemo(() => {
    return isMarqueeActive
      ? columns
      : columns.map((column, index) => {
          // 각 열에 columnCounts[index]만큼만 이미지 포함
          const limitedImages = column.images.slice(0, columnCounts[index]); // 두 배로 복제된 이미지 고려

          return {
            ...column,
            images: limitedImages,
          };
        });
  }, [isMarqueeActive, columns, columnCounts]);
  console.log('visibleColumns', visibleColumns);

  return (
    <Container isExpanded={isExpanded}>
      <ImageCollage isExpanded={isExpanded}>
        {visibleColumns.map((column, colIndex) => (
          <MarqueeImageItem
            key={colIndex}
            openMediaModal={openMediaModal}
            colIndex={colIndex}
            isMarqueeActive={isMarqueeActive}
            isOdd={column.isOdd}
            column={column}
          />
        ))}
      </ImageCollage>
      <TopGradientOverlay isExpanded={isExpanded} />
      <BottomGradientOverlay />
      {
        <TitleContainer isExpanded={isExpanded}>
          <TestimonialTag>{localizedTexts.tag}</TestimonialTag>

          <Title>{localizedTexts.title}</Title>
          <Subtitle>{localizedTexts.subtitle}</Subtitle>

          <Description
            dangerouslySetInnerHTML={{__html: localizedTexts.description}}
          />

          <Button onClick={handleButtonClick}>
            {localizedTexts.buttonText}
          </Button>
        </TitleContainer>
      }
      {isExpanded && (
        <AbsCloseButtonContainer>
          <AbsCloseButton onClick={handleCloseButtonClick}>
            {localizedTexts.backButtonText}
          </AbsCloseButton>
        </AbsCloseButtonContainer>
      )}
      <MediaModal
        isOpen={isMediaModalOpen}
        setIsOpen={setIsMediaModalOpen}
        selectedMedia={selectedMedia}
      />
    </Container>
  );
};

export default EcoActionTestimony;
