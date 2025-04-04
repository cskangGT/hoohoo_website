import React from 'react';
import {FaTimes} from 'react-icons/fa';
import {FaPencil} from 'react-icons/fa6';
import styled, {css} from 'styled-components';
import {theme} from '../../../style';
import {
  ProfileEMWidgetType,
  ProfileWidgetItemSize,
  ProfileWidgetItemType,
} from '../types/WidgetItemType';
import {getEMWidgetData} from '../util/EMWidgetData';
import {getTextColorWcag} from '../util/util';
import AchievementWidgetContent from './AchievementWidgetContent';
import CarbonWidgetContent from './CarbonWidgetContent';
import GalleryWidgetContent from './GalleryWidgetContent';
import LeaderboardWidgetContent from './LeaderboardWidgetContent';
import TemplateWidgetContent from './TemplateWidgetContent';

const WIDTH = window.innerWidth > 600 ? 600 : window.innerWidth;

// const getTextColor = (bgColor: string) => {
//   const hex = bgColor.replace('#', '');
//   const r = parseInt(hex.substring(0, 2), 16);
//   const g = parseInt(hex.substring(2, 4), 16);
//   const b = parseInt(hex.substring(4, 6), 16);
//   const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//   return brightness > 128 ? '#000000' : '#FFFFFF';
// };

// Grid Layout
const CONTAINER_GAP = 24;
const PADDING_WIDTH = WIDTH * 0.06;
const CELL_CONTAINER_WIDTH = WIDTH - 2 * PADDING_WIDTH - 4;
const CELL_SIZE =
  ((CELL_CONTAINER_WIDTH - CONTAINER_GAP) / 2 - CONTAINER_GAP * 2) / 3;
const ITEM_WIDTH = CELL_SIZE * 3 + CONTAINER_GAP * 2;
const ITEM_HEIGHT = CELL_SIZE - 2;
const LONG_ITEM_WIDTH = CELL_CONTAINER_WIDTH;
const BIG_ITEM_HEIGHT = ITEM_WIDTH; //adding border width

const WidgetItemContainer = styled.div<{
  $size: ProfileWidgetItemSize;
  $bgColor?: string;
  $hasBorder?: boolean;
  $isClickable?: boolean;
  $isEditMode?: boolean;
}>`
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${props =>
    props.$bgColor === 'transparent' ? theme.darkGray : props.$bgColor};
  border: ${props =>
    props.$hasBorder ? `1px solid ${theme.mainNeon}` : '1px solid transparent'};
  ${props =>
    props.$isClickable &&
    css`
      cursor: pointer;
    `}
  ${props =>
    props.$isEditMode &&
    css`
      cursor: grab;
    `}
  ${props => {
    switch (props.$size) {
      case 'SMALL':
        return `
            width: ${ITEM_WIDTH}px;
            height: ${ITEM_HEIGHT}px;
            border-radius: 10px;
          `;
      case 'LONG':
        return `
            width: ${LONG_ITEM_WIDTH}px;
            height: ${ITEM_HEIGHT}px;
            border-radius: 10px;
            
          `;
      case 'BIG':
        return `
            width: ${ITEM_WIDTH}px;
            height: ${BIG_ITEM_HEIGHT}px;
            border-radius: 10px;
          `;

      default:
        return '';
    }
  }}
`;
const WidgetAppNavImage = styled.img<{
  smallImage: boolean;
  isLongItem: boolean;
}>`
  width: ${props =>
    props.smallImage ? ITEM_HEIGHT * 0.6 : ITEM_WIDTH * 0.55}px;
  height: ${props =>
    props.smallImage ? ITEM_HEIGHT * 0.6 : ITEM_WIDTH * 0.55}px;
  object-fit: contain;
  ${props =>
    props.isLongItem &&
    css`
      position: absolute;
      left: ${theme.spacing.lg};
    `}
`;
const WidgetAppNavImageContainer = styled.div<{
  smallImage: boolean;
  isLongItem: boolean;
}>`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${props =>
    !props.isLongItem && props.smallImage ? 'flex-start' : 'center'};
  gap: ${theme.spacing.rg};
  flex-direction: ${props => (props.smallImage ? 'row' : 'column')};
  margin-left: ${props =>
    !props.isLongItem && props.smallImage ? theme.spacing.lg : '0px'};
`;

const WidgetAppNavImageText = styled.p<{
  smallImage: boolean;
  isLongItem: boolean;
}>`
  text-align: center;
  font-size: ${props =>
    props.smallImage ? theme.fontSize.lg : theme.fontSize.lg};
  letter-spacing: 0.05rem;
  color: ${theme.white};
  font-weight: 600;
  margin: 0px;
  ${props =>
    props.smallImage &&
    !props.isLongItem &&
    css`
      width: calc(100% - ${theme.spacing.lg});
      padding-right: ${theme.spacing.lg};
    `}
`;

const WidgetContent = styled.div<{
  textColor?: string;
  size: ProfileWidgetItemSize;
  $isEditMode?: boolean;
}>`
  text-align: center;
  padding: ${props => (props.$isEditMode ? '30px' : '10px')};
  width: calc(100% - ${props => (props.$isEditMode ? '60px' : '20px')});
  height: calc(100% - ${props => (props.$isEditMode ? '60px' : '20px')});

  flex-direction: column;
  position: relative;

  color: ${props => props.textColor || 'white'};
  margin: auto;
  border-radius: 10px;

  font-size: ${props =>
    props.size === 'BIG' ? theme.fontSize.lg : theme.fontSize.rg};
  overflow: hidden;
`;
const WidgetTextContentContainer = styled.div<{
  $isEditMode?: boolean;
}>`
  padding: ${props => (props.$isEditMode ? '30px' : '10px')};
  width: calc(100% - ${props => (props.$isEditMode ? '60px' : '20px')});
  height: calc(100% - ${props => (props.$isEditMode ? '60px' : '20px')});
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WidgetTextContent = styled.p<{size: ProfileWidgetItemSize}>`
  margin: 0px;
  height: auto;
  text-align: center;
  overflow: hidden;
  display: -webkit-box;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: normal;
  font-size: ${theme.fontSize.xl};
  -webkit-line-clamp: ${props => (props.size === 'BIG' ? 6 : 2)};
  -webkit-box-orient: vertical;
  @media screen and (max-width: 600px) {
    font-size: ${theme.fontSize.lg};
    -webkit-line-clamp: ${props => (props.size === 'BIG' ? 5 : 1)};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.rg};
  }
`;
const WidgetImage = styled.img`
  width: calc(100%);
  height: calc(100%);
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  object-fit: cover;
`;

const WidgetLink = styled.a`
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EditButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  cursor: pointer; /* 커서 스타일 추가 */
  padding: 0; /* 패딩 제거 */
  position: relative; /* 위치 설정 */
  z-index: 103; /* z-index 낮추기 */
  outline: none; /* 포커스 아웃라인 제거 */
`;
const ItemHolderBox = styled.div`
  position: absolute;
  left: 10px;
  background-color: transparent;
`;
const EditBox = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #ffffff3e;
  backdrop-filter: blur(4px);
  border-radius: 6px;

  padding: 6px 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
`;
const Divider = styled.div`
  width: 1px;
  height: 16px;
  background-color: rgba(255, 255, 255, 0.2); // 반투명 흰색
  margin: 0 6px; // 좌우 여백 추가
`;
const DeleteButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
  padding: 0px;
  z-index: 1;
`;

type WidgetItemProps = {
  widget: ProfileWidgetItemType | ProfileWidgetItemType[];
  isEditMode?: boolean;
  onDeleteWidget?: (item: ProfileWidgetItemType) => void;
  onEditWidget?: (item: ProfileWidgetItemType) => void;
  userInfo?: {
    userId: string;
    name: string;
    profileImage: string;
  };
};
const NavigateLink = (
  type: ProfileEMWidgetType,
  userInfo: {userId: string; name: string; profileImage: string},
) => {
  const emWidgetData = getEMWidgetData();
  switch (type) {
    case ProfileEMWidgetType.CO2Saved:
      return emWidgetData[type].link + '?userId=' + userInfo.userId;
    case ProfileEMWidgetType.MyItems:
      return emWidgetData[type].link + '?userId=' + userInfo.userId;
    case ProfileEMWidgetType.Achievement:
      return (
        emWidgetData[type].link +
        '?userId=' +
        userInfo.userId +
        '&name=' +
        userInfo.name +
        '&profileImage=' +
        userInfo.profileImage
      );
    case ProfileEMWidgetType.Leaderboard:
      return emWidgetData[type].link + '?userId=' + userInfo.userId;
    case ProfileEMWidgetType.Groups:
      return emWidgetData[type].link + '?userId=' + userInfo.userId;
    case ProfileEMWidgetType.MyStore:
      return emWidgetData[type].link + '?userId=' + userInfo.userId;
    case ProfileEMWidgetType.MyGallery:
      return (
        emWidgetData[type].link + '?userId=' + userInfo.userId + '&initTab=2'
      );
    default:
      return '';
  }
};

function EMWidgetContent({
  widgetItem,
  userInfo,
}: {
  widgetItem: ProfileWidgetItemType;
  userInfo?: {userId: string; name: string; profileImage: string};
}) {
  const emWidgetData = getEMWidgetData();
  const isSmallImage = widgetItem.sizeType !== 'BIG';
  const isLongItem = widgetItem.sizeType === 'LONG';

  const link =
    userInfo && widgetItem.emWidgetType
      ? NavigateLink(widgetItem.emWidgetType as ProfileEMWidgetType, userInfo)
      : '';

  if (widgetItem.emWidgetType === ProfileEMWidgetType.CO2Saved) {
    return (
      <WidgetLink href={link} target="_blank" rel="appopener">
        <CarbonWidgetContent
          width={ITEM_WIDTH}
          sizeType={widgetItem.sizeType}
          annualEcoActionCount={
            widgetItem.widgetData?.annualEcoActionCount || 0
          }
          annualCarbonReduction={
            widgetItem.widgetData?.annualCarbonReduction || 0
          }
          treeEffect={widgetItem.widgetData?.treeEffect || 0}
        />
      </WidgetLink>
    );
    // CO2Saved 위젯 구현
  } else if (widgetItem.emWidgetType === ProfileEMWidgetType.Achievement) {
    return (
      <WidgetLink href={link} target="_blank" rel="appopener">
        <AchievementWidgetContent
          width={ITEM_WIDTH}
          sizeType={widgetItem.sizeType}
          level={widgetItem.widgetData?.level || 0}
          numBadges={widgetItem.widgetData?.numBadges || 0}
          numMedals={widgetItem.widgetData?.numMedals || 0}
          equippedMedals={widgetItem.widgetData?.equippedMedals || []}
          equippedBadge={widgetItem.widgetData?.equippedBadge || ''}
        />
      </WidgetLink>
    );
  } else if (widgetItem.emWidgetType === ProfileEMWidgetType.Leaderboard) {
    return (
      <WidgetLink href={link} target="_blank" rel="appopener">
        <LeaderboardWidgetContent
          width={ITEM_WIDTH}
          sizeType={widgetItem.sizeType}
          ecoActionCount={widgetItem.widgetData?.ecoActionCount || 0}
          higherRankInfo={
            widgetItem.widgetData?.higherRankInfo || {
              gap: 0,
              ecoActionCount: 0,
            }
          }
          lowerRankInfo={
            widgetItem.widgetData?.lowerRankInfo || {
              gap: 0,
              ecoActionCount: 0,
            }
          }
          lastMonthRank={widgetItem.widgetData?.lastMonthRank || 0}
          userRank={widgetItem.widgetData?.userRank || 0}
        />
      </WidgetLink>
    );
  } else if (widgetItem.emWidgetType === ProfileEMWidgetType.MyGallery) {
    return (
      <WidgetLink href={link} target="_blank" rel="appopener">
        <GalleryWidgetContent
          width={ITEM_WIDTH}
          cellHeight={ITEM_HEIGHT}
          sizeType={widgetItem.sizeType}
          thumbnails={widgetItem.widgetData?.thumbnails || []}
        />
      </WidgetLink>
    );
  } else {
    return (
      <WidgetLink href={link} target="_blank" rel="appopener">
        <WidgetAppNavImageContainer
          smallImage={isSmallImage}
          isLongItem={isLongItem}>
          <WidgetAppNavImage
            smallImage={isSmallImage}
            isLongItem={isLongItem}
            src={
              emWidgetData[widgetItem?.emWidgetType as ProfileEMWidgetType]
                .image
            }
          />
          <WidgetAppNavImageText
            smallImage={isSmallImage}
            isLongItem={isLongItem}>
            {
              emWidgetData[widgetItem?.emWidgetType as ProfileEMWidgetType]
                .title
            }
          </WidgetAppNavImageText>
        </WidgetAppNavImageContainer>
      </WidgetLink>
    );
  }
}

function WidgetItem({
  widget,
  isEditMode = false,
  onDeleteWidget,
  onEditWidget,
  userInfo,
}: WidgetItemProps) {
  const widgetItem = widget as ProfileWidgetItemType;
  const isTemp = widgetItem.isTemp;
  const hasEMWidgetType =
    (widgetItem as ProfileWidgetItemType).isEmWidget &&
    !!(widgetItem as ProfileWidgetItemType).emWidgetType;
  const hasLink = !!widgetItem?.linkUrl;
  const isClickable = isEditMode ? false : hasLink || hasEMWidgetType;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (onEditWidget) {
      onEditWidget(widgetItem);
    }
  };

  if (isTemp) {
    return (
      <WidgetItemContainer
        key={(widgetItem.isEmWidget ? 'em_' : 'custom_') + widgetItem.id}
        $size={widgetItem.sizeType}
        $isEditMode={isEditMode}
        $hasBorder={widgetItem?.hasBorder}
        $bgColor={
          hasEMWidgetType
            ? '#858585'
            : widgetItem.bgType === 'COLOR'
              ? widgetItem.bgColor
              : '#858585'
        }
        $isClickable={false}>
        <TemplateWidgetContent widgetItem={widgetItem} />
        {isEditMode && (
          <EditBox>
            <EditButton className="widget-button" onClick={handleEditClick}>
              <FaPencil size={14} color="white" />
            </EditButton>
            <Divider />

            <DeleteButton
              className="widget-button"
              onClick={() => onDeleteWidget && onDeleteWidget(widgetItem)}>
              <FaTimes size={16} color="white" />
            </DeleteButton>
          </EditBox>
        )}
      </WidgetItemContainer>
    );
  }

  const textColor =
    widgetItem.bgType === 'COLOR' && widgetItem.bgColor
      ? getTextColorWcag(widgetItem.bgColor)
      : 'white';

  const content =
    widgetItem.bgType === 'IMAGE' ? (
      <WidgetContent
        style={{color: textColor}}
        size={widgetItem.sizeType}
        $isEditMode={isEditMode}>
        <WidgetImage src={widgetItem.bgImageUrl} />
      </WidgetContent>
    ) : (
      <WidgetTextContentContainer $isEditMode={isEditMode}>
        <WidgetTextContent
          style={{color: textColor}}
          size={widgetItem.sizeType}>
          {widgetItem.description}
        </WidgetTextContent>
      </WidgetTextContentContainer>
    );

  return (
    <WidgetItemContainer
      key={(widgetItem.isEmWidget ? 'em_' : 'custom_') + widgetItem.id}
      $size={widgetItem.sizeType}
      $isEditMode={isEditMode}
      $hasBorder={widgetItem?.hasBorder}
      $bgColor={
        hasEMWidgetType
          ? '#383838'
          : widgetItem.bgType === 'COLOR'
            ? widgetItem.bgColor
            : 'transparent'
      }
      $isClickable={isClickable}>
      {widgetItem.isEmWidget && hasEMWidgetType ? (
        <EMWidgetContent widgetItem={widgetItem} userInfo={userInfo} />
      ) : isClickable ? (
        <WidgetLink
          href={widgetItem.linkUrl}
          target="_blank"
          rel="noopener noreferrer">
          {content}
        </WidgetLink>
      ) : (
        content
      )}

      {isEditMode && (
        <>
          {/* <ItemHolderBox>
            <PiDotsSixVerticalBold size={20} color="white" />
          </ItemHolderBox> */}
          <EditBox>
            <EditButton className="widget-button" onClick={handleEditClick}>
              <FaPencil size={14} color="white" />
            </EditButton>
            <Divider />

            <DeleteButton
              className="widget-button"
              onClick={() => onDeleteWidget && onDeleteWidget(widgetItem)}>
              <FaTimes size={16} color="white" />
            </DeleteButton>
          </EditBox>
        </>
      )}
    </WidgetItemContainer>
  );
}

export default WidgetItem;
