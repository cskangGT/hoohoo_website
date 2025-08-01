import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../style';
import {logButtonEvent, PageName} from '../../util/firebase_custom_event';
const ContactBox = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  padding: 0 10px;
  margin: 40px 0px;
`;
const ContactColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
`;
const ContactText = styled.h3`
  margin: 26px 10px;
  font-size: ${theme.fontSize['xl']};
  font-weight: 400;
  text-align: center;

  color: ${theme.darkGray};
`;

const LinktoEmail = styled.a`
  text-decoration: none;
  color: ${theme.white};
  background-color: ${theme.green};
  height: 50px;
  border-radius: 20px;
  border-color: ${theme.darkSky};
  width: 200px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 26px;
  border-width: 0px;
  font-weight: 500;
  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;
export default function FootContact() {
  const handleEmailClick = () => {
    logButtonEvent('contact_us', PageName.home);
    // 폴백(fallback) 처리
  };
  const data: any = i18next.t('footcontact', {returnObjects: true});
  return (
    <ContactBox id="contact" key="contact">
      <ContactColumnBox>
        <ContactText>{data.title}</ContactText>
        <LinktoEmail
          href={`/${i18next.language}/business_support`}
          onClick={handleEmailClick}
          data-l10n-id="footer_contactus">
          {data.button}
        </LinktoEmail>
      </ContactColumnBox>
    </ContactBox>
  );
}
