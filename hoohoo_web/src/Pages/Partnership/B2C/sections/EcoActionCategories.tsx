import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Desc,
  Header,
} from '../../../../components/ContentBox/TwoColBoxesSection';
import { useLanguage } from '../../../../components/hooks/LanguageContext';
import Wrapper from '../../../../components/Wrapper/Wrapper';
import { theme } from '../../../../style';
const isSmall = window.innerWidth < 1300;
const Container = styled.div`
  width: 100%;

  background-color: ${theme.green};
  @media screen and (max-width: 1000px) {
    height: auto;
  }
`;
const Background = styled.div`
  width: 100%;
  height: 500px;

  background-color: ${theme.green};
  position: relative;
  flex-direction: column;

  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    height: auto;
  }
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100% - 0px);
  padding: 0px 0px;
  height: 100%;
`;
const HeaderText = styled(Header)<{language: string}>`
  font-size: 2.5rem;
  font-family: ${props => (props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka')};
  font-weight: 600;
  color: black;
  @media screen and (max-width: 1000px) {
    text-align: center;
  }
`;

const LeftBox = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0px;
  padding-left: 0px;
  justify-content: center;
  @media screen and (max-width: 1000px) {
    width: calc(100% - 20px);
    padding: 10px;
    height: auto;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1000px) {
  }
`;
const RightBox = styled.div`
  width: 60%;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1000px) {
    width: auto;
    padding: 0px 20px;
    padding-top: 30px;
  }
`;
const ContentText = styled(Desc)`
  color: black;
  @media screen and (max-width: 1000px) {
    text-align: center;
  }
`;
const HighlightedText = styled.span`
  background-color: white;
  color: [black];
  padding: 0.2em;
  border-radius: 4px;
  @media screen and (max-width: 1000px) {
  }
`;
export default function EcoActionCategories() {
  const data: any = i18next.t('EcoActionCategories', {returnObjects: true});
  const {language} = useLanguage();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);
  return (
    <Background>
      {isMobile ? (
        <>
          <Wrapper>
            <LeftBox>
              <HeaderText language={language}>{data.header}</HeaderText>
              <ContentText>
                {data?.content
                  .split('<br />')
                  .map((line: string, index: number, array: string[]) => (
                    <React.Fragment key={index}>
                      {line
                        .split(`'${data?.highlight}'`)
                        .map((segment: string, i: number, arr: string[]) =>
                          i === arr.length - 1 ? (
                            segment
                          ) : (
                            <>
                              {segment}
                              <HighlightedText>
                                {' '}
                                {`${data?.highlight}`}
                              </HighlightedText>
                            </>
                          ),
                        )}
                      {index !== array.length - 1 && <br />}
                    </React.Fragment>
                  ))}
              </ContentText>
            </LeftBox>
          </Wrapper>
          <Container>
            <Wrapper>
              <InnerContainer>
                <RightBox>
                  <Image src={data.image} />
                </RightBox>
              </InnerContainer>
            </Wrapper>
          </Container>
        </>
      ) : (
        <Container>
          <Wrapper>
            <InnerContainer>
              <LeftBox>
                <HeaderText language={language}>{data.header}</HeaderText>
                <ContentText>
                  {data?.content
                    .split('<br />')
                    .map((line: string, index: number, array: string[]) => (
                      <React.Fragment key={index}>
                        {line
                          .split(`'${data?.highlight}'`)
                          .map((segment: string, i: number, arr: string[]) =>
                            i === arr.length - 1 ? (
                              segment
                            ) : (
                              <>
                                {segment}
                                <HighlightedText>
                                  {' '}
                                  {`'${data?.highlight}'`}
                                </HighlightedText>
                              </>
                            ),
                          )}
                        {index !== array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </ContentText>
              </LeftBox>
              <RightBox>
                <Image src={data.image} />
              </RightBox>
            </InnerContainer>
          </Wrapper>
        </Container>
      )}
    </Background>
  );
}
