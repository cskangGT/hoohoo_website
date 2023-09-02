import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { theme } from '../style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterestP, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBars, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { Link, animateScroll as scroll } from 'react-scroll';
const Logo = styled.div`
  padding: 15px;
  font-size: 24px;
`;
const LogoText = styled.a`
  text-decoration: none;
  padding: 10px;
  color: ${theme.white};
  &:hover {
    color: ${theme.white};
  }
`;
const Bar = styled.nav`
position: fixed;
top: 0;
    right: 0;
    left: 0;
    // bottom: 0;
z-index: 9999;
  // margin: 0;
  backdrop-filter: blur(15px);
    background-color: rgba(29, 21, 40, 0.09);
  box-sizing: border-box;
  width: 100%;
  // max-width: 1024px; apple 느낌
  // max-width: 1830px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 22px;
  @media screen and (max-width: 850px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 22px;
  }
`;
const NavbarMenu = styled.ul`
  display: flex;
  list-style: none;
  height: 44px;
  margin: 0 -8px;
  width:auto;
  padding-left: 0;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 850px) {
    height: auto;
    flex-direction: column;
    align-items: center;
    width: 100%;
    transition: all 0.3s ease;
    display: ${props => (props.isOpen ? 'flex' : 'none')};  
  }

`;
const NavMenuList = styled.li`
  // padding: 8px 12px;
  text-decoration : none;
  color: ${theme.white};
  padding : 12.5px 15px;
  &:hover {
    // background-color: #313131;
    border-radius: 5Px;
    & .hidden-icon {
      opacity: 1;
      transform: rotate(180deg);
  }
  }
  @media screen and (max-width: 850px) {
    text-align: center;
    width: 100%;
  }
`;
const NavLink = styled.a`
  text-decoration : none;
  color: ${theme.white};
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    border-radius: 4px;
    color: ${theme.mainNeon};
  }
`;
const NavRight = styled.div`
  display: flex;
  list-style: none;
  // height: 44px;
  margin: 0 -8px;
  width:auto;
  padding-left: 0;
  align-items: center;
  justify-content: center;
  
`;
// const NavIcons = styled.ul`
// margin: 0;
//   list-style: none;
//   color: ${theme.white};
//   display: flex;
//   padding-left: 0;
//   @media screen and (max-width: 768px) {
//     justify-content: center;
//     display: ${props => (props.isOpen ? 'flex' : 'none')};  
//     width: 100%;
//   }
// `;
// const IconList = styled.a`
//   padding: 8px 12px;

// `;
const MenuToogleButton = styled.button`
background: none;
  border: none;
  cursor: pointer;  
position: absolute;
  right: 32px;
  top: 22px;
  font-size: 24px;
  color: ${theme.mainNeon};
  display: none;
  @media screen and (max-width: 850px) {
    display: block;
  }
  &:hover {
    transition: all 0.3s ease;
    color: ${theme.mainNeon};
  }
`;
const HiddenIcon = styled(FontAwesomeIcon)`
    opacity: 0;
    transition: all 0.5s ease;
`;
const LanguageBox = styled.div`
  margin: 0 30px;
  display: block;
  @media screen and (max-width: 850px) {
    display: none;
    position: absolute;
    right: 45px;
    top: 25px;
  }
`;
const LanguageBoxSecond = styled.div`
  margin: 0 30px;
  display: none;
  @media screen and (max-width: 850px) {
    display: block;
    position:absolute;
    right: 45px;
    top: 27px;
  }
`;
const LanguageButton = styled.button`
  font-size: 12px;
  color: ${theme.white};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  opacity: ${props => (props.isKorean ? 1 : 0.5)};
  &:hover {
    transition: all 0.3s ease;
    opacity: 1;
    color: ${theme.mainNeon};
  }
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;  
    width: 1px;  // 선의 너비
    height: 20px;  // 선의 높이
    background-color: gray;  // 선의 색상
    transform: translateY(-50%);
  }
  &:last-child::after {
    display: none;
  }
`;

function Nav({ isKorean, setIsKorean }) {
  const links = ["Home", "About", "Advertising", "Download", "Contact"];
  const hrefs = ['#home', '#about', '#sketch', "#download", '#contact'];
  const icons = [];
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Bar>
      <Logo>
        <FontAwesomeIcon icon={faPinterestP} size='xl' style={{ color: theme.mainNeon }} />
        <LogoText href="#home">EarthMera</LogoText>
      </Logo>

      <NavbarMenu isOpen={isOpen}>
        {
          links.map((item, i) => {
            return (
              <NavMenuList><HiddenIcon className="hidden-icon" icon={faInstagram} size='lg' />
                <NavLink
                  id={i}
                  href={hrefs[i]}
                >{item}</NavLink>
              </NavMenuList>
            );
          })
        }
        {
          !isOpen && <LanguageBox>
            <LanguageButton isKorean={isKorean}
              onClick={() => setIsKorean(true)}>KO</LanguageButton>
            <LanguageButton isKorean={!isKorean}
              onClick={() => setIsKorean(false)}>EN</LanguageButton>
          </LanguageBox>
        }
      </NavbarMenu>
      {windowWidth < 850 && <NavRight>
        <LanguageBoxSecond>
          <LanguageButton isKorean={isKorean}
            onClick={() => setIsKorean(true)}>KO</LanguageButton>
          <LanguageButton isKorean={!isKorean}
            onClick={() => setIsKorean(false)}>EN</LanguageButton>
        </LanguageBoxSecond>
      </NavRight>}

      <MenuToogleButton onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </MenuToogleButton>
    </Bar >
  )
}
export default Nav;