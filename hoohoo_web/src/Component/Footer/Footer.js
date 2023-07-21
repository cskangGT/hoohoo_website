import React from 'react';
import styled from 'styled-components';

const Background = styled.footer`
    background-color: #1e1e1e;
    padding: 20px 0;
`;
const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
`;
const RowBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
`;
const Column = styled.div`
    flex: 0 0 50%;
    max-width: 50%;
    padding: 0 15px;
`;
const FooterBottom = styled.div`
  padding: 10px 0;
  
  position: relative;
  
  max-width: 1200px;
`;
const FooterTitle = styled.h3`
  color: #f1f1f1;
`;
const BusinessDetail = styled.p`
  font-size: 14px;
  line-height: 22.4px;
  color: #f1f1f1;
`;

const LinktoEmail = styled.a`
  text-decoration: none;
  color: #9d9d9d;
`;




function Footer() {
    return (
        <Background>
          <Container>
          <RowBox>
              <Column>
                <FooterTitle>어스메라(Earthmera)</FooterTitle>
                <BusinessDetail> 대표이사 : 강성훈 | 사업자번호 : 582-02-03293 | 통신판매신고번호 : 제 2023-서울강남-12913호
                    <br /> 이메일 : devceohoony@gmail.com
                </BusinessDetail>
              </Column>
              </RowBox>
          <FooterBottom>
                <hr style={{color: '#f1f1f1'}} />
                <RowBox>
                <Column>
                    <BusinessDetail>Copyright&copy; 2023 by Hoohoo, All rights reserved.</BusinessDetail>
                </Column>
                <Column>
                <LinktoEmail href="mailto:devceohoony@gmail.com" data-l10n-id="footer_contactus">
                        Contact Us</LinktoEmail>
                        </Column>
                        </RowBox>
                </FooterBottom>
            </Container>
          
        </Background>
    );
}
export default Footer;