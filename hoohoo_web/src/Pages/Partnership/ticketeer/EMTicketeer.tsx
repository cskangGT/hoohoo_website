import React, { useEffect } from 'react'
import styled from 'styled-components';
const ContentBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 800px;
  display: flex;
  @media screen and (max-width: 800px){
      height: auto;
    }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
  @media screen and (max-width: 1200px){
      height: auto;
    }
`;
export default function EMTicketeer() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div>EMTicketeer</div>
  )
}
