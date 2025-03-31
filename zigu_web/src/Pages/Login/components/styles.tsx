import styled from 'styled-components';
import { theme } from '../../../style';
export const QuestionaireTitleText = styled.h2`
  font-size: ${theme.fontSize['3xl']};
  font-weight: 600;
  color: ${theme.darkGray};
  text-align: center;
  margin-bottom: 0px;
  @media screen and (max-width: 500px) {
    font-size: ${theme.fontSize['2xl']};
  }
`;
export const QuestionaireDescriptionText = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  color: ${theme.inActiveGray};
  margin: ${theme.spacing['2xl']};
  text-align: center;
`;