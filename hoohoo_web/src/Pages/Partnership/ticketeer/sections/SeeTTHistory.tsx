import i18next from 'i18next';
import React, {useState} from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';
import {Header} from '../../../../components/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../../components/Wrapper/Wrapper';
import ImageModal from './ImageModal';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
const CardBox = styled.div`
  width: 100%;
  overflow: visible;
  position: relative;
`;
const EventCard = styled.button`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: calc(350px * 0.792) px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 12px;
  &:hover {
    opacity: 0.8;
  }
  @media screen and (max-width: 500px) {
    width: 250px;
    height: calc(250px * 0.792) px;
  }
  @media screen and (max-width: 400px) {
    width: 200px;
    height: calc(200px * 0.792) px;
  }
`;
const EventImage = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1043 / 1392;
  object-fit: cover;
  border-radius: 8px;
`;
function SeeTTHistory() {
  const localizedTexts: any = i18next.t('SeeTTHistory', {returnObjects: true});
  const language = i18next.language;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    description: string;
    image: string;
  } | null>(null);
  const handleClick = (item: {description: string; image: string}) => {
    console.log('handleClick called with item:', item);
    setSelectedItem(item);
    console.log('item', item);
    console.log('Setting isOpen to true');
    setIsOpen(true);
    console.log('isOpen state should be true now');
  };
  return (
    <Container>
      <Wrapper>
        <Header language={language}>{localizedTexts.title}</Header>
      </Wrapper>
      <CardBox>
        <Marquee speed={80} style={{overflow: 'visible'}} pauseOnHover>
          {localizedTexts.marqueeList.map((item: any, index: number) => (
            <EventCard key={index} onClick={() => handleClick(item)}>
              <EventImage src={item.image} alt={item.description} />
            </EventCard>
          ))}
        </Marquee>
      </CardBox>
      <ImageModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedItem={selectedItem}
      />
    </Container>
  );
}

export default SeeTTHistory;
