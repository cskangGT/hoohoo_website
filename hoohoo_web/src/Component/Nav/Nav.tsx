import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { theme } from '../../style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useNavigate } from 'react-router-dom';
const Logo = styled.button`
  padding: 15px;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
  border: none;
  background-color: #FFFEFE;
`;

const LogoText = styled.span`
  padding-left: 10px;
  font-family: Fredoka;
  color: ${theme.darkGray };
`;

const Bar = styled.nav`
  position: fixed;
  
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  /* backdrop-filter: blur(15px);
  background-color: rgba(0,0,0,0.29); */
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #FFFEFE;
  justify-content: space-between;
  align-items: center;
  padding: 8px 22px;
  transition: top 0.5s; // 부드러운 애니메이션 효과를 위한 전환
  &::after {
    content: '';
    position: absolute;
    bottom: 0px; // NavLink 바닥 바로 아래에 위치
    left: 0;
    width: 100%;
    height: 1px;
    background: #000; // 밑줄 색상
    z-index: 300;
    
  }
  @media screen and (max-width: 1100px) {
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
  @media screen and (max-width: 1100px) {
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
const HoverContainer = styled.div`
  cursor: pointer;
  color: ${theme.darkGray};
  position: relative;
  @media screen and (max-width: 1100px) {
    margin-left: 10px;
    align-items: center;
    justify-content: center;
  }
  .fa-caret {
    transition: transform 0.2s ease;
    transform-origin: center; // 중앙을 기준으로 회전
    margin-left: 5px;
  }
  &:hover {
    border-radius: 4px;
    .fa-caret {
      transform: rotate(180deg); // 호버 시 180도 회전
    }
    .hidden-subItems {
      display: block;
      transition: all 0.5s ease;
    }
  }
`;
const NavMenuList = styled.li`
  text-decoration : none;
  color: ${theme.darkGray};
  display: flex;
  padding : 12.5px 15px;
  justify-content: center;
  align-items: center;
  .hidden-icon {
    opacity: 0;
    transition: all 0.5s ease; 
  }
  &:hover {
    border-radius: 5Px;
    .NavLink::after {
      width: 100%;
    }
    .hidden-icon {
      opacity: 1;
      transition: all 0.5s ease;
      transform: rotate(360deg);
    }
    .HoverContainer {
      border-radius: 4px;
      .fa-caret {
        transform: rotate(180deg);
      }
    }
    .ContainerSubItems {
      display: block;
      margin-top: 10px;
      transition: all 0.5s ease;
    }
  }
  @media screen and (max-width: 1100px) {
    align-items: start;
    text-align: center;
    width: 100%;
  }
`;
const NavLink = styled.a`
  text-decoration : none;
  color: ${theme.darkGray};
  font-size: 18px;
  padding-left: 10px;
  cursor: pointer;
  position: relative;
  padding-bottom: 5px;
  padding-right: 5px;
  &:hover  {
    border-radius: 4px;
    color: ${theme.mainNeon};
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0px; // NavLink 바닥 바로 아래에 위치
    left: 0;
    width: 0; // 기본 상태에서는 가로선이 보이지 않음
    height: 2px;
    background: #000; // 밑줄 색상
    transition: width 0.3s ease-in-out;
    
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
type IsOpen ={
  isOpen : boolean;
}
const MenuToogleButton = styled.button<IsOpen>`
  background: none;
  border: none;
  cursor: pointer;  
  position: absolute;
  right: 32px;
  top: 25px;
  font-size: 24px;
  color: ${props => props.isOpen ? theme.mainNeon: theme.darkGray};
  display: none;
  @media screen and (max-width: 1100px) {
    display: block;
  }
  &:hover {
    transition: all 0.3s ease;
  }
`;

const LanguageBox = styled.div`
  margin: 0 30px;
  display: block;
  @media screen and (max-width: 1100px) {
    display: none;
    position: absolute;
    right: 45px;
    top: 25px;
  }
`;
const LanguageBoxSecond = styled.div<LanguageProps>`
  margin: 0 30px;
  display: none;
  @media screen and (max-width: 1100px) {
    display: block;
    position:absolute;
    right: ${props => (props.isKorean ? 60 : 45)}px;
    top: 27px;
  }
`;
type LanguageProps =
  {
    isKorean: boolean;
  }

const LanguageButton = styled.button<LanguageProps>`
  font-size: 12px;
  color: ${theme.darkGray};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  opacity: ${props => (props.isKorean ? 1 : 0.5)};
  padding: 0 ${props => (props.isKorean ? 10 : 'auto')};
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
    width: 1px;
    height: 20px;
    background-color: gray;
    transform: translateY(-50%);
  }
  &:last-child::after {
    display: none;
  }
`;
const ContainerSubItems = styled.div`
  position: absolute;
  display: none;
  width: 150px;
  border-radius: 15px;
  left: 50%; // Start by aligning the left edge to the center
  top: 100%;
  transform: translate(-50%, 0); // Center it horizontally
  padding: 10px 0;
  z-index: 10000;
  background-color: #FFFEFE;
  transition: top 0.5s ease;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); 
  @media screen and (max-width: 1100px) {
    padding: 0;
    backdrop-filter: none;
  background-color: transparent;
    position: relative;
    align-items: center;
    justify-content: center;
  }
`;

const HoverLinks = styled.ul`
  padding: 0;
  
  text-decoration : none;
  @media screen and (max-width: 1100px) {
    padding-top: 7px; 
  }
`;
const NavSubList = styled.li`
  text-decoration : none;
  display: flex;
  padding: 5px 0;
  padding-right: 15px; 
  align-items: center;
    justify-content: center;
  @media screen and (max-width: 1100px) {
    padding : 7px 7px;
  }
`;
const SubNavLink = styled.a`
  text-decoration : none;
  color: ${theme.darkGray};
  display: flex;
  padding-left: 10px;
  text-align: center; 
  cursor: pointer;
  @media screen and (max-width: 1100px) {
    font-size: 14px;  
    padding-left: 0px;
    color: #424242;
  }
  &:hover {
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
type Props = {
  navlist: NavItem[];
  logo: any;
  lang: string[];
}
export const throttleHelper = (callback: () => void, waitTime: number) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, waitTime);
  };
};
function Nav({ isKorean, setIsKorean }: NavProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const { i18n } = useTranslation();
  const data: Props = i18next.t('Nav', { returnObjects: true })
  const navItems: NavItem[] = data["navlist"]
  const lang: string[] = data["lang"]
  const logo: any = data["logo"]
  const changelanguageToKo = () => i18n.changeLanguage('ko')
  const changelanguageToEn = () => i18n.changeLanguage('en')
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const handleScroll = (hide: boolean) => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    if (!hide && deltaY < 0) {
      return;
    }
  
    const newHide = pageYOffset !== 0 && deltaY >= 0;
    setHide(newHide);
    setPageY(pageYOffset);
  };
  const throttleScroll = throttleHelper(()=>handleScroll(hide), 20);
  useEffect(() => {
    document.addEventListener("scroll", throttleScroll);
    return () => document.removeEventListener("scroll", throttleScroll);
  }, [throttleScroll]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Bar style={{ top: !hide ? '0' : '-100%' }}>
      <Logo key="logo_link" onClick={()=> {
        navigate(logo.link);
      }}>
        <HeaderLogo key="logo" src={logo.image} />
        <LogoText key="earthmera">{logo.text}</LogoText>
      </Logo>
      <NavbarMenu isOpen={isOpen}>
        {
          navItems.map((item, i) => {
            return (
              <NavMenuList key={i} >
                <LogoIcon key={i + "hd_icon"} className="hidden-icon" src='Images/icon_image.png' />
                {item.subItems ?
                  <HoverContainer className="HoverContainer" key={i + "hoverContainer"} style={{ overflow: 'visible' }} >
                    <NavLink 
                    className="NavLink"
                    id={item.link}
                    key={i}
                  >{item.label}<FontAwesomeIcon icon={faCaretDown} className="fa-caret" />
                  </NavLink>
                    <ContainerSubItems className="ContainerSubItems hidden-subItems" key={i + "hd_subItems"}>
                      <HoverLinks key={i + "hvLinks"} >
                        {
                          item.subItems.map((subItem, subIndex) => (
                            <NavSubList key={subIndex}>
                              <SubNavLink key={subIndex + "subLink"} onClick={() => {
                                if (subItem.label === "Contact") {
                                  window.location.href = "mailto:devceohoony@gmail.com";
                                } else {
                                  navigate(subItem.link ? subItem.link : "");
                                }
                                isOpen && setIsOpen(false);
                              }}>
                                {subItem.label}
                              </SubNavLink>
                            </NavSubList>
                          ))
                        }
                      </HoverLinks>
                      </ContainerSubItems>
                  </HoverContainer> : <HoverContainer className="HoverContainer" key={i + "hoverContainer"} style={{ overflow: 'visible' }} ><NavLink
                    className="NavLink"
                    id={item.link}
                    key={i}
                    onClick={() => {
                        navigate(item.link ? item.link : "");
                      isOpen && setIsOpen(false);
                    }}
                  >{item.label}</NavLink></HoverContainer>}
              </NavMenuList>
            );
          })
        }
        {
          !isOpen && <LanguageBox>
            <LanguageButton isKorean={isKorean}
              onClick={() => {
                setIsKorean(true)
                changelanguageToKo()
              }}>{lang[0]}</LanguageButton>
            <LanguageButton isKorean={!isKorean}
              onClick={() => {
                setIsKorean(false)
                changelanguageToEn()
              }}>{lang[1]}</LanguageButton>
          </LanguageBox>
        }
      </NavbarMenu>
      {windowWidth < 1100 && <NavRight>
        <LanguageBoxSecond isKorean={isKorean}>
          <LanguageButton isKorean={isKorean}
            onClick={() => {
              setIsKorean(true)
              changelanguageToKo()
            }}>{lang[0]}</LanguageButton>
          <LanguageButton isKorean={!isKorean}
            onClick={() => {
              setIsKorean(false)
              changelanguageToEn()
            }}>{lang[1]}</LanguageButton>
        </LanguageBoxSecond>
      </NavRight>}

      <MenuToogleButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        <FontAwesomeIcon icon={faBars} />
      </MenuToogleButton>
    </Bar >
  )
}
export default Nav;