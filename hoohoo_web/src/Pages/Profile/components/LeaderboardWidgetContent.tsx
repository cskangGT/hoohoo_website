import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../../style';
import {ProfileWidgetItemSize} from '../types/WidgetItemType';
import {getOrdinalSuffix} from '../util/util';
const LeaderboardContainer = styled.div<{small?: boolean; long?: boolean}>`
  display: flex;
  align-items: center;
  font-family: Inter;
  width: calc(100% - ${props => (props.small ? '24px' : '32px')});
  height: calc(100% - ${props => (props.small ? '16px' : '20px')});

  border-radius: 12px;
  padding: ${props => (props.small ? '8px 12px' : '10px 16px')};

  ${props =>
    props.long &&
    `
    gap: 12px;
    justify-content: space-between;
  `}

  ${props =>
    props.small &&
    `
    justify-content: space-between;
  `}
`;

const LeaderboardBigContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 40px);
  height: calc(100% - 40px);

  border-radius: 12px;
  padding: 20px;
  @media (max-width: 600px) {
    padding: 16px;
    width: calc(100% - 32px);
    height: calc(100% - 32px);
  }
  @media (max-width: 400px) {
    padding: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
  }
`;

const RankNumberContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: 16px;
`;

const RankNumber = styled.span`
  font-size: ${theme.fontSize['3xl']};
  font-weight: bold;
  color: #ffffff;
  font-family: 'Inter';
  @media (max-width: 600px) {
    font-size: ${theme.fontSize['2xl']};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize['xl']};
  }
`;

const RankSuffix = styled.span`
  font-size: ${theme.fontSize['2xl']};
  color: #ffffff;
  margin-left: 2px;
  @media (max-width: 600px) {
    font-size: ${theme.fontSize['xl']};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize['lg']};
  }
`;

const ScoreContainer = styled.div<{large?: boolean}>`
  ${props =>
    props.large &&
    `
    margin-left: auto;
    margin-right: 16px;
  `}
`;

const Score = styled.span`
  font-size: ${theme.fontSize['2xl']};
  font-weight: bold;
  color: ${theme.mainNeon};
  @media (max-width: 600px) {
    font-size: ${theme.fontSize['xl']};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize['lg']};
  }
`;

const RankChangesContainer = styled.div<{horizontal?: boolean}>`
  display: flex;
  flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
  gap: 4px;
  margin-right: 16px;

  ${props =>
    props.horizontal &&
    `
    gap: 12px;
  `}
`;
const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
const VerticalView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;
const RankUp = styled.div<{big?: boolean}>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${props => (props.big ? '18px' : '14px')};
  font-weight: bold;
  color: #fdb52f;

  ${props =>
    props.big &&
    `
    background-color: rgba(253, 181, 47, 0.2);
    padding: 10px;
    border-radius: 8px;
    width: calc(100% - 20px);
    justify-content: space-between;
  `}
  @media (max-width: 600px) {
    font-size: ${theme.fontSize.rg};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.sm};
    border-radius: 16px;
  }
`;

const RankDown = styled.div<{big?: boolean}>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${props => (props.big ? '18px' : '14px')};
  font-weight: bold;
  color: #28afe2;

  ${props =>
    props.big &&
    `
    background-color: #28b0e287;
    padding: 10px;
    border-radius: 8px;
    width: calc(100% - 20px);
    justify-content: space-between;
  `}
  @media (max-width: 600px) {
    font-size: ${theme.fontSize.rg};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.sm};
    border-radius: 16px;
  }
`;

const TriangleUp = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 8px solid #fdb52f;
  @media (max-width: 600px) {
    border-bottom: 6px solid #fdb52f;
  }
  @media (max-width: 400px) {
    border-bottom: 4px solid #fdb52f;
  }
`;

const TriangleDown = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid #3cacff;
  @media (max-width: 600px) {
    border-top: 6px solid #3cacff;
  }
  @media (max-width: 400px) {
    border-top: 4px solid #3cacff;
  }
`;

const PreviousRankText = styled.div`
  font-size: ${theme.fontSize.lg};
  color: #ffffff;

  span {
    font-weight: 500;
    font-size: ${theme.fontSize['xl']};
  }
`;

const CurrentRankSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #38cf21;
  border-radius: 8px;
  padding: 10px;
  width: calc(100% - 20px);
  @media (max-width: 600px) {
    padding: 6px 8px;
    width: calc(100% - 16px);
  }
  @media (max-width: 400px) {
    padding: 4px 8px;
    width: calc(100% - 16px);
    border-radius: 12px;
  }
`;

const RankNumberLarge = styled.div`
  font-size: ${theme.fontSize['5xl']};
  font-weight: bold;
  color: #ffffff;
  line-height: 1;
  font-family: 'Inter';

  display: flex;
  align-items: baseline;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));
  @media (max-width: 600px) {
    font-size: ${theme.fontSize['3xl']};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize['2xl']};
  }
`;

const RankSuffixLarge = styled.span`
  font-size: ${theme.fontSize.xl};
  margin-left: 4px;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));
  @media (max-width: 600px) {
    font-size: ${theme.fontSize.xl};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.xl};
  }
`;

const CurrentRankText = styled.div`
  font-size: 12px;
  color: ${theme.darkGray};
  margin: 4px 0;
  font-family: 'Inter';
  text-align: right;
  span {
    font-weight: 500;
    font-size: 14px;
  }
  @media (max-width: 600px) {
    font-size: 10px;
    span {
      font-size: 12px;
    }
  }
  @media (max-width: 400px) {
    font-size: 8px;
    span {
      font-size: 10px;
    }
  }
`;

const CurrentRankScore = styled.div`
  font-size: ${theme.fontSize['2xl']};
  font-weight: bold;
  color: #ffffff;
  font-family: 'Inter';
  @media (max-width: 600px) {
    font-size: ${theme.fontSize['2xl']};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.lg};
  }
`;

const UpDownSection = styled.div`
  width: 100%;
`;

const RankUpScore = styled.span`
  font-size: ${theme.fontSize.md};
  color: #fdb52f;
  @media (max-width: 600px) {
    font-size: ${theme.fontSize.rg};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.sm};
  }
`;

const RankDownScore = styled.span`
  font-size: ${theme.fontSize.md};
  color: #3cacff;
  @media (max-width: 600px) {
    font-size: ${theme.fontSize.rg};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.sm};
  }
`;
type LeaderboardWidgetContentProps = {
  sizeType: ProfileWidgetItemSize;
  ecoActionCount: number;
  higherRankInfo: {
    gap: number;
    ecoActionCount: number;
  };
  lowerRankInfo: {
    gap: number;
    ecoActionCount: number;
  };
  lastMonthRank: number;
  userRank: number;
  width: number;
};
function LeaderboardWidgetContent({
  width,
  sizeType,
  ecoActionCount,
  higherRankInfo,
  lowerRankInfo,
  lastMonthRank,
  userRank,
}: LeaderboardWidgetContentProps) {
  const localizedTexts: any = i18next.t('LeaderboardWidgetContent', {
    returnObjects: true,
  });
  if (sizeType === 'SMALL') {
    // 작은 사이즈 (왼쪽 이미지)
    return (
      <LeaderboardContainer small>
        <RankNumberContainer>
          <RankNumber>{userRank}</RankNumber>
          <RankSuffix>{getOrdinalSuffix(userRank)}</RankSuffix>
        </RankNumberContainer>
        <ScoreContainer>
          <Score>{ecoActionCount}</Score>
        </ScoreContainer>
        <RankChangesContainer>
          <RankUp>
            <TriangleUp />
            <span>{higherRankInfo.gap}</span>
          </RankUp>
          <RankDown>
            <TriangleDown />
            <span>{lowerRankInfo.gap}</span>
          </RankDown>
        </RankChangesContainer>
      </LeaderboardContainer>
    );
  } else if (sizeType === 'LONG') {
    // 긴 사이즈 (중간 이미지)
    return (
      <LeaderboardContainer long>
        <RankNumberContainer>
          <RankNumber>{userRank}</RankNumber>
          <RankSuffix>{getOrdinalSuffix(userRank)}</RankSuffix>
        </RankNumberContainer>
        <PreviousRankText>
          {localizedTexts.lastMonthRank[0]}
          <span>{lastMonthRank}</span>
          {getOrdinalSuffix(lastMonthRank)}
        </PreviousRankText>
        <ScoreContainer large>
          <Score>{ecoActionCount}</Score>
        </ScoreContainer>
        <RankChangesContainer horizontal>
          <RankUp>
            <TriangleUp />
            <span>{higherRankInfo.gap}</span>
          </RankUp>
          <RankDown>
            <TriangleDown />
            <span>{lowerRankInfo.gap}</span>
          </RankDown>
        </RankChangesContainer>
      </LeaderboardContainer>
    );
  } else {
    // 큰 사이즈 (오른쪽 이미지)
    return (
      <LeaderboardBigContainer>
        <UpDownSection>
          <RankUp big>
            <ArrowContainer>
              <TriangleUp />
              <span>{higherRankInfo.gap}</span>
            </ArrowContainer>
            <RankUpScore>{higherRankInfo.ecoActionCount}</RankUpScore>
          </RankUp>
        </UpDownSection>

        <CurrentRankSection>
          <RankNumberLarge>
            {userRank}
            <RankSuffixLarge>{getOrdinalSuffix(userRank)}</RankSuffixLarge>
          </RankNumberLarge>
          <VerticalView>
            <CurrentRankText>
              {localizedTexts.lastMonthRank[0]}
              <span>{lastMonthRank}</span>
              {getOrdinalSuffix(lastMonthRank)}
            </CurrentRankText>
            <CurrentRankScore>{ecoActionCount}</CurrentRankScore>
          </VerticalView>
        </CurrentRankSection>

        <UpDownSection>
          <RankDown big>
            <ArrowContainer>
              <TriangleDown />
              <span>{lowerRankInfo.gap}</span>
            </ArrowContainer>
            <RankDownScore>{lowerRankInfo.ecoActionCount}</RankDownScore>
          </RankDown>
        </UpDownSection>
      </LeaderboardBigContainer>
    );
  }
}

export default LeaderboardWidgetContent;
