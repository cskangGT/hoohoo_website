import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import {BlogDataType} from '../../../components/Blog/BlogCategory';
import {theme} from '../../../style';

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
`;

const CloseButton = styled.a`
  position: absolute;
  color: ${theme.white};
  right: 15px;
  top: 10px;
  text-decoration: none;
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* color: ${theme.white}; */
`;

const SubmitBtn = styled.button`
  text-decoration: none;
  background-color: ${theme.mainNeon};
  height: 50px;
  border-radius: 15px;
  border-color: ${theme.darkGray};
  width: 200px;
  font-weight: bold;
  margin-bottom: 26px;
`;
const Label = styled.label`
  color: ${theme.white};
`;
const HeaderCotainer = styled.div``;
const HeaderText = styled.h1`
  color: ${theme.white};
  font-size: 24px;
`;
const PreviewImage = styled.img`
  width: 500px;
  height: 300px;
  object-fit: contain;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBlog: BlogDataType | undefined;
};
function BlogModal({isOpen, setIsOpen, selectedBlog}: Props) {
  console.log('selectedBlog', selectedBlog);
  if (!selectedBlog) {
    return <></>;
  }
  const closeModal = () => {
    setIsOpen(false);
  };
  const {blogImage} = selectedBlog;
  return (
    <>
      {isOpen && (
        <ModalBackground onClick={closeModal}>
          <Wrapper>
            <ModalContent>
              <CloseButton onClick={closeModal}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </CloseButton>
              <Image src={blogImage.high} />
            </ModalContent>
          </Wrapper>
        </ModalBackground>
      )}
    </>
  );
}

export default BlogModal;
