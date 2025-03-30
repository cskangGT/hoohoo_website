import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../../style';
import {ProfileWidgetItemSize} from '../types/WidgetItemType';
import {getEMWidgetData} from '../util/EMWidgetData';

const CO2Container = styled.div<{small?: boolean; long?: boolean}>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: ${props =>
    props.small ? `0 ${theme.spacing.xl}` : `0 ${theme.spacing.xl}`};

  border-radius: 12px;
  position: relative;

  ${props =>
    props.long &&
    `
    justify-content: flex-start;
  `}

  @media (max-width: 500px) {
    padding: ${props =>
      props.small ? `0 ${theme.spacing.md}` : `0 ${theme.spacing.lg}`};
  }
  @media (max-width: 400px) {
    padding: ${props =>
      props.small ? `0 ${theme.spacing.md}` : `0 ${theme.spacing.lg}`};
  }
`;

const CO2BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - ${theme.spacing.lg} - ${theme.spacing.lg});
  height: calc(100% - ${theme.spacing.lg} - ${theme.spacing.lg});
  padding: ${theme.spacing.lg};

  justify-content: space-between;
  border-radius: 12px;
  @media (max-width: 500px) {
    width: calc(100% - ${theme.spacing.md} - ${theme.spacing.md});
    height: calc(100% - ${theme.spacing.md} - ${theme.spacing.md});
    padding: ${theme.spacing.md};
  }
`;

const CO2TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  position: relative;
`;

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  row-gap: 4px;
`;
const CO2Title = styled.div`
  font-size: ${theme.fontSize.xl};
  margin-right: 5;
  color: ${theme.gray};
  font-weight: 500;
  line-height: 1.2;
  @media (max-width: 500px) {
    font-size: ${theme.fontSize.md};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.md};
  }
`;

const FootprintIcon = styled.img<{small?: boolean}>`
  height: 30px;
  margin-right: 10px;
  object-fit: contain;
  @media (max-width: 500px) {
    height: 25px;
  }
  @media (max-width: 400px) {
    height: 20px;
  }
`;

const FootprintIconBig = styled.img<{width: number}>`
  width: ${props => props.width * 0.1}px;
  object-fit: contain;
`;

const CO2ValueContainer = styled.div`
  display: flex;

  margin-left: 16px;
  align-items: baseline;
  font-family: Inter;
  @media (max-width: 500px) {
    margin-left: 8px;
  }
  @media (max-width: 400px) {
    margin-left: 4px;
  }
`;

const CO2Value = styled.div<{small?: boolean}>`
  font-size: ${props => (props.small ? theme.fontSize.xl : theme.fontSize.xl)};
  line-height: 1.2;
  font-weight: bold;
  color: ${theme.white};
  @media (max-width: 500px) {
    font-size: ${theme.fontSize.lg};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.md};
  }
`;

const CO2Unit = styled.div<{small?: boolean}>`
  font-size: ${props => (props.small ? theme.fontSize.md : theme.fontSize.md)};
  color: ${theme.white};
  line-height: 1.2;
  margin-left: 4px;
  @media (max-width: 500px) {
    font-size: ${theme.fontSize.lg};
    margin-left: 2px;
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.md};
    margin-left: 2px;
  }
`;

const CO2Text = styled.div`
  font-size: ${theme.fontSize.md};
  color: ${theme.mainNeon};
  margin-left: auto;
`;

const CO2TreesText = styled.div`
  font-size: ${theme.fontSize.xl};
  line-height: 1.2;
  color: ${theme.mainNeon};
  margin-bottom: 12px;
  @media (max-width: 500px) {
    font-size: ${theme.fontSize.md};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.rg};
  }
`;
const SavedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CO2BigValueContainer = styled.div`
  display: flex;
  align-items: baseline;

  column-gap: 4px;
  margin-bottom: 4px;
`;

const CO2BigValue = styled.div`
  font-size: ${theme.spacing['3xl']};
  font-weight: 500;
  color: #ffffff;
  @media (max-width: 500px) {
    font-size: ${theme.fontSize['2xl']};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize['2xl']};
  }
`;

const CO2BigUnit = styled.div`
  font-size: ${theme.fontSize.lg};
  color: ${theme.white};
  margin-left: 8px;
  @media (max-width: 500px) {
    font-size: ${theme.fontSize.md};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.sm};
  }
`;

const CO2SubText = styled.div`
  font-size: ${theme.fontSize.md};
  color: ${theme.white};
  @media (max-width: 500px) {
    font-size: ${theme.fontSize.rg};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.sm};
  }
`;

type CarbonWidgetContentProps = {
  sizeType: ProfileWidgetItemSize;
  annualEcoActionCount: number;
  annualCarbonReduction: number;
  treeEffect: number;
  width: number;
};
function CarbonWidgetContent({
  width,
  sizeType,
  annualEcoActionCount,
  annualCarbonReduction,
  treeEffect,
}: CarbonWidgetContentProps) {
  const localizedTexts: any = i18next.t('CarbonWidgetContent', {
    returnObjects: true,
  });
  const emWidgetData = getEMWidgetData();
  if (sizeType === 'SMALL') {
    // 작은 사이즈 (왼쪽 이미지)
    return (
      <CO2Container small>
        <FootprintIcon small src={'/Images/footprint.png'} />
        <CO2ValueContainer>
          <CO2Value small> {annualCarbonReduction / 1000}</CO2Value>
          <CO2Unit small>{localizedTexts.annualCabonReduction[1]}</CO2Unit>
        </CO2ValueContainer>
      </CO2Container>
    );
  } else if (sizeType === 'LONG') {
    // 긴 사이즈 (중간 이미지들)
    return (
      <CO2Container long>
        <FootprintIcon src={'/Images/footprint.png'} />
        <CO2ValueContainer>
          <CO2Value>{annualCarbonReduction / 1000}</CO2Value>
          <CO2Unit>{localizedTexts.annualCabonReduction[1]}</CO2Unit>
        </CO2ValueContainer>
        <CO2Text>
          {localizedTexts.treeEffect[0]} {treeEffect}{' '}
          {localizedTexts.treeEffect[1]}
        </CO2Text>
      </CO2Container>
    );
  } else {
    // 큰 사이즈 (오른쪽 위 이미지)
    return (
      <CO2BigContainer>
        <>
          <CO2TopSection>
            <VerticalBox>
              <CO2Title>
                {localizedTexts.ecoActionCount[0]} {annualEcoActionCount}{' '}
                {localizedTexts.ecoActionCount[1]}
              </CO2Title>
              <CO2TreesText>
                {localizedTexts.treeEffect[0]} {treeEffect}{' '}
                {localizedTexts.treeEffect[1]}
              </CO2TreesText>
            </VerticalBox>
            <FootprintIconBig width={width} src={'/Images/footprint.png'} />
          </CO2TopSection>
        </>
        <SavedContainer>
          <CO2BigValueContainer>
            <CO2BigValue>{annualCarbonReduction / 1000}</CO2BigValue>
            <CO2BigUnit>{localizedTexts.annualCabonReduction[1]}</CO2BigUnit>
          </CO2BigValueContainer>
          <CO2SubText>{localizedTexts.annualCabonReduction[0]}</CO2SubText>
        </SavedContainer>
      </CO2BigContainer>
    );
  }
}

export default CarbonWidgetContent;
