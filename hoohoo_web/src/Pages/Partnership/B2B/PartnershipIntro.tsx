import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { slideInFromTop, theme } from '../../../style';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
const Bg = styled.div`
  width: calc(100%);
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  height: 900px;
  background-image: url('Images/b2b1p.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; // 필요한 경우 추가
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px){
        height: auto;
    }
`; 
const Container = styled.div`
    width: 100%;
    display: flex;
    margin: 0px auto;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    padding: 3rem 15px;
    @media screen and (max-width: 1000px){
        margin-top: 82px;
    }
`;


const HorizonContainer = styled.div<{bg : string}>`
  display: flex;
  width: 100%;
  background-image: url(${props => props.bg});
    background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px){
        flex-direction:column-reverse;
    }
`;
const LeftBox = styled.div`
    align-items: center;
    justify-content: start;
    display: flex;
    width: 60%;
    flex-direction :column;
    color: ${theme.darkGray};
  text-align: center;
  padding: 0 40px;
  line-height: 1.2;
  margin: 100px 0;
    @media screen and (max-width: 1000px){
        margin: 0px;
        padding: 0 10px;
        width: 70%;
        text-align: center;
    }
    @media screen and (max-width: 500px){
        padding: 30px 10px;
        width: 90%;
        text-align: center;
    }
`;
const SubHeader = styled.h3`
  font-size: 2rem;
  line-height: 1;
  width: 100%;
  font-family: 'Fredoka';
  color: ${theme.green};
  text-align: left;
  @media screen and (max-width: 1000px){
        font-size: 1.7rem;
        padding: 10px 0;
        text-align:center;
    }
`;
const Header = styled.h2`
  font-size: 4rem;
  line-height: 1;
  width: 100%;
  text-align: left;
  font-family: 'Fredoka';
  @media screen and (max-width: 1000px){
        font-size: 2.3rem;
        text-align:center;
    }
`;
const Desc = styled.p`
    font-size: 1.5rem;
    line-height: 1.3;
    width: 100%;
    opacity: 0.8;
    text-align:left;
    margin: 20px 0;
    @media screen and (max-width: 1000px){
        font-size: 2rem;
        text-align:center;
    }
    @media screen and (max-width: 500px){
        font-size: 1rem;
    }
`;
const RightBox = styled.div`
    width: calc(50%);
    height: 100%;
    display: flex;
    flex-direction: column;
    /* background: linear-gradient(170deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%); */
    margin: 0;
    @media screen and (max-width: 1000px){
        height: 550px;
    }
    
`;
const Image = styled.img`
  width: 100%;  // RightBox의 너비에 맞춤
  height: 100%;
  object-fit: fill;
`;
function PartnershipIntro() {
    const data : any =  i18next.t('partnershipIntro', { returnObjects: true });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <Bg>
            <Wrapper>
            <Container >
                <HorizonContainer bg={isMobile? data.verticalBg :data.smallBg }>
                    <LeftBox>
                        <SubHeader>{data.subheader}</SubHeader>
                        <Header dangerouslySetInnerHTML={{__html: data.header}} />
                            <Desc>
                                {data.content}
                            </Desc>
                    </LeftBox>
                    <RightBox>
                        {/* <Image src={data.image} /> */}
                    </RightBox>
                </HorizonContainer>
        </Container >
            </Wrapper>
        </Bg>
    )
}
export default PartnershipIntro;