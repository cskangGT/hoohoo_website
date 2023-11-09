import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import i18next from 'i18next';
import Wrapper from '../Wrapper/Wrapper';
import LinedHeader from './LinedHeader';
const Container = styled.div<{backgroundColor?: string}>`
    width: 100%;
    display: flex;
    margin: 0px auto;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    padding: 3rem 15px;
    background-color: ${props=> props.backgroundColor? props.backgroundColor : "#FFFEFE" };
`;
const HeaderBox = styled.div`
  padding-left: 30px;
  @media screen and (max-width: 700px) {
        padding-left: 0px;
    }
`;
type Props = {
    data : any;
    backgroundColor?: string;
    children?: React.ReactNode;
}

export default function HeaderContent(props : Props) {
    // const data = {
    //     header: "What data can we offer?",
    //     lineImage: 'Images/rewards.png',
    // }
    
    
    return (
        <Container
            backgroundColor={props.backgroundColor}>
        <Wrapper>
        <HeaderBox>
            <LinedHeader data={props.data} color={props.backgroundColor? theme.white:theme.blue}/>
            </HeaderBox>
            {props.children}
        </Wrapper>
       </Container>
    )
}