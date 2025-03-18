import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {EcoActionData} from '../../../../public/Images/EcoActionData';
import useWindowResize from '../../../components/hooks/useWindowResize';
import {BgImage, theme} from '../../../style';
import {EcoActionMarqueeImageItem} from '../../Home/sections/HomeLandingEcoAction';
import MediaModal from '../../Home/sections/MediaModal';
const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;

  padding-top: 20px;
  margin-bottom: 150px;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  max-width: 1500px;
  @media screen and (max-width: 600px) {
    margin-bottom: 100px;
    min-height: 90vh;
  }
`;
const TopGradientOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 120px;
  z-index: 2;
  top: 0px;

  margin-top: 0px;
  background: linear-gradient(to bottom, white 0%, transparent 120px);
`;
const BottomGradientOverlay = styled.div`
  position: absolute;
  bottom: 20px;

  width: 100%;
  height: 150px;

  z-index: 2;
  background: linear-gradient(to top, white 10%, transparent 100px);
  @media screen and (max-width: 600px) {
    bottom: -2px;
  }
`;
const IntroContentBox = styled.div`
  padding-top: 20px;
  justify-content: center;
  width: 100%;
  display: flex;
  margin-top: 80px;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
`;
const ImageCollage = styled.div`
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: -30px;
  align-items: flex-start;
  column-gap: ${16}px;
  transition: opacity 0.8s ease-in-out;
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
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 0부터 i까지의 무작위 인덱스
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // 요소 교환
  }
  return newArray;
};
function Testimonials() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaDataType | null>(
    null,
  );

  const mixed = shuffleArray([...EcoActionData]);

  const resizedWidth = useWindowResize({maxWidth: 1400});
  const localizedTexts: any = i18next.t('EcoActionTestimony', {
    returnObjects: true,
  });
  const columnCounts = [3, 3, 2, 2, 2, 2, 2, 3, 3];
  const columns = columnCounts.map((_, colIndex) => {
    const startIndex = colIndex * 6; // 각 열마다 3개씩 건너뛰기
    const columnImages = [
      ...mixed.slice(startIndex, startIndex + 6),
      ...mixed.slice(startIndex, startIndex + 6),
    ];

    return {
      images: columnImages,
      isOdd: colIndex % 2 === 0,
      count: columnImages.length,
    };
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openMediaModal = (media: MediaDataType) => {
    setIsMediaModalOpen(true);
    setSelectedMedia(media);
  };

  return (
    <BgImage>
      <IntroContentBox>
        <Container>
          <ImageCollage>
            {columns.map((column, colIndex) => (
              <EcoActionMarqueeImageItem
                key={colIndex}
                openMediaModal={openMediaModal}
                colIndex={colIndex}
                isMarqueeActive={true}
                isOdd={column.isOdd}
                column={column}
                resizedWidth={resizedWidth}
              />
            ))}
          </ImageCollage>
          <TopGradientOverlay />
          <BottomGradientOverlay />
          {/* {
            <AbsCloseButtonContainer>
              <AbsCloseButton onClick={handleCloseButtonClick}>
                {localizedTexts.backButtonText}
              </AbsCloseButton>
            </AbsCloseButtonContainer>
          } */}
          <MediaModal
            isOpen={isMediaModalOpen}
            setIsOpen={setIsMediaModalOpen}
            selectedMedia={selectedMedia}
          />
        </Container>
      </IntroContentBox>
    </BgImage>
  );
}

export default Testimonials;
