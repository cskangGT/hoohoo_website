import i18next from 'i18next';
import React, {useState} from 'react';
import {IoClose} from 'react-icons/io5';
import styled from 'styled-components';
import {theme} from '../style';
const BubbleBox = styled.div<any>`
  cursor: pointer;
  z-index: 10000;
  color: ${theme.darkGray};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 10px 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
  position: fixed;
  right: 20px;
  bottom: 20px;
  text-align: left;
  opacity: ${({isFadingOut}: any) => (isFadingOut ? 0 : 1)};
  background-color: rgba(30, 30, 30, 0.7);
  transition: opacity 0.5s;
  @media screen and (max-width: 700px) {
    right: auto;
    bottom: 20px;
    right: 15px;
    left: 15px;
  }
`;
const Inside = styled.div`
  left: 30px;
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  width: 50px;
  @media screen and (max-width: 700px) {
    width: auto;
    height: 50px;
  }
`;
const TextBox = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  justify-content: space-between;
`;
const Text = styled.span`
  font-size: ${theme.fontSize.rg};
  color: ${theme.white};
  line-height: 1.8;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 700px) {
    font-size: ${theme.fontSize.sm};
    line-height: 1.4;
  }
`;
const CloseBox = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

type BubbleProps = {
  setIsBubble: React.Dispatch<React.SetStateAction<boolean>>;
};

const Bubble: React.FC<BubbleProps> = ({setIsBubble}) => {
  const data: any = i18next.t('bubble', {returnObjects: true});
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFadingOut(true);
    setTimeout(() => {
      setIsBubble(false);
    }, 500);
  };

  const handleClick = () => {
    window.open('https://zigu.my', '_blank');
  };
  return (
    <BubbleBox isFadingOut={isFadingOut} onClick={handleClick}>
      <Inside>
        <Image src={data['image']} />
        <TextBox>
          <Text>
            {data['text_part1']} <br />
            {data['text_part2']}
          </Text>
        </TextBox>
      </Inside>
      <CloseBox onClick={handleClose}>
        <IoClose size={20} color="white" />
      </CloseBox>
    </BubbleBox>
  );
};
export default Bubble;
