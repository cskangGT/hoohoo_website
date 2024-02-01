// You work on it here Jisan!  ##main page 
// import React from 'react';
import React from 'react';
import StoresLink from '../../Component/LinkToStore/LinkToStore.js'
import styled from 'styled-components';
import Nav from '../../Component/Nav/Nav.js'
var w = window.innerWidth;
var h = window.innerHeight;
// const Header = styled.header`
//     box-sizing: border-box;
//     /* position: sticky; */
//     display:block;
//     width: 100%;
//     height: 100%;
// `;
const Header = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding:0;
    display: block;
    margin:-5px;
`;
const BgImage = styled.div`
    background: url("Images/option1.jpg") no-repeat center;
    background-size: cover;
    max-height: 100%;
    width: 100%;
    height: ${h}px;
`;
const StoresLinkSections = styled.div`
    width: 100%;
    position: absolute;
    display:block;
    top: calc(15%);
    left: 0;
    right: 0;
    box-sizing: border-box;
`;
const StoresLinkBox = styled.div`
    margin-top : 80px;
    margin-left : 15%;
`;
const PreviewContainer = styled.div`
    width: 25%;
    display: block;
    position: relative;
    float: left;
    padding-left: 100px;
    padding-right: 20px;
    margin-top: -80px;
`;
const MobileImg = styled.img`
    position: relative;
    height: 500px;
`;

function Main() {

    return (<Header><BgImage>
        <Nav></Nav>
        <StoresLinkSections >
            <StoresLinkBox>
                <StoresLink style={{ marginTop: '80px', marginLeft: '15%' }} logo='Images/icon.png' appName='DropB' appDesc="Record your day with Tags" textColor='#f1f1f1' bg='transparent' ></StoresLink>
            </StoresLinkBox>
            <PreviewContainer ><MobileImg src='Images/preview.png'></MobileImg></PreviewContainer>
        </StoresLinkSections>
    </BgImage></Header>);
}
export default Main; 