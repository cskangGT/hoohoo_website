// here it goes. Declaration for linkToStore component.
import React, { Component } from 'react';
import styled from 'styled-components'
const Container = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 0;
`;

const Back = styled.div.attrs((props)=> ({
    bg : props.bg,
    textColor: props.textColor || 'rgb(231, 121, 121)'
}))`
    background-color: ${(props) => props.bg};
    color: ${(props) => props.textColor};
    display: block;
    width: 40%;
    box-sizing: border-box;
    position: relative;
    text-align: left;
    float: left;
`;
const BoxLogo =styled.div`
    display: block;
    float: left;
    padding-left: 4%;
    padding-right: 4%;
    box-sizing: border-box;
    position: relative;
    width:33.33333%;
`;
const Logo = styled.img`
    margin-top: 30px;
    margin-bottom: 10px;
    display: block;
    height: 10em;
    max-width: 100%;
    border: 0;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    overflow: clip;
`;
const LogoText = styled.div`
    text-align: left;
    margin-left: 0px;
    width: 66.66667%;
    float: left;
    padding-left: 1.5%;
    padding-right: 1.5%;
    box-sizing: border-box;
    position: relative;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    text-size-adjust: auto;
    
`;
const BoxBottom = styled.div`

    display: block;
    float: left;
    margin-left: 33.33333%;
    min-height: 1px;
    padding-left: 1%;
    padding-right: 1%;
    position: relative;
    width: 60%;
`;
const BoxStores = styled.div`
    width: 100%;
    float: left;
`;
const LinkHidden = styled.a`
    
    margin: 10px;
    padding : 0;
    border: none;
    color: transparent;
    height: auto;
    text-align: center;
    display: none;
    width: 40%;
    vertical-align: middle;
    cursor: pointer;
    animation-duration: 1s;
    animation-fill-mode: both;
    visibility: visible;
    animation-name: fadeIn;
`;
const LinkStore = styled.a`
    margin: 10px;
    padding : 0;
    height: auto;
    text-align: center;
    display: inline-block;
    width: 40%;
    vertical-align: middle;
    cursor: pointer;
    animation-duration: 1s;
    animation-fill-mode: both;
    visibility: visible;
    animation-name: fadeIn;
`;
const ImgStores = styled.img`
    min-width: 20px;
    width: 100%;
    border:0;
    overflow-x: clip;
    overflow-y: clip;
    cursor: pointer;
`;
const Name = styled.h1.attrs((props) => ({
    textColor: props.textColor || 'rgb(231, 121, 121)'
}))`
    margin-block-start: 0.5em;
    margin-block-end: 0.1em;
    margin-inline-start: 0;
    margin-inline-end: -20px;
    font-size: 4.5em;
    color: ${(props) => props.textColor};
`;
const Desc = styled.h4.attrs((props)=> ({
    textColor: props.textColor || 'rgb(231, 121, 121)'
}))`
    margin-block-start: 0.1em;
    margin-block-end: 0.35em;
    margin-inline-start: 0;
    margin-inline-end: -20px;
    font-size: 2.0em;
    overflow: clip;
    color: ${ (props) => props.textColor };
`;

class StoresLink extends Component {
    // background color, font-color setting 
    render() {
        return (
            <Back bg={this.props.bgColor} textColor= {this.props.textColor}>
            <BoxLogo>
                <Logo src="Images/icon.png" alt="Hoohoo icon" />
            </BoxLogo>
            <LogoText>
                <Name data-l10n-id="header_Hoohoo" textColor= {this.props.textColor}> {this.props.appName} </Name>
                    <Desc data-l10n-id="header_description" textColor={this.props.textColor}> {this.props.appDesc} </Desc>
            </LogoText>
            <BoxBottom>
                <BoxStores >
                    <LinkHidden 
                        href="https://apps.apple.com/app/apple-store/id866450515?pt=690486&amp;ct=official_website&amp;mt=8">
                        <ImgStores src='Images/appstore.svg' alt="AppStore"></ImgStores>
                        </LinkHidden>
                        <LinkHidden
                        href="https://play.google.com/store/apps/details?id=cc.forestapp&amp;referrer=utm_source%3Dofficalwebsite%26utm_medium%3Dbutton">
                        <ImgStores src="Images/googleplay.svg" alt="Google Play"></ImgStores>
                        </LinkHidden>
                    <LinkStore
                        href="https://apps.apple.com/app/apple-store/id866450515?pt=690486&amp;ct=official_website&amp;mt=8">
                        <ImgStores src="Images/appstore.svg" alt="AppStore"></ImgStores>
                    </LinkStore>
                    <LinkStore
                        href="https://play.google.com/store/apps/details?id=cc.forestapp&amp;referrer=utm_source%3Dofficalwebsite%26utm_medium%3Dbutton">
                        <ImgStores src="Images/googleplay.svg" alt="Google Play"></ImgStores>
                    </LinkStore>
                </BoxStores>
            </BoxBottom>
            </Back>
        );
    }
}
export default StoresLink