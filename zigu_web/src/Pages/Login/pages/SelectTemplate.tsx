import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from '../../../components/Wrapper/Wrapper';
import {useQuestionnaire} from '../../../context/QuestionnaireContext';
import {theme} from '../../../style';
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
const BlurOverlay = styled.div<{hasTemplate: boolean}>`
  position: fixed;
  bottom: ${props => (props.hasTemplate ? 92 : 0)}px;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.01),
    rgba(45, 45, 45, 0.8)
  );
  pointer-events: none; // 아래 요소들과 상호작용 가능하도록
  z-index: 1;
`;
const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const TitleText = styled.h2`
  font-size: ${theme.fontSize['3xl']};
  font-weight: 600;
  color: ${theme.darkGray};
  text-align: center;
`;
const DescriptionText = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  color: ${theme.inActiveGray};
  margin: ${theme.spacing['2xl']};
  text-align: center;
`;
const TemplateContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
  gap: ${theme.spacing.xl};
  margin-bottom: 120px;
`;

const ContinueButtonContainer = styled.div`
  width: calc(100% - ${theme.spacing.md} * 2);

  padding: ${theme.spacing['3xl']} ${theme.spacing.md};
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${theme.spacing.md};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;
const SkipButton = styled.button`
  width: 130px;
  height: 40px;
  border-radius: 8px;
  background-color: transparent;
  color: ${theme.inActiveGray};
  font-size: ${theme.fontSize.md};
  font-weight: 500;
  border-radius: 20px;
  border: 1px solid ${theme.inActiveGray};
  position: absolute;
  top: 0;
  right: 20px;
  cursor: pointer;
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

const TemplateItemContainer = styled.div<{
  selected: boolean;
  isSelected: boolean;
}>`
  flex: 0 0 calc(25% - 20px); // 4개씩 보여주기 위해 25%로 설정
  min-width: 180px; // 최소 너비 조정
  max-width: 220px; // 최대 너비 조정
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  opacity: ${props => (!props.isSelected ? 1 : props.selected ? 1 : 0.8)};
  &:hover {
    transform: translateY(-5px);
  }
  @media (max-width: 550px) {
    flex: 0 0 calc(50% - ${theme.spacing.md});
    min-width: auto;
    max-width: auto;
  }
`;

const TemplateImage = styled.img`
  width: 100%;

  object-fit: contain;
  border-radius: 16px;
`;

const SelectTemplateContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;

  padding: ${theme.spacing.lg} 0;
  /* overflow-y: auto; */
  /* max-height: calc(100vh - 300px); */

  @media (max-width: 1200px) {
    justify-content: center; // 화면이 작아질 때는 중앙 정렬
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: ${theme.spacing.sm};
  }
`;

export function SelectTemplateItem({
  image,
  selected,
  isSelected,
  onClick,
}: {
  image: string;
  selected: boolean;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <TemplateItemContainer
      isSelected={isSelected}
      selected={selected}
      onClick={onClick}>
      <TemplateImage src={image} alt="template" />
    </TemplateItemContainer>
  );
}

function SelectTemplate() {
  const localizedTexts: any = i18next.t('SelectTemplate', {
    returnObjects: true,
  });
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const {setProgress, templateList, updateQuestionnaireData} =
    useQuestionnaire();
  useEffect(() => {
    setProgress(75);
  }, []);
  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template);
    setIsSelected(true);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      updateQuestionnaireData({
        template: selectedTemplate,
      });

      navigate('/setup/profile');
    }
  };
  return (
    <Container>
      <Wrapper>
        <InnerWrapper>
          <TitleText>{localizedTexts.title}</TitleText>
          <DescriptionText
            dangerouslySetInnerHTML={{
              __html: localizedTexts.description,
            }}
          />

          <TemplateContainer>
            <SelectTemplateContainer>
              {templateList.map((template: {value: string; image: string}) => (
                <SelectTemplateItem
                  key={template.value}
                  image={template.image}
                  isSelected={isSelected}
                  selected={selectedTemplate === template.value}
                  onClick={() => handleSelectTemplate(template.value)}
                />
              ))}
            </SelectTemplateContainer>
          </TemplateContainer>

          {selectedTemplate && (
            <ContinueButtonContainer>
              <ContinueButton
                onClick={handleContinue}
                disabled={!selectedTemplate}>
                {localizedTexts.continue}
              </ContinueButton>
            </ContinueButtonContainer>
          )}
          <BlurOverlay hasTemplate={!!selectedTemplate} />
        </InnerWrapper>
      </Wrapper>
    </Container>
  );
}

export default SelectTemplate;
