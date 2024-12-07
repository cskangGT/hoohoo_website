import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../style';
const ContactBox = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  padding: 0 10px;
`;
const ContactColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContactText = styled.h3`
  margin: 26px 10px;
  font-size: 1.3rem;
  text-align: center;
  color: ${theme.darkGray};
`;

const LinktoEmail = styled.a`
  text-decoration: none;
  color: ${theme.darkSky};
  background-color: ${theme.mainNeon};
  height: 50px;
  border-radius: 20px;
  border-color: ${theme.darkSky};
  width: 200px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 26px;
  border-width: 0px;
  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;
export default function FootContact() {
  const data: any = i18next.t('footcontact', {returnObjects: true});
  return (
    <ContactBox id="contact" key="contact">
      <ContactColumnBox>
        <ContactText>{data.title}</ContactText>
        <LinktoEmail
          href="mailto:devceohoony@gmail.com"
          data-l10n-id="footer_contactus">
          {data.button}
        </LinktoEmail>
      </ContactColumnBox>
    </ContactBox>
  );
}
