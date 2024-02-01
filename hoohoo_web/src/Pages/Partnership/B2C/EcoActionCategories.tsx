import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { Desc, Header } from '../../../Component/ContentBox/TwoColBoxesSection';
const isSmall = window.innerWidth < 800;
const Container = styled.div`
width: 100%;
  background-color: white;
  height: 500px;
  @media screen and (max-width: 800px){
    height: auto;
    margin-bottom: 150px;
  }
`;
const Background = styled.div<{ backgroundImage: string }>`
  width: 100%;
  margin-top: 100px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  flex-direction: column;
  height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px){
    height: auto;
  }
  `;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const HeaderText = styled(Header)`
  font-size: 3rem;
  font-family: 'Fredoka';
  color: ${isSmall ? 'white':'black' };
`;

const LeftBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 800px){
    width: 100%;
    padding: 10px;
    height: auto;
  }
`;
const Image = styled.img`
  height: 500px;
  @media screen and (max-width: 800px){
    position: absolute;
    left: 50%;
  transform: translate(-50%, 0);

    height: 350px;

  }
`;
const RightBox = styled.div`
  width: 50%;
  height: 500px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 800px){
    width: auto;
    height: 350px;
  }
`;
const ContentText = styled(Desc)`
  color: ${isSmall ? 'white':'black' };
`;
const HighlightedText = styled.span`
  background-color: #FF7B27;
  color: black;
  padding: 0.2em;
  border-radius: 4px;
`;
export default function EcoActionCategories() {
    const data ={
        "title": "Eco-action categories",
        "content" : "Choose an eco-action, capture it. <br />Got more ideas? <br /> Try 'suggest a category'!",
        "bgImage" : "Images/home2bg.jpeg",
        "image" : "Images/platform3Image.png"
    }
    data.content = data.content.replace(
        "suggest a category!",
        "<span class='highlight'>suggest a category!</span>"
      );
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 800);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
    <Background backgroundImage={data.bgImage}>
        {
            isMobile ? <>
            <Wrapper>
            <LeftBox>
                <HeaderText>{data.title}</HeaderText>
                <ContentText>
                    {data.content.split("<br />").map((line, index, array) => (
                    <React.Fragment key={index}>
                    {line.split("'suggest a category'!").map((segment, i, arr) =>
                    i === arr.length - 1 ? (
                    segment
                    ) : (
                    <>
                    {segment}
                    <HighlightedText> {"'suggest a category'!"}</HighlightedText>
                    </>
                    )
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
                        <Image src={data.image}/>
                    </RightBox>
                </InnerContainer>
            </Wrapper>
        </Container></>
        : <Container>
            <Wrapper>
                <InnerContainer>
                    <LeftBox>
                        <HeaderText>{data.title}</HeaderText>
                        <ContentText>
                        {data.content.split("<br />").map((line, index, array) => (
      <React.Fragment key={index}>
        {line.split("'suggest a category'!").map((segment, i, arr) =>
          i === arr.length - 1 ? (
            segment
          ) : (
            <>
              {segment}
              <HighlightedText> {"'suggest a category'!"}</HighlightedText>
            </>
          )
        )}
        {index !== array.length - 1 && <br />}
      </React.Fragment>
    ))}
                        </ContentText>
                    </LeftBox>
                    <RightBox>
                        <Image src={data.image}/>
                    </RightBox>
                </InnerContainer>
            </Wrapper>
        </Container>
        }
        
    </Background>
  )
}
