import i18next from 'i18next';
import {MdAbc} from 'react-icons/md';

import React from 'react';
import {MdPhoto} from 'react-icons/md';
import styled from 'styled-components';
import useWindowResize from '../../../components/hooks/useWindowResize';
import {theme} from '../../../style';
import {
  ProfileEMWidgetType,
  ProfileWidgetItemType,
} from '../types/WidgetItemType';
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
const EMLogoImage = styled.img<{size: number}>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  opacity: 0.8;
`;
function TemplateWidgetContent({
  widgetItem,
}: {
  widgetItem: ProfileWidgetItemType;
}) {
  const {width: resizeWidth} = useWindowResize({maxWidth: 600});
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const {
    sizeType,
    bgType,

    bgColor,
    emWidgetType,
  } = widgetItem;

  const textColor = getTextColorWcag(bgColor || '');
  if (emWidgetType === ProfileEMWidgetType.Temp) {
    const logoSize =
      sizeType === 'BIG' ? resizeWidth * 0.12 : resizeWidth * 0.05;
    return (
      <TemplateWidgetContainer style={{color: textColor}}>
        <EMLogoImage
          src={'/Images/earthmera_logo_white_ver.png'}
          size={logoSize}
        />
      </TemplateWidgetContainer>
    );
  } else {
    if (sizeType === 'BIG') {
      return (
        <TemplateWidgetContainer style={{color: textColor}}>
          {bgType === 'COLOR' ? (
            <>
              <MdAbc size={resizeWidth * 0.15} color={textColor} />
            </>
          ) : (
            <>
              <MdPhoto size={resizeWidth * 0.15} color={textColor} />
            </>
          )}
        </TemplateWidgetContainer>
      );
    }

    return (
      <TemplateWidgetContainer style={{color: textColor}}>
        {bgType === 'COLOR' ? (
          <MdAbc size={resizeWidth * 0.1} color={textColor} />
        ) : (
          <MdPhoto size={resizeWidth * 0.1} color={textColor} />
        )}
      </TemplateWidgetContainer>
    );
  }
}

export default TemplateWidgetContent;
