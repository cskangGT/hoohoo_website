import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../style';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import i18next from 'i18next';
const Bg = styled.section`
  width: calc(100%);
  height: 900px;
  background-color: #EFE7DF;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px){
        height: auto;
    }
`; 
const Container = styled.div<{smallBg : string}>`
    background-image: url(${props => props.smallBg});
    background-size: cover;
    background-position: center;
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    padding: 3rem 15px;
    @media screen and (max-width: 1000px){
        margin-top: 82px;
    }
`;
const HeaderBox = styled.div`
  width: 100%;
  display:flex;
  justify-content: center;
  padding-bottom: 40px;
`;
const HeaderText = styled.h1`
  font-size: 3.5rem;
  font-family: 'Fredoka';
  font-weight: bold;
  text-align: center;
    color: ${theme.darkGray};
    @media screen and (max-width: 700px) {
        font-size: 2.4rem;
    }
`;
const GridContainer = styled.div`

  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 같은 크기의 열 */
  grid-template-rows: repeat(5, 0.6fr); /* 5개의 같은 크기의 행 */
  gap: 20px; /* 그리드 아이템 간의 간격 */
  width: 100%; /* 부모 요소에 맞춤 */
  height: 520px; /* 부모 요소에 맞춤 */
  align-items: center; /* 세로 정렬 */
  justify-items: center; /* 가로 정렬 */
`;

const MidContainer = styled.div`
  background-color: #00BF63;
  opacity: 0.85;
  color: ${theme.white};
  border-radius: 20px;
  overflow: hidden;
  font-size: 2rem;
  text-align: center;
  padding: 10px;
`;
const Text = styled.p`
  font-size: 2.5rem;

`;
const GridItem = styled.img`
  width: 50px; // 컨테이너 너비에 맞게 조정
  height: auto; // 원본 이미지 비율 유지
`;
function HowWork() {
    const data : any= i18next.t('b2bhowwork', { returnObjects: true });
    return (
        <Bg>
        <Wrapper>
        <Container smallBg={data.bg}>
            <HeaderBox>
                <HeaderText>
                    {data.header}
                </HeaderText>
                </HeaderBox>
            <GridContainer >
            <Text>{data.left}</Text>
            <Text></Text>
            <Text>{data.right}</Text>
                
            {data.mid.map((item : any, index : number)=> (<>
                <GridItem  src={data.x} alt="X" />
                <MidContainer key={index} >{item}</MidContainer>
                <GridItem src={data.o} alt="O" />
                </>
            ))}

                

            </GridContainer>
    </Container >
        </Wrapper>
    </Bg>
    )
}
export default HowWork;