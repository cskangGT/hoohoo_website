import React from 'react'
import styled from 'styled-components';
import { LineDivider, theme } from '../../style';
import i18next from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
const CloseButton = styled.a`
  position: absolute;
  color: ${theme.white};
  right: 20px;
  top: 20px;
  text-decoration: none;
`;
export const ModalTitle = styled.p`
  position: relative;
  font-size: 40px;
  width: 100%;
  font-family: 'Fredoka';
  text-align: center;
  padding: 20px 0px;
  color: ${theme.white};
  @media screen and (max-width: 800px) {
    padding: 14px 0px;
        font-size: 34px;
    }
  @media screen and (max-width: 600px) {
    padding: 12px 0px;
        font-size: 26px;
    }
    @media screen and (max-width: 400px) {
    padding: 10px 0px;
        font-size: 20px;
    }
`;
const ControlContainer = styled.div`
  padding: 20px 20px;
  flex-direction: column;
  width: 100%;
  @media screen and (max-width: 800px) {
        padding: 12px 10px;
    }
  @media screen and (max-width: 600px) {
    padding: 12px 10px;
    }
    
`;
const ControlRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
  justify-content: space-between;
`;
const SubtitleText = styled.p`
  text-align: left;
  font-size: 30px;
  font-family: 'Yanolga Yachae';
  color: ${theme.white};
  @media screen and (max-width: 800px) {
        font-size: 26px;
    }
  @media screen and (max-width: 600px) {
        font-size: 20px;
    }
    @media screen and (max-width: 400px) {
      font-size: 18px;
    }
`;
const OneControlItemText = styled.p`
  text-align: left;
  font-size: 20px;
  font-family: 'Yanolga Yachae';
  color: ${theme.white};
  @media screen and (max-width: 800px) {
      font-size: 18px;
    }
    @media screen and (max-width: 600px) {
      font-size: 16px;
    }
  @media screen and (max-width: 400px) {
      font-size: 16px;
    }
`;
const OneControlItemButton = styled.a`
    font-size: 20px;
    padding: 2px 10px;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    font-family: 'Yanolga Yachae';
    cursor: pointer;
    text-decoration: none;
    color: ${theme.red};
    text-align: right;
    @media screen and (max-width: 800px) {
      font-size: 18px;
    }
    @media screen and (max-width: 600px) {
      font-size: 16px;
    }
  @media screen and (max-width: 400px) {
      font-size: 16px;
    }
`;
type Props = {
    setDeleteAccProgress: React.Dispatch<React.SetStateAction<number>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function BaseProgress({setIsOpen, setDeleteAccProgress} :Props) {
    const data : any = i18next.t('ManageAccModal', { returnObjects: true });
  return (
    <>
        <CloseButton onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faX} /></CloseButton>
        <ModalTitle>{data.manageProgress.title}</ModalTitle>
        <LineDivider />
        <ControlContainer>
            <SubtitleText>{data.manageProgress.subtitle}</SubtitleText>
            <ControlRow>
                <OneControlItemText>
                    {data.manageProgress.list[0]}
                </OneControlItemText>
                <OneControlItemButton onClick={()=> {
                    setDeleteAccProgress(1);
                }}>{data.manageProgress.delete}</OneControlItemButton>
            </ControlRow>
        </ControlContainer>
    </>
  )
}

export default BaseProgress