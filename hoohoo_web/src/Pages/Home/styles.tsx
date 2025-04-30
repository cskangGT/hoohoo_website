import styled from 'styled-components';
import {theme} from '../../style';

export const PartnerButton = styled.a`
  font-size: 26px;
  font-weight: 500;
  cursor: pointer;
  line-height: 1.5;
  text-decoration: none;
  border-radius: 30px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  margin: 1rem 0;
  margin-top: 40px;
  background-color: ${theme.mainNeon};
  color: ${theme.darkGray};
  width: 70%;
  text-align: center;
  padding: 12px 30px;
  font-family: 'Fredoka';
  @media screen and (max-width: 1100px) {
    font-size: 22px;
    margin-right: 0;
    margin-top: 20px;
    width: auto;
  }
`;
export const HomeTransitionButton = styled(PartnerButton)`
  /* font-family: 'Yanolga Yachae'; */
  font-weight: 400;
  background-color: #36b864;
  color: white;
  font-size: 1.4rem;

  /* height: 60px; */
  width: 240px;
  align-items: center;
  white-space: pre-line;
  justify-content: center;
  line-height: 1.2;
  text-align: center;
  cursor: pointer;

  padding: 15px 20px;
  /* @media screen and (max-width: 1200px){
      width: 300px;
    }
    @media screen and (max-width: 1000px){
      width: 300px;
    } */
`;
