import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../style';
const BubbleBox = styled.div<any>`
    cursor: pointer;
    color: ${theme.darkgrey};
    padding-left: 20px;
    padding-right: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 10px 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
    position: absolute;
    right: 20px;
    bottom: 20px;
    text-align: left;
    opacity: ${({ isFadingOut }: any) => (isFadingOut ? 0 : 1)};
    background-color: rgba(30, 30, 30, 0.7);
    transition: opacity 0.5s;
`;
const Inside = styled.div`
  left: 30px;
  display: flex;
`;
const Image = styled.img`
  width: 70px
`;
const TextBox = styled.div`
  margin-left: 12px;
`;
const Text = styled.span`
  font-size: 14px;
  color: ${theme.white};
  line-height: 1.1;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
`;
const CloseBox = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;
const Close = styled.img`
  width: 20px;
  height: auto;
`;

type BubbleProps = {
  setIsBubble: React.Dispatch<React.SetStateAction<boolean>>;
};

const Bubble: React.FC<BubbleProps> = ({ setIsBubble }) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsBubble(false);
    }, 500);
  };

  return (
    <BubbleBox isFadingOut={isFadingOut}>
      <Inside>
        <Image src='Images/icon128.png' />
        <TextBox>
          <Text>We are the creator of DropB <br />Do you want to tag your day? Try DropB!</Text>
        </TextBox>
      </Inside>
      <CloseBox onClick={handleClose}>
        <Close src='Images/close_btn.png' />
      </CloseBox>
    </BubbleBox>
  )
}
export default Bubble;