import React, { useEffect, useState } from 'react'
import Wrapper from '../../../Component/Wrapper/Wrapper'
import LinedHeader from '../../../Component/ContentBox/LinedHeader'
import styled from 'styled-components';
import i18next from 'i18next';
import { theme } from '../../../style';

const HeaderBox = styled.div`
  padding-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px){
        padding: 30px 0px;
    }
`;
const Bg = styled.section`
  width: calc(100%);
  display: flex;
  justify-content: flex-start;
  background-color: #1A1A1A;
`; 
const SBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 170px;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #2D292B;
    margin-bottom: 30px;
    border-radius: 20px;
    padding: 0 10px;
    padding-bottom: 30px;
    overflow: hidden;
    @media screen and (max-width: 1000px){
        height: auto;
    }
    @media screen and (max-width: 800px){
        flex-direction: column;
        width: auto;
    
        align-items: center;
        justify-content: center;
    }
`;
const Image = styled.img`
  width: 100%;
  object-fit: contain;
  
  @media screen and (max-width: 800px){
        width: 60%;
        padding-bottom: 30px;
    }
`;
const TextBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  @media screen and (max-width: 800px){
        text-align: center;
        width: 90%;
        padding-left: 0px;
        padding-top: 20px;
    }
`;
const Title = styled.p<{color: string}>`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  padding: 30px 0;
  color: ${props=> props.color};
  margin: 0px;
`;
const Content = styled.p`
  width: 100%;
  font-size: 1rem;
  color:${theme.white};
  margin: 0px;
`;
const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 50px 0px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  @media screen and (max-width: 800px){
        flex-direction: column;
        margin-top: 20px;
        padding: 0 20px;
    }
`;
const OneColumn = styled.div`
  width: 30%;
  flex-direction: column;
  @media screen and (max-width: 800px){
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
    }
`;
type DataProps = {
    title: string;
    content: string;
    color: string;
}
interface Props {
    data : DataProps;
}
function Vision({data} :Props) {
    return (
    <SBox>
        <Title color={data.color}>{data.title}</Title>
        <Content>{data.content}</Content>
    </SBox>
    )
}

export default function VisionSection() {
  const data :any = i18next.t('vision', { returnObjects: true });
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
            <HeaderBox>
                <LinedHeader data={{header:data.header}} style={{fontSize: '3rem', color: theme.white}}/>
            </HeaderBox>
            <ContentContainer>
                {
                    isMobile &&
                    <OneColumn>
                        <Image src={data.img} />
                </OneColumn>
                }
                
                <OneColumn>
                    {data.items1.map((item : DataProps)=> (
                        <Vision data={item}/>
                    ))}
                </OneColumn>
                {!isMobile &&  <OneColumn>
                        <Image src={data.img} />
                </OneColumn>}
                <OneColumn>
                {data.items2.map((item : DataProps)=> (
                        <Vision data={item}/>
                    ))}
                </OneColumn>
            </ContentContainer>
        </Wrapper>
    </Bg>
  )
}