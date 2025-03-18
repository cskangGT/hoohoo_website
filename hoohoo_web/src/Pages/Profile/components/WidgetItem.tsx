import React from 'react';
import {FaTimes} from 'react-icons/fa';
import {FaPencil} from 'react-icons/fa6';
import {PiDotsSixVerticalBold} from 'react-icons/pi';
import styled, {css} from 'styled-components';
import {theme} from '../../../style';
import {
  ProfileWidgetItemSize,
  ProfileWidgetItemType,
  ProfileWidgetTypeEnum,
} from '../types/WidgetItemType';

const WIDTH = window.innerWidth > 600 ? 600 : window.innerWidth;

const getTextColor = (bgColor: string) => {
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

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
            border-radius: 30px;
          `;
      case 'LONG':
        return `
            width: ${LONG_ITEM_WIDTH}px;
            height: ${ITEM_HEIGHT}px;
            border-radius: 30px;
            
          `;
      case 'BIG':
        return `
            width: ${ITEM_WIDTH}px;
            height: ${BIG_ITEM_HEIGHT}px;
            border-radius: 30px;
          `;

      default:
        return '';
    }
  }}
`;
const WidgetAppNavImage = styled.img`
  width: ${ITEM_WIDTH * 0.625}px;
  height: ${ITEM_WIDTH * 0.625}px;
  object-fit: contain;
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
  border-radius: 30px;

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
  font-size: ${theme.fontSize.md};
  -webkit-line-clamp: ${props => (props.size === 'BIG' ? 6 : 2)};
  -webkit-box-orient: vertical;
  @media screen and (max-width: 600px) {
    font-size: ${theme.fontSize.rg};
    -webkit-line-clamp: ${props => (props.size === 'BIG' ? 5 : 1)};
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
  onDeleteWidget?: (id: number) => void;
  onEditWidget?: (item: ProfileWidgetItemType) => void;
};

function WidgetItem({
  widget,
  isEditMode = false,
  onDeleteWidget,
  onEditWidget,
}: WidgetItemProps) {
  const widgetItem = widget as ProfileWidgetItemType;
  const hasNavType = !!(widgetItem as ProfileWidgetItemType).type;
  const hasLink = !!widgetItem?.linkUrl;
  const isClickable = isEditMode ? false : hasLink || hasNavType;

  const textColor =
    widgetItem.bgType === 'COLOR' && widgetItem.bgColor
      ? getTextColor(widgetItem.bgColor)
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
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    console.log('Edit button clicked', widgetItem);
    if (onEditWidget) {
      onEditWidget(widgetItem);
    }
  };
  return (
    <WidgetItemContainer
      key={widgetItem.id}
      $size={widgetItem.sizeType}
      $isEditMode={isEditMode}
      $hasBorder={widgetItem?.hasBorder}
      $bgColor={
        widgetItem.bgType === 'COLOR' ? widgetItem.bgColor : 'transparent'
      }
      $isClickable={isClickable}>
      {hasNavType ? (
        <WidgetLink target="_blank" rel="appopener">
          <WidgetAppNavImage
            src={
              widgetItem.type === ProfileWidgetTypeEnum.AppGroup
                ? '/Images/profile_widget_people.png'
                : widgetItem.type === ProfileWidgetTypeEnum.AppRank
                  ? '/Images/profile_widget_trophy.png'
                  : widgetItem.type === ProfileWidgetTypeEnum.AppRecycle
                    ? '/Images/profile_widget_recycle.png'
                    : widgetItem.type === ProfileWidgetTypeEnum.AppShop
                      ? '/Images/profile_widget_shop.png'
                      : ''
            }
          />
        </WidgetLink>
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
          <ItemHolderBox>
            <PiDotsSixVerticalBold size={20} color="white" />
          </ItemHolderBox>
          <EditBox>
            <DeleteButton
              className="widget-button"
              onClick={() => onDeleteWidget && onDeleteWidget(widgetItem.id)}>
              <FaTimes size={16} color="white" />
            </DeleteButton>
            <Divider />
            <EditButton className="widget-button" onClick={handleEditClick}>
              <FaPencil size={14} color="white" />
            </EditButton>
          </EditBox>
        </>
      )}
    </WidgetItemContainer>
  );
}

export default WidgetItem;
