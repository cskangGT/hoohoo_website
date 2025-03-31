import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from '../../../components/Wrapper/Wrapper';
import { useQuestionnaire } from '../../../context/QuestionnaireContext';
import { theme } from '../../../style';
import { QuestionaireDescriptionText, QuestionaireTitleText } from '../components/styles';
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-height: 100%;
  background-color: white !important;
  margin-top: 60px;
  
  @media screen and (max-width: 900px) {
    height: 100%;
    padding: ${theme.spacing.md};
    margin-top: 20px;
    width: calc(100% - ${theme.spacing.md} * 2);
  }
`;
const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TitleText = styled.h2`
  font-size: ${theme.fontSize['3xl']};
  font-weight: 600;
  color: ${theme.darkGray};
  text-align: center;
  margin-bottom: 0px;
  @media screen and (max-width: 500px) {
    font-size: ${theme.fontSize['2xl']};
  }
`;
const DescriptionText = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  color: ${theme.inActiveGray};
  margin: ${theme.spacing['2xl']};
  text-align: center;
`;
const SelectGoalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.md};
  margin: 50px 0px 80px 0px;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;
const ItemContainer = styled.div<{selected: boolean}>`
  flex: 1;
  max-width: 350px;
  min-width: 280px;
  border-radius: 16px;
  border: ${props => (props.selected ? '2px' : '1px')} solid
    ${props => (props.selected ? theme.darkGray : theme.gray)};
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  @media screen and (max-width: 1200px) {
    max-width: 300px;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    max-width: 280px;
    margin-bottom: ${theme.spacing.md};
  }

  @media screen and (max-width: 500px) {
    max-width: 80%;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  padding: ${theme.spacing.rg} ${theme.spacing.lg};
  background-color: white;
`;

const ItemTitle = styled.h3`
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  color: ${theme.darkGray};
  margin-bottom: ${theme.spacing.sm};
`;

const ItemDescription = styled.p`
  font-size: ${theme.fontSize.rg};
  color: ${theme.inActiveGray};
  font-weight: 400;
`;
const ContinueButtonContainer = styled.div`
  width: calc(100% - ${theme.spacing.md} * 2);

  padding: ${theme.spacing['xl']} ${theme.spacing.md};
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 900px) {
    padding: ${theme.spacing.md};
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;
const ContinueButton = styled.button`
  width: 100%;
  max-width: 350px;
  padding: ${theme.spacing.md};
  border-radius: 8px;
  color: ${theme.white};

  background-color: ${theme.darkGray};
  display: flex;
  font-weight: 500;
  font-size: ${theme.fontSize.md};
  font-family: Inter;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    box-shadow:
      0 1px 2px rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
interface GoalItemProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
  selected: boolean;
}

function SelectGoalItem({
  title,
  description,
  image,
  onClick,
  selected,
}: GoalItemProps) {
  return (
    <ItemContainer onClick={onClick} selected={selected}>
      <ImageContainer>
        <img src={image} alt={title} />
      </ImageContainer>
      <ContentContainer>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription dangerouslySetInnerHTML={{__html: description}} />
      </ContentContainer>
    </ItemContainer>
  );
}

function SelectGoal() {
  const localizedTexts: any = i18next.t('SelectGoal', {
    returnObjects: true,
  });
  const navigate = useNavigate();
  const {state} = useLocation();
  const loginType = state?.loginType;
  const [goal, setGoal] = useState<string>('');
  const {setProgress, updateQuestionnaireData} = useQuestionnaire();
  console.log('loginType', loginType);

  useEffect(() => {
    setProgress(25);
  }, []);
  const handleSelectGoal = (role: string) => {
    setGoal(role);
  };
  const handleContinue = () => {
    updateQuestionnaireData({
      role: goal,
      loginType,
    });
    navigate('/setup/select-purpose');
  };
  return (
    <Container>
      <Wrapper>
        <InnerWrapper>
          <QuestionaireTitleText>{localizedTexts.title}</QuestionaireTitleText>
          <QuestionaireDescriptionText
            dangerouslySetInnerHTML={{
              __html: localizedTexts.description,
            }}
          />

          <SelectGoalContainer>
            {localizedTexts.goals.map((goalItem: any) => (
              <SelectGoalItem
                key={goalItem.value}
                title={goalItem.title}
                description={goalItem.description}
                image={goalItem.image}
                selected={goal === goalItem.value}
                onClick={() => handleSelectGoal(goalItem.value)}
              />
            ))}
          </SelectGoalContainer>
          <ContinueButtonContainer>
            <ContinueButton onClick={handleContinue} disabled={goal === ''}>
              {localizedTexts.continue}
            </ContinueButton>
          </ContinueButtonContainer>
        </InnerWrapper>
      </Wrapper>
    </Container>
  );
}

export default SelectGoal;
