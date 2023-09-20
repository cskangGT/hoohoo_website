import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { theme } from '../../style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// const icon = require('./icon_image.png')
const Logo = styled.a`
  padding: 15px;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
`;
const LogoText = styled.a`
  padding-left: 10px;
  color: ${theme.white};
`;
const Bar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  backdrop-filter: blur(15px);
  background-color: rgba(0, 0, 0, 0.29);
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 22px;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 22px;
  }
`;
type NavBarProps = {
  isOpen: boolean;
}
const NavbarMenu = styled.ul<NavBarProps>`
  display: flex;
  list-style: none;
  height: 44px;
  margin: 0 -8px;
  width:auto;
  padding-left: 0;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1000px) {
    height: auto;
    flex-direction: column;
    align-items: center;
    width: 100%;
    transition: all 0.3s ease;
    display: ${props => (props.isOpen ? 'flex' : 'none')};  
  }
`;
const LogoIcon = styled.img`
  width: 24px;
  
`;
const HeaderLogo = styled.img`
  width: 36px;
  height: 36px;
`;
const NavMenuList = styled.li`
  text-decoration : none;
  color: ${theme.white};
  display: flex;
  padding : 12.5px 15px;
  justify-content: center;
  align-items: center;
  .hidden-icon {
    opacity: 0;
    transition: all 0.5s ease; 
  }
  &:hover {
    // background-color: #313131;
    border-radius: 5Px;
    & .hidden-icon {
      opacity: 1;
      transition: all 0.5s ease;
      transform: rotate(360deg);
    }
  }
  @media screen and (max-width: 1000px) {
    align-items: start;
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
  top: 25px;
  font-size: 24px;
  color: ${theme.mainNeon};
  display: none;
  @media screen and (max-width: 1000px) {
    display: block;
  }
  &:hover {
    transition: all 0.3s ease;
    color: ${theme.mainNeon};
  }
`;

const LanguageBox = styled.div`
  margin: 0 30px;
  display: block;
  @media screen and (max-width: 1000px) {
    display: none;
    position: absolute;
    right: 45px;
    top: 25px;
  }
`;
const LanguageBoxSecond = styled.div`
  margin: 0 30px;
  display: none;
  @media screen and (max-width: 1000px) {
    display: block;
    position:absolute;
    right: 45px;
    top: 27px;
  }
`;
type LanguageProps =
  {
    isKorean: boolean;
  }

const LanguageButton = styled.button<LanguageProps>`
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
const HoverContainer = styled.div`
  cursor: pointer;
  color: ${theme.white};
  @media screen and (max-width: 1000px) {
    margin-left: 10px;
    align-items: center;
    justify-content: center;
    
  }
  &:hover {
    border-radius: 4px;
    color: ${theme.mainNeon};
    & .hidden-subItems {
      display: block;
      transition: all 0.5s ease;
    }
  }
`;

const NavHover = styled.span`
  text-decoration : none;
  padding-left: 10px;
  @media screen and (max-width: 1000px) {
    padding-left: 0px;
  }
  
`;

const ContainerSubItems = styled.div`
  position: absolute;
  display: none;
  // margin-top: 30px;
  // padding-top: 12px;
  // background-color: rgba(250, 250, 250, 0.09);
  @media screen and (max-width: 1000px) {
    position: relative;
    align-items: center;
    justify-content: center;
    // margin-left: 15px;
  }
`;

const HoverLinks = styled.ul`
  padding: 0;
  
  text-decoration : none;
  @media screen and (max-width: 1000px) {
    padding-top: 7px; 
  }
`;
const NavSubList = styled.li`
  text-decoration : none;
  color: ${theme.white};
  display: flex;
  padding : 5px 0px;
  
  padding-right: 15px;
  @media screen and (max-width: 1000px) {
    align-items: center;
    justify-content: center;
    padding : 7px 7px;
  }
  // &: hover {
  //   backdrop-filter: blur(15px);
  //   background-color: rgba(250, 250, 250, 0.09);
  //   border-radius: 10px;
  // }
`;
const SubNavLink = styled.a`
  text-decoration : none;
  color: ${theme.white};
  padding-left: 10px;
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    font-size: 12px;  
    text-align: center; 
    padding-left: 0px;
  }
  &:hover {
    border-radius: 4px;
    color: ${theme.mainNeon};
  }
`;
type NavProps = {
  isKorean: boolean;
  setIsKorean: React.Dispatch<React.SetStateAction<boolean>>;
}
type NavItem = {
  label: string;
  link?: string;
  subItems?: NavItem[];
};
function Nav({ isKorean, setIsKorean }: NavProps) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const navItems: NavItem[] = [{ "label": "Home", "link": "/home" },
  {
    "label": "About",
    "subItems": [
      { "label": "Our Team", "link": "/about_team" },
      { "label": "EarthMera", "link": "/about_earthmera" }
    ]
  },
  {
    "label": "Partnership",
    "link": "/partnership"
  },
  {
    "label": "Download",
    "subItems": [
      { "label": "EarthMera", "link": "/home#download" },
      { "label": "DropB", "link": "/dropb" }
    ]
  },
  {
    "label": "Contact",
    "link": "#contact"
  }]

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
      <Logo href="/home">
        <HeaderLogo src='Images/icon_image.png' />
        <LogoText>EarthMera</LogoText>
      </Logo>

      <NavbarMenu isOpen={isOpen}>
        {
          navItems.map((item, i) => {
            return (
              <NavMenuList><LogoIcon className="hidden-icon" src='Images/icon_image.png' />
                {item.subItems ?
                  <HoverContainer style={{ overflow: 'visible' }}>
                    <NavHover id={item.link}>{item.label}</NavHover>
                    <ContainerSubItems className="hidden-subItems">
                      <HoverLinks >{item.subItems.map((subItem, subIndex) => (
                        <NavSubList key={subIndex}><SubNavLink href={subItem.link}>{subItem.label}</SubNavLink></NavSubList>))}
                      </HoverLinks></ContainerSubItems>
                  </HoverContainer> : <NavLink
                    id={item.link}
                    href={item.link}
                  >{item.label}</NavLink>}

              </NavMenuList>
            );
          })
        }
        {
          !isOpen && <LanguageBox>
            <LanguageButton isKorean={isKorean}
              onClick={() => {
                setIsKorean(true)

              }}>KO</LanguageButton>
            <LanguageButton isKorean={!isKorean}
              onClick={() => {
                setIsKorean(false)
              }}>EN</LanguageButton>
          </LanguageBox>
        }
      </NavbarMenu>
      {windowWidth < 1000 && <NavRight>
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