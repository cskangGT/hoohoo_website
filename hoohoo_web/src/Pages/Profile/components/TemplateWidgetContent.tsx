import i18next from 'i18next';
import React from 'react';
import {BsFileEarmarkTextFill} from 'react-icons/bs';
import {MdPhoto} from 'react-icons/md';
import styled from 'styled-components';
import useWindowResize from '../../../components/hooks/useWindowResize';
import {theme} from '../../../style';
import {ProfileWidgetItemType} from '../types/WidgetItemType';
import {getTextColorWcag} from '../util/util';
const TemplateWidgetContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: ${theme.spacing.sm};
  font-size: ${theme.fontSize.xl};
  font-weight: 500;
  font-family: 'Inter';
  line-height: 2;
  @media (max-width: 600px) {
    font-size: ${theme.fontSize.lg};
    font-weight: 500;
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSize.rg};
  }
`;

function TemplateWidgetContent({
  widgetItem,
}: {
  widgetItem: ProfileWidgetItemType;
}) {
  const resizeWidth = useWindowResize({maxWidth: 600});
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const {
    id,
    sizeType,
    type,
    bgType,
    bgImageUrl,
    bgColor,
    hasBorder,
    description,
    linkUrl,
    isEmWidget,
    emWidgetType,
    isTemp,
    widgetData,
    coordinate,
  } = widgetItem;

  const textColor = getTextColorWcag(bgColor || '');
  if (isEmWidget) {
    return (
      <TemplateWidgetContainer style={{color: textColor}}>
        {localizedTexts.widget.emwidget}
      </TemplateWidgetContainer>
    );
  } else {
    if (sizeType === 'BIG') {
      return (
        <TemplateWidgetContainer style={{color: textColor}}>
          {bgType === 'COLOR' ? (
            <>
              <BsFileEarmarkTextFill
                size={resizeWidth * 0.12}
                color={textColor}
              />
              {localizedTexts.widget.text}
            </>
          ) : (
            <>
              <MdPhoto size={resizeWidth * 0.12} color={textColor} />
              {localizedTexts.widget.photo}
            </>
          )}
        </TemplateWidgetContainer>
      );
    }

    return (
      <TemplateWidgetContainer style={{color: textColor}}>
        {bgType === 'COLOR'
          ? localizedTexts.widget.text
          : localizedTexts.widget.photo}
      </TemplateWidgetContainer>
    );
  }
}

export default TemplateWidgetContent;
