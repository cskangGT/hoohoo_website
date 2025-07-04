import i18next from 'i18next';
import React, {useMemo} from 'react';
import Marquee from 'react-fast-marquee';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {EcoActionData} from '../../../../public/Images/EcoActionData';
import useWindowResize from '../../../components/hooks/useWindowResize';
import {theme} from '../../../style';
const gap = 16;
const numColumns = 9;
const mediumNumColumns = 7;
const smallNumColumns = 5;
const mobileNumColumns = 3;
const maxWidth = window.innerWidth > 1400 ? 1400 : window.innerWidth;
const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;

  padding-top: 80px;
  margin-bottom: 0px;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  max-width: 1500px;
  @media screen and (max-width: 600px) {
    margin-bottom: 50px;

    /* min-height: ${window.innerHeight}px; */
  }
`;
const TopGradientOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 400px;
  z-index: 1;
  top: 0px;
  margin-top: 0px;
  background: linear-gradient(
    to bottom,
    #00bf63 0%,
    rgba(255, 255, 255, 0) 400px
  );
`;

const MarqueeContainer = styled.div<{resizedWidth: number}>`
  height: 95%;
  width: calc((${maxWidth}px - ${gap * (numColumns + 1)}px) / ${numColumns});
  transform: rotate(90deg);

  @media screen and (max-width: 550px) {
    width: calc(
      (${maxWidth}px - ${gap * (mobileNumColumns - 1)}px) / ${mobileNumColumns}
    );
  }
`;
const TitleContainer = styled.div<{resizedWidth: number}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: all 0.8s ease-in-out;
  transform: translateY(0px);
  padding-bottom: 80px;

  // desktop 버전 수정
  padding-top: calc(
    (
        (${props => props.resizedWidth}px - ${gap * (numColumns + 1)}px) /
          ${numColumns} * 5 / 4 * 2
      ) + 120px
  );
  @media screen and (max-width: 1000px) {
    padding-top: calc(
      (
          (${props => props.resizedWidth}px - ${gap * (mediumNumColumns + 1)}px) /
            ${mediumNumColumns} * 5 / 4 * 2
        ) + 96px
    );
  }
  @media screen and (max-width: 800px) {
    padding-top: calc(
      (
          (${props => props.resizedWidth}px - ${gap * (smallNumColumns + 1)}px) /
            ${smallNumColumns} * 5 / 4 * 2
        ) + 96px
    );
  }
  // mobile 버전 수정
  @media screen and (max-width: 550px) {
    padding-top: calc(
      (
          (${props => props.resizedWidth}px - ${gap * (mobileNumColumns - 1)}px) /
            ${mobileNumColumns} * 5 / 4 * 2
        ) + 96px
    );
  }
`;
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center;
  font-family: Fredoka;
  white-space: pre-line;
  letter-spacing: 0.1em;
  @media screen and (max-width: 850px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.75rem;
    margin-bottom: 0px;
  }
`;

const Description = styled.p<{language: string}>`
  font-size: 1.25rem;
  text-align: center;
  margin: 3rem 10px;
  max-width: 800px;
  white-space: pre-line;
  line-height: 1.75;
  font-family: ${props =>
    props.language === 'ko' ? 'HakgyoansimDunggeunmiso' : 'Fredoka'};

  @media screen and (max-width: 850px) {
    font-size: 1rem;
    max-width: 100%;
  }
  @media screen and (max-width: 500px) {
    font-size: 1rem;
    max-width: 100%;
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

const ImageCollage = styled.div`
  display: flex;
  justify-content: flex-start;
  z-index: 3;

  position: absolute;
  top: -10px;
  align-items: flex-start;

  column-gap: ${gap}px;

  opacity: 1;
  transition: opacity 0.8s ease-in-out;
`;

const ImageColumn = styled.div<{isOdd: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(${props => (props.isOdd ? '0' : '-60px')});
  row-gap: ${gap}px;
  height: auto;
  padding-top: 140px;
  @media screen and (max-width: 500px) {
    transform: translateY(${props => (props.isOdd ? '0' : '-60px')});
  }
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
const CollageImage = styled.img<{resizedWidth: number}>`
  border-radius: 8px;
  margin: 0px;
  padding: 0px;
  z-index: 10;
  width: calc(
    (${props => props.resizedWidth}px - ${gap * (numColumns + 1)}px) /
      ${numColumns}
  );
  height: calc(
    (${props => props.resizedWidth}px - ${gap * (numColumns + 1)}px) /
      ${numColumns} * 5 / 4
  );
  opacity: 0.9;
  object-fit: cover;

  @media screen and (max-width: 550px) {
    width: calc(
      (${props => props.resizedWidth}px - ${gap * (mobileNumColumns - 1)}px) /
        ${mobileNumColumns}
    );
    height: calc(
      (${props => props.resizedWidth}px - ${gap * (mobileNumColumns - 1)}px) /
        ${mobileNumColumns} * 5 / 4
    );
  }
`;
const StoppedImage = styled.img<{resizedWidth: number}>`
  border-radius: 8px;
  margin: 0px;
  padding: 0px;
  z-index: 10;
  width: calc(
    (${props => props.resizedWidth}px - ${gap * (numColumns + 1)}px) /
      ${numColumns}
  );
  height: calc(
    (${props => props.resizedWidth}px - ${gap * (numColumns + 1)}px) /
      ${numColumns} * 5 / 4
  );
  opacity: 0.9;
  object-fit: cover;
  @media screen and (max-width: 1000px) {
    width: calc(
      (${props => props.resizedWidth}px - ${gap * (mediumNumColumns + 1)}px) /
        ${mediumNumColumns}
    );
    height: calc(
      (${props => props.resizedWidth}px - ${gap * (mediumNumColumns + 1)}px) /
        ${mediumNumColumns} * 5 / 4
    );
  }
  @media screen and (max-width: 800px) {
    width: calc(
      (${props => props.resizedWidth}px - ${gap * (smallNumColumns + 1)}px) /
        ${smallNumColumns}
    );
    height: calc(
      (${props => props.resizedWidth}px - ${gap * (smallNumColumns + 1)}px) /
        ${smallNumColumns} * 5 / 4
    );
  }
  @media screen and (max-width: 550px) {
    width: calc(
      (${props => props.resizedWidth}px - ${gap * (mobileNumColumns - 1)}px) /
        ${mobileNumColumns}
    );
    height: calc(
      (${props => props.resizedWidth}px - ${gap * (mobileNumColumns - 1)}px) /
        ${mobileNumColumns} * 5 / 4
    );
  }
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
  resizedWidth: number;
};
export const EcoActionMarqueeImageItem = ({
  colIndex,
  isMarqueeActive,
  isOdd,
  column,
  openMediaModal,
  resizedWidth,
}: MarqueeImageItemProps) => {
  function handleMediaClick(media: MediaDataType) {
    openMediaModal(media);
  }

  return isMarqueeActive ? (
    <MarqueeContainer resizedWidth={resizedWidth}>
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
            <CollageImage
              src={media.dataType === 'IMG' ? media.path : media.thumbnailPath}
              resizedWidth={resizedWidth}
            />
          </MarqueeImageButton>
        ))}
      </Marquee>
    </MarqueeContainer>
  ) : (
    <ImageColumn key={colIndex} isOdd={column.isOdd}>
      {column.images.map((media: MediaDataType, imgIndex) => (
        <StoppedImage
          src={media.dataType === 'IMG' ? media.path : media.thumbnailPath}
          resizedWidth={resizedWidth}
        />
      ))}
      {/* <div style={{height: Math.abs(4 - colIndex) * 40 + 50 + 'px'}}>
        <VerticalDottedLine
          height="100%"
          color="#CCCCCC"
          dotSize={3}
          dotGap={2}
        />
      </div> */}
    </ImageColumn>
  );
};

const HomeLandingEcoAction = () => {
  const navigate = useNavigate();
  const {width: resizedWidth} = useWindowResize({maxWidth: 1400});
  const localizedTexts: any = i18next.t('EcoActionTestimony', {
    returnObjects: true,
  });

  const columnCounts = [3, 3, 2, 2, 2, 2, 2, 3, 3];

  const columns = columnCounts.map((_, colIndex) => {
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

  const handleButtonClick = () => {
    navigate(`/${i18next.language}/contents?category=ECO_ACTIONS`, {
      state: {canComeBack: true},
    });
  };

  const visibleColumns = useMemo(() => {
    return columns.map((column, index) => {
      // 각 열에 columnCounts[index]만큼만 이미지 포함
      const limitedImages = column.images.slice(0, columnCounts[index]); // 두 배로 복제된 이미지 고려

      return {
        ...column,
        images: limitedImages,
      };
    });
  }, [columns, columnCounts]);

  console.log('resizedWidth', resizedWidth);

  return (
    <>
      <TopGradientOverlay />
      <Container>
        <ImageCollage>
          {visibleColumns.map((column, colIndex) => (
            <EcoActionMarqueeImageItem
              key={colIndex}
              openMediaModal={() => {}}
              colIndex={colIndex}
              isMarqueeActive={false}
              isOdd={column.isOdd}
              column={column}
              resizedWidth={resizedWidth}
            />
          ))}
        </ImageCollage>

        <TitleContainer resizedWidth={resizedWidth}>
          {/* <TestimonialTag>{localizedTexts.tag}</TestimonialTag> */}

          <Title>{localizedTexts.title}</Title>

          <Description language={i18next.language}>
            {localizedTexts.description}
          </Description>

          <Button onClick={handleButtonClick}>
            {localizedTexts.buttonText}
          </Button>
        </TitleContainer>
      </Container>
    </>
  );
};

export default HomeLandingEcoAction;
