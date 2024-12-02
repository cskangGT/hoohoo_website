import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Desc, Header} from '../../../Component/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import i18next from 'i18next';
import { theme } from '../../../style';
const isSmall = window.innerWidth < 1300;
const Container = styled.div`
  width: 100%;
  
  background-color: ${theme.green};
  @media screen and (max-width: 1000px) {
    height: auto;
    margin-bottom: 100px;
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
  height: 100%;
`;
const HeaderText = styled(Header)`
  font-size: 2.5rem;
  font-family: 'Fredoka';
  font-weight: 600;
  color: black;
  @media screen and (max-width: 1000px) {
    text-align: center;
  }
`;

const LeftBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1000px) {
    width: 100%;
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
  width: 50%;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1000px) {
    width: auto;
    padding: 20px;
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
  // const data: any = i18next.t('EcoActionProcess', {returnObjects: true});
  const data = {
    title: 'Eco-action categories',
    content:
      "Choose an eco-action, capture it. <br />Got more ideas? <br /> Try 'suggest a category'!",
    bgImage: 'Images/home2bg.jpeg',
    image: 'Images/eco_action_categories.png',
  };
  data.content = data.content.replace(
    'suggest a category!',
    `<span class='highlight'>suggest a category!</span>`,
  );
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
              <HeaderText>{data.title}</HeaderText>
              <ContentText>
                {data.content.split('<br />').map((line, index, array) => (
                  <React.Fragment key={index}>
                    {line
                      .split("'suggest a category'!")
                      .map((segment, i, arr) =>
                        i === arr.length - 1 ? (
                          segment
                        ) : (
                          <>
                            {segment}
                            <HighlightedText>
                              {' '}
                              {"'suggest a category'!"}
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
                  <Image src={data.image}  />
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
                <HeaderText>{data.title}</HeaderText>
                <ContentText>
                  {data.content.split('<br />').map((line, index, array) => (
                    <React.Fragment key={index}>
                      {line
                        .split("'suggest a category'!")
                        .map((segment, i, arr) =>
                          i === arr.length - 1 ? (
                            segment
                          ) : (
                            <>
                              {segment}
                              <HighlightedText>
                                {' '}
                                {"'suggest a category'!"}
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
