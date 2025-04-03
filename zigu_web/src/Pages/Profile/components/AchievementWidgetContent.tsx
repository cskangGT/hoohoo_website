import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../../style';
import {MedalType, ProfileWidgetItemSize} from '../types/WidgetItemType';
import {getBadgeList, getMedalList} from '../util/EMWidgetData';
const AchievementContainer = styled.div<{$small?: boolean; $long?: boolean}>`
  display: flex;
  width: calc(100% - ${props => (props.$small ? '12px' : '32px')});
  height: calc(100% - ${props => (props.$small ? '8px' : '24px')});

  border-radius: 12px;
  padding: ${props => (props.$small ? '4px 6px' : '12px 16px')};
  align-items: center;

  ${props =>
    props.$long &&
    `
    justify-content: space-between;
  `}

  ${props =>
    props.$small &&
    `
    flex-direction: row;
    justify-content: flex-start;
  `}
`;

const AchievementBigContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 32px);
  height: calc(100% - 32px);
  border-radius: 12px;
  padding: 16px;
`;

const LevelText = styled.div<{$small?: boolean}>`
  font-size: ${props =>
    props.$small ? theme.fontSize.xl : theme.fontSize['2xl']};
  font-weight: 600;
  padding-left: 10px;
  font-family: Inter;
  color: #ffffff;
  margin-right: ${props => (props.$small ? '10px' : '0')};
  @media (max-width: 600px) {
    font-size: ${theme.fontSize.lg};
  }
  @media (max-width: 500px) {
    font-size: ${theme.fontSize.rg};
  }
`;

const BadgesContainer = styled.div<{$small?: boolean}>`
  display: flex;
  align-items: center;
  gap: ${props => (props.$small ? '4px' : '8px')};
`;
const MedalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #4d4d4d;
  border-radius: 12px;
  gap: 8px;
  padding: 6px;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));
  @media (max-width: 600px) {
    padding: 4px;
    gap: 4px;
    border-radius: 8px;
  }
  @media (max-width: 500px) {
    padding: 2px;
    gap: 2px;
    border-radius: 4px;
  }
`;
const BadgeIcon = styled.img<{
  $small?: boolean;
  width: number;
  $active?: boolean;
}>`
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));

  width: ${props => props.width * 0.12}px;
  height: ${props => props.width * 0.12}px;
`;

const BadgeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));
`;

const MedalSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));
`;

const MedalsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #4d4d4d;
  border-radius: 4px;
  padding: 2px 2px;
`;

const BadgeCountText = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const BadgeLabel = styled.span`
  font-size: ${theme.fontSize.md};
  color: #ffffff;
  @media (max-width: 600px) {
    font-size: ${theme.fontSize.rg};
  }
  @media (max-width: 500px) {
    font-size: ${theme.fontSize.sm};
  }
`;

const BadgeCount = styled.span`
  font-size: ${theme.fontSize.md};
  font-weight: bold;
  color: #7ed957;
  @media (max-width: 600px) {
    font-size: ${theme.fontSize.rg};
  }
  @media (max-width: 500px) {
    font-size: ${theme.fontSize.sm};
  }
`;

const AchievementHeader = styled.div`
  font-size: ${theme.fontSize['2xl']};
  font-weight: 600;
  font-family: Inter;
  color: #ffffff;
  margin-bottom: ${theme.spacing.sm};
  text-align: center;
  margin-bottom: 12px;
  @media (max-width: 600px) {
    font-size: ${theme.fontSize.xl};
    margin-bottom: 6px;
  }
  @media (max-width: 500px) {
    font-size: ${theme.fontSize.lg};
    margin-bottom: 6px;
  }
`;

const BadgeBigSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));
  justify-content: center;
  column-gap: 8px;
  background-color: #4d4d4d;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 12px;
  box-shadow: 0 0 10px 0 #383838;
  @media (max-width: 600px) {
    padding: 6px;
    border-radius: 10px;
  }
  @media (max-width: 500px) {
    padding: 4px;
    border-radius: 6px;
  }
  @media (max-width: 400px) {
    padding: 4px;
    border-radius: 6px;
  }
`;

const BadgeBigIcon = styled.img<{width: number}>`
  height: ${props => props.width * 0.2}px;
  width: ${props => props.width * 0.2}px;
  object-fit: contain;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));

  @media (max-width: 600px) {
    height: ${props => props.width * 0.2}px;
    width: ${props => props.width * 0.2}px;
  }
  @media (max-width: 500px) {
    height: ${props => props.width * 0.18}px;
    width: ${props => props.width * 0.18}px;
  }
`;
const BadgeName = styled.div`
  font-size: ${theme.fontSize.md};
  text-align: center;
  color: #ffffff;
  @media (max-width: 600px) {
    font-size: ${theme.fontSize.rg};
  }
  @media (max-width: 500px) {
    font-size: ${theme.fontSize.sm};
  }
`;

const MedalsBigSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #4d4d4d;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));
  border-radius: 12px;
  box-shadow: 0 0 10px 0 #383838;
  padding: 6px;
  @media (max-width: 600px) {
    border-radius: 10px;
  }
  @media (max-width: 500px) {
    border-radius: 4px;
  }
`;

type AchievementWidgetContentProps = {
  sizeType: ProfileWidgetItemSize;
  width: number;
  level: number;
  numBadges: number;
  numMedals: number;
  equippedBadge: string;
  equippedMedals: MedalType[];
};
function AchievementWidgetContent({
  width,
  sizeType,
  level,
  numBadges,
  numMedals,
  equippedMedals,
  equippedBadge,
}: AchievementWidgetContentProps) {
  const localizedTexts: any = i18next.t('AchievementWidgetContent', {
    returnObjects: true,
  });
  const badgeList = getBadgeList();
  const medalList = getMedalList();
  if (sizeType === 'SMALL') {
    // 작은 사이즈 (왼쪽 이미지)
    return (
      <AchievementContainer $small>
        <LevelText $small>Lv.{level}</LevelText>
        <BadgesContainer $small>
          <MedalContainer>
            {equippedBadge && (
              <BadgeIcon
                width={width}
                src={badgeList[equippedBadge].image}
                $small
                $active
              />
            )}
          </MedalContainer>
          <MedalContainer>
            {equippedMedals.map((medal: MedalType) => (
              <BadgeIcon
                key={medal.medalTitle}
                width={width}
                src={medalList[medal.medalTitle].image[medal.medalLevel]}
                $small
              />
            ))}
          </MedalContainer>
        </BadgesContainer>
      </AchievementContainer>
    );
  } else if (sizeType === 'LONG') {
    // 긴 사이즈 (중간 이미지들)
    return (
      <AchievementContainer $long>
        <LevelText>Lv.{level}</LevelText>
        <BadgeSection>
          <MedalContainer>
            {equippedBadge && (
              <BadgeIcon
                width={width}
                src={badgeList[equippedBadge].image}
                $active
              />
            )}
          </MedalContainer>
          <BadgeCountText>
            <BadgeLabel>{localizedTexts.badge}</BadgeLabel>
            <BadgeCount>{numBadges}</BadgeCount>
          </BadgeCountText>
        </BadgeSection>
        <MedalSection>
          <MedalsRow>
            {equippedMedals.map((medal: MedalType) => (
              <BadgeIcon
                key={medal.medalTitle}
                width={width}
                src={medalList[medal.medalTitle].image[medal.medalLevel]}
                $small
              />
            ))}
          </MedalsRow>
          <BadgeCountText>
            <BadgeLabel>{localizedTexts.medal}</BadgeLabel>
            <BadgeCount>{numMedals}</BadgeCount>
          </BadgeCountText>
        </MedalSection>
      </AchievementContainer>
    );
  } else {
    // 큰 사이즈 (오른쪽 이미지)
    return (
      <AchievementBigContainer>
        <AchievementHeader>Level {level}</AchievementHeader>
        <BadgeBigSection>
          {equippedBadge && (
            <>
              <BadgeBigIcon
                width={width}
                src={badgeList[equippedBadge].image}
              />
              <BadgeName>{badgeList[equippedBadge].title}</BadgeName>
            </>
          )}
        </BadgeBigSection>
        <MedalsBigSection>
          {equippedMedals.map((medal: MedalType) => (
            <BadgeBigIcon
              key={medal.medalTitle}
              width={width}
              src={medalList[medal.medalTitle].image[medal.medalLevel]}
            />
          ))}
        </MedalsBigSection>
      </AchievementBigContainer>
    );
  }
}

export default AchievementWidgetContent;
