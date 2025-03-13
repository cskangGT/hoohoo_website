import React from 'react';
import styled, {css} from 'styled-components';
import {theme} from '../../../style';

import {
  ProfileWidgetItemSize,
  ProfileWidgetItemType,
  ProfileWidgetTypeEnum,
} from '../types/WidgetItemType';
const WIDTH = window.innerWidth > 600 ? 600 : window.innerWidth;

const getTextColor = (bgColor: string) => {
  // 16진수 색상 코드를 RGB로 변환
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 색상의 밝기 계산 (YIQ 공식 사용)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // 밝기가 128보다 크면 어두운 텍스트, 작으면 밝은 텍스트
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

const CONTAINER_GAP = 24;
const PADDING_WIDTH = WIDTH * 0.06;
const CELL_CONTAINER_WIDTH = WIDTH - 2 * PADDING_WIDTH;
const CELL_SIZE =
  ((CELL_CONTAINER_WIDTH - CONTAINER_GAP) / 2 - CONTAINER_GAP * 2) / 3;
const ITEM_WIDTH = CELL_SIZE * 3 + CONTAINER_GAP * 2 - 2;
const ITEM_HEIGHT = CELL_SIZE;
const LONG_ITEM_WIDTH = CELL_CONTAINER_WIDTH;
const BIG_ITEM_HEIGHT = ITEM_WIDTH;
const WidgetItemContainer = styled.div<{
  size: ProfileWidgetItemSize | 'GROUP';
  bgColor?: string;
  hasBorder?: boolean;
  isClickable?: boolean;
}>`
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${props => props.bgColor || 'transparent'};
  border: 1px solid
    ${props => (props.hasBorder ? theme.mainNeon : 'transparent')};
  ${props =>
    props.isClickable &&
    css`
      cursor: pointer;
    `}
  ${props => {
    switch (props.size) {
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
      case 'GROUP':
        return `
            width: ${ITEM_WIDTH}px;
            height: ${BIG_ITEM_HEIGHT}px;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
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
const WidgetContent = styled.div<{textColor?: string}>`
  text-align: center;
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.textColor || 'white'};
  font-size: ${theme.fontSize['2xl']};
  overflow: hidden;
`;

const WidgetImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
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

type WidgetItemProps = {
  widget: ProfileWidgetItemType;
};

function WidgetItem({widget}: WidgetItemProps) {
  const isGroup = Array.isArray(widget);

  if (isGroup) {
    return (
      <WidgetItemContainer key={widget.id} size={widget.sizeType}>
        {widget.map(item => (
          <WidgetItem key={item.id} widget={item} />
        ))}
      </WidgetItemContainer>
    );
  }
  const hasNavType = !!widget.type;
  const isClickable = !!widget?.linkUrl || hasNavType;
  const textColor =
    widget.bgType === 'COLOR' && widget.bgColor
      ? getTextColor(widget.bgColor)
      : 'white';

  const content = (
    <WidgetContent style={{color: textColor}}>
      {widget.bgType === 'IMAGE' && <WidgetImage src={widget.bgImageUrl} />}
      {widget.description}
    </WidgetContent>
  );

  return (
    <WidgetItemContainer
      key={widget.id}
      size={isGroup ? 'GROUP' : widget.sizeType}
      hasBorder={widget?.hasBorder}
      bgColor={widget.bgType === 'COLOR' ? widget.bgColor : 'transparent'}
      isClickable={isClickable}>
      {hasNavType ? (
        <WidgetLink target="_blank" rel="appopener">
          <WidgetAppNavImage
            src={
              widget.type === ProfileWidgetTypeEnum.AppGroup
                ? '/Images/profile_widget_people.png'
                : widget.type === ProfileWidgetTypeEnum.AppRank
                  ? '/Images/profile_widget_trophy.png'
                  : widget.type === ProfileWidgetTypeEnum.AppRecycle
                    ? '/Images/profile_widget_recycle.png'
                    : widget.type === ProfileWidgetTypeEnum.AppShop
                      ? '/Images/profile_widget_shop.png'
                      : ''
            }
          />
        </WidgetLink>
      ) : isClickable ? (
        <WidgetLink
          href={widget.linkUrl}
          target="_blank"
          rel="noopener noreferrer">
          {content}
        </WidgetLink>
      ) : (
        content
      )}
    </WidgetItemContainer>
  );
}

export default WidgetItem;
