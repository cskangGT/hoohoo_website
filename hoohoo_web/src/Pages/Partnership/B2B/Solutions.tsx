import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import LinedHeader from '../../../components/ContentBox/LinedHeader';
import Wrapper from '../../../components/Wrapper/Wrapper';

const HeaderBox = styled.div`
  padding-top: 60px;
  padding-left: 40px;
  @media screen and (max-width: 700px) {
    padding: 30px 20px;
  }
`;
const Bg = styled.section`
  width: calc(100%);
  height: 700px;
  display: flex;
  justify-content: flex-start;
  @media screen and (max-width: 700px) {
    height: auto;
  }
`;
const SBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 200px;
  border-bottom: 1px solid #2d8bba;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    height: auto;
    align-items: center;
    justify-content: center;
  }
`;
const Image = styled.img`
  width: 180px;
  height: 180px;
  padding-right: 20px;
  padding-bottom: 20px;
  @media screen and (max-width: 700px) {
    padding: 0;
  }
`;
const TextBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  @media screen and (max-width: 700px) {
    text-align: center;
  }
`;
const Title = styled.p`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
`;
const Content = styled.p`
  width: 100%;
  font-size: 1rem;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 3열로 나눕니다.
  grid-template-rows: repeat(2, 1fr); // 4행으로 나눕니다.
  gap: 15px; // 셀 사이의 간격
  width: 100%;
  margin-top: 50px;
  padding: 0 60px;
  align-items: center;
  justify-items: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    grid-template-columns: repeat(1, 1fr); // 3열로 나눕니다.
    grid-template-rows: repeat(4, 1fr); // 4행으로 나눕니다.
    margin-top: 20px;
  }
`;
type DataProps = {
  image: string;
  title: string;
  content: string;
};
interface Props {
  data: DataProps;
}
function Solution({data}: Props) {
  return (
    <SBox>
      <Image src={data.image} />
      <TextBox>
        <Title>{data.title}</Title>
        <Content>{data.content}</Content>
      </TextBox>
    </SBox>
  );
}

export default function Solutions() {
  const data: any = i18next.t('b2csolutions', {returnObjects: true});
  return (
    <Bg>
      <Wrapper>
        <HeaderBox>
          <LinedHeader
            data={{header: data.header}}
            style={{fontSize: '3rem'}}
          />
        </HeaderBox>
        <GridContainer>
          {data.solutions.map((item: DataProps) => (
            <Solution data={item} />
          ))}
        </GridContainer>
      </Wrapper>
    </Bg>
  );
}
// import React from 'react'
// import Wrapper from '../../../components/Wrapper/Wrapper'
// import LinedHeader from '../../../components/ContentBox/LinedHeader'
// import styled from 'styled-components';
// import i18next from 'i18next';

// const HeaderBox = styled.div`
//   padding-top: 60px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   @media screen and (max-width: 700px){
//         padding: 30px 20px;
//     }
// `;
// const Bg = styled.section`
//   width: calc(100%);
//   height: 700px;
//   display: flex;
//   justify-content: flex-start;
//   @media screen and (max-width: 700px){
//         height: auto;
//     }
// `;
// const SBox = styled.div`
//     display: flex;
//     flex-direction: row;
//     height: 200px;
//     justify-content: center;
//     align-items: center;
//     width: 70%;
//     border-bottom: 1px solid #2D8BBA;
//     @media screen and (max-width: 700px){
//         flex-direction: column;
//         width: auto;
//         height: auto;
//         align-items: center;
//         justify-content: center;
//     }
// `;
// const Image = styled.img`
//   width: 180px;
//   height: 180px;
//   padding-right: 20px;
//   padding-bottom: 20px;
//   @media screen and (max-width: 700px){
//         padding: 0;
//     }
// `;
// const TextBox = styled.div`
//   width: 70%;
//   display: flex;
//   flex-direction: column;
//   padding-left: 10px;
//   @media screen and (max-width: 700px){
//         text-align: center;
//         width: 90%;
//         padding-left: 0px;
//         padding-top: 20px;
//     }
// `;
// const Title = styled.p`
//   width: 100%;
//   font-size: 1.5rem;
//   font-weight: 700;
//   line-height: 1;
// `;
// const Content = styled.p`
//   width: 100%;
//   font-size: 1rem;
// `;
// const GridContainer = styled.div`
//   display: grid;
//   grid-template-rows: 1fr 1fr;
//   gap: 15px; // 셀 사이의 간격
//   width: 100%;
//   margin-top: 50px;
//   padding: 0 60px;
//   align-items: center;
//   justify-items: center;
//   @media screen and (max-width: 600px){
//         flex-direction: column;
//         grid-template-columns: repeat(1, 1fr); // 3열로 나눕니다.
//         grid-template-rows: repeat(4, 1fr); // 4행으로 나눕니다.
//         margin-top: 20px;
//         padding: 0 20px;
//     }
// `;
// type DataProps = {
//     image: string;
//     title: string;
//     content: string;
// }
// interface Props {
//     data : DataProps
// }
// function Solution({data} :Props) {
//     return (
//     <SBox>
//         <Image src={data.image}/>
//         <TextBox>
//             <Title>{data.title}</Title>
//             <Content>{data.content}</Content>
//         </TextBox>
//     </SBox>
//     )
// }

// export default function Solutions() {
//   const data :any = i18next.t('b2csolutions', { returnObjects: true });
//   return (
//     <Bg>
//         <Wrapper>
//             <HeaderBox>
//                 <LinedHeader data={{header:data.header}} style={{fontSize: '3rem'}}/>
//             </HeaderBox>
//             <GridContainer>
//                 {data.solutions.map((item : DataProps)=> (
//                     <Solution data={item}/>
//                 ))}
//             </GridContainer>
//         </Wrapper>
//     </Bg>
//   )
// }
