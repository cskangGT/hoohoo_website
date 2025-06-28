import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {theme} from '../../../../style';

export const ModalBackground = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  right: 0;
  max-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 100%;
  max-height: 100%;
  padding: 6rem 2rem 3rem;
  overflow: auto;
`;
const ModalContent = styled.div`
  z-index: 10;
  max-width: 30%;

  background-color: transparent;
  border-radius: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  position: relative;

  overflow-y: auto;
  font-family: arial, helvetica, sans-serif;
  @media screen and (max-width: 1100px) {
    max-width: 50%;
  }
  @media screen and (max-width: 700px) {
    max-width: 80%;
  }
  @media screen and (max-width: 500px) {
    max-width: 90%;
  }
  @media screen and (max-width: 400px) {
    max-width: 95%;
  }
`;

const CloseButton = styled.a`
  position: absolute;
  color: ${theme.white};
  right: 15px;
  top: 10px;
  text-decoration: none;
  padding: 10px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 100%;
  aspect-ratio: 1043 / 1392;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 0;
`;

const Description = styled.p<{language: string}>`
  color: ${theme.white};
  font-size: ${theme.fontSize.md};
  font-family: ${props => (props.language === 'en' ? 'Fredoka' : 'Inter')};
  line-height: 1.5;
  text-align: left;
  margin: 0;
  padding: 0 1rem;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  padding: 12px 16px;

  background: linear-gradient(
    179.89deg,
    rgba(102, 102, 102, 0.02) 0.1%,
    #000000 99.9%
  );

  border-radius: 4px;
`;

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: {
    description: string;
    image: string;
  } | null;
};

function ImageModal({isOpen, setIsOpen, selectedItem}: Props) {
  const closeModal = () => {
    setIsOpen(false);
  };
  console.log('isOpen', isOpen);

  if (!isOpen || !selectedItem) return null;

  return ReactDOM.createPortal(
    <ModalBackground onClick={closeModal}>
      <Wrapper>
        <ModalContent onClick={e => e.stopPropagation()}>
          <CloseButton onClick={closeModal}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </CloseButton>
          <ImageWrapper>
            <Image src={selectedItem.image} alt={selectedItem.description} />
            <Description language={i18next.language}>
              {selectedItem.description}
            </Description>
          </ImageWrapper>
        </ModalContent>
      </Wrapper>
    </ModalBackground>,
    document.body,
  );
}

export default ImageModal;
