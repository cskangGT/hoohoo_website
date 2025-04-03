import i18next from 'i18next';

import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

import Wrapper from '../../../components/Wrapper/Wrapper';

import {useQuestionnaire} from '../../../context/QuestionnaireContext';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import {
  QuestionaireDescriptionText,
  QuestionaireTitleText,
} from '../components/styles';
const Container = styled.div`
  width: 100%;

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
  position: relative;
`;

const SelectPurposeContainer = styled.div`
  width: 102%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: ${theme.spacing.xl};
  margin: ${theme.spacing.md} 0px ${theme.spacing['2xl']} 0px;
  @media screen and (max-width: 600px) {
    margin: ${theme.spacing.md} 0px 100px 0px;
  }
`;
const ItemContainer = styled.div<{selected: boolean}>`
  flex: 0 0 calc(20% - ${theme.spacing.md});
  max-width: 280px;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 16px;
  border: ${props => (props.selected ? '2px' : '1px')} solid
    ${props => (props.selected ? theme.darkGray : theme.gray)};
  overflow: hidden;
  background-color: #efefef;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  gap: ${theme.spacing.xm};
  @media screen and (max-width: 1200px) {
    max-width: 250px;
  }

  @media screen and (max-width: 900px) {
    max-width: 200px;
    min-width: 150px;
  }

  @media screen and (max-width: 600px) {
    flex: 0 0 calc(40% - ${theme.spacing.md});
    min-width: 100px;
    gap: ${theme.spacing.rg};
  }
  @media screen and (max-width: 500px) {
    flex: 0 0 calc(40% - ${theme.spacing.rg});
    min-width: auto;
    gap: ${theme.spacing.rg};
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const IconImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const ItemTitle = styled.h3`
  font-size: ${theme.fontSize.xl};
  font-weight: 700;
  text-align: center;
  color: ${theme.darkGray};
  margin-bottom: ${theme.spacing.sm};
  margin: 0px;
  @media screen and (max-width: 600px) {
    font-size: ${theme.fontSize.md};
  }
`;

const ItemDescription = styled.p`
  font-size: ${theme.fontSize.md};
  color: ${theme.darkGray};
  text-align: center;
  font-weight: 400;
  margin: 0px;
  @media screen and (max-width: 600px) {
    font-size: ${theme.fontSize.sm};
  }
`;
const ContinueButtonContainer = styled.div`
  width: calc(100% - ${theme.spacing.md} * 2);

  padding: ${theme.spacing['3xl']} ${theme.spacing.md};
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

// 먼저 타입을 정의합니다
interface GoalItem {
  value: string;
  title: string;
  description: string;
  image: string;
  template: {
    value: string;
    image: string;
  }[];
}
interface GoalItemProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
  selected: boolean;
}
function SelectPurposeItem({
  title,
  description,
  image,
  onClick,
  selected,
}: GoalItemProps) {
  return (
    <ItemContainer onClick={onClick} selected={selected}>
      <IconImage src={image} alt={title} />

      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{description}</ItemDescription>
    </ItemContainer>
  );
}

function SelectPurpose() {
  const {user} = useUserStore();
  const navigate = useNavigate();
  const {setProgress, updateQuestionnaireData, updateTemplateList} =
    useQuestionnaire();
  const [selectedPurpose, setSelectedPurpose] = useState<GoalItem[]>([]);
  const localizedTexts: any = i18next.t('SelectPurpose', {
    returnObjects: true,
  });
  useEffect(() => {
    setProgress(50);
  }, []);
  const handleSendQuestionnaire = async () => {
    updateQuestionnaireData({
      purposes: selectedPurpose.map(item => item.value),
    });
    // selectedPurpose에서 template를 추출해서 넣어서 세팅
    const templateList = selectedPurpose.flatMap(item => {
      const templates =
        localizedTexts.purposeList.find(
          (purpose: GoalItem) => purpose.value === item.value,
        )?.template || [];
      return templates.map(
        (template: {value: string; image: string}) => template,
      );
    });

    updateTemplateList([...templateList, ...localizedTexts.freeStyle]);

    navigate('/setup/select-template');
  };
  const handleSelectPurpose = (goalItem: GoalItem) => {
    if (selectedPurpose.some(item => item.value === goalItem.value)) {
      setSelectedPurpose(prev => prev.filter(p => p.value !== goalItem.value));
    } else {
      setSelectedPurpose(prev => [...prev, goalItem]);
    }
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

          <SelectPurposeContainer>
            {localizedTexts.purposeList.map((goalItem: GoalItem) => (
              <SelectPurposeItem
                key={goalItem.value}
                title={goalItem.title}
                description={goalItem.description}
                image={goalItem.image}
                selected={selectedPurpose.some(
                  item => item.value === goalItem.value,
                )}
                onClick={() => handleSelectPurpose(goalItem)}
              />
            ))}
          </SelectPurposeContainer>
          <ContinueButtonContainer>
            <ContinueButton
              onClick={handleSendQuestionnaire}
              disabled={selectedPurpose.length === 0}>
              {localizedTexts.continue}
            </ContinueButton>
          </ContinueButtonContainer>
        </InnerWrapper>
      </Wrapper>
    </Container>
  );
}

export default SelectPurpose;
