import React from 'react'
import styled from 'styled-components';
import { Header } from '../../../Component/ContentBox/TwoColBoxesSection';
const Container = styled.section`
    width: 100%;
  background-color: transparent;
  height: 900px;
  display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  @media screen and (max-width: 800px){
    height: auto;
  }
`;
const HeaderText = styled(Header)`
  color: black;
  width: 70%;
  font-family: 'Fredoka';
  padding-bottom: 20px;
  @media screen and (max-width: 800px){
    text-align: center;
    width: 100%;
  }
`;
export default function Expect() {
    const data = {
        "header": "What to expect with<br />EarthMera Tickteer?",
        "step" : [
            {
                "image" : "",
                "content" : "",
            }
        ]
    }
  return (
    <Container>
        <HeaderText dangerouslySetInnerHTML={{__html:data.header}} />
    </Container>
  )
}
