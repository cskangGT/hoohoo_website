import {faBars, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../../style';
import {useLanguage} from '../hooks/LanguageContext';
const Logo = styled.button`
  padding: 15px;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const LogoText = styled.span<{language: string}>`
  padding-left: 10px;
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  font-weight: 500;
  color: ${theme.darkGray};
  font-size: ${theme.fontSize['2xl']};
`;

const Bar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  /* backdrop-filter: blur(15px);
  background-color: rgba(0,0,0,0.29); */
  /* &::after {
    content: '';
    position: absolute;
    bottom: 0px; // NavLink 바닥 바로 아래에 위치
    left: 0;
    width: 100%;
    height: 1px;
    background: #000; // 밑줄 색상
    z-index: 300;
  } */
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fffefe;
  justify-content: space-between;
  align-items: center;
  padding: 8px 22px;
  transition: top 0.5s; // 부드러운 애니메이션 효과를 위한 전환
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // 자연스러운 그림자 효과 추가
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 22px;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 5px;
  }
`;
type NavBarProps = {
  isOpen: boolean;
};
const NavbarMenu = styled.ul<NavBarProps>`
  display: flex;
  list-style: none;
  height: 44px;
  margin: 0 -8px;
  width: auto;
  padding-left: 0;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1100px) {
    height: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100% + 16px);

    // 애니메이션 관련 속성 수정
    max-height: ${props => (props.isOpen ? '1000px' : '0')};
    opacity: ${props => (props.isOpen ? '1' : '0')};
    overflow: hidden;
    transition:
      max-height 0.5s ease-in-out,
      opacity 0.3s ease-in-out;
    transform: ${props =>
      props.isOpen ? 'translateY(0)' : 'translateY(-20px)'};
    display: flex; // display: none 제거하고 항상 flex로 설정
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
    margin: 0px 10px;
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
  text-decoration: none;
  color: ${theme.darkGray};
  display: flex;
  padding: 12.5px 15px;
  justify-content: center;
  align-items: center;
  .hidden-icon {
    opacity: 0;
    transition: all 0.5s ease;
  }
  .hidden {
    opacity: 0;
  }
  &:hover {
    border-radius: 5px;
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
    width: calc(100% - 30px);
  }
`;
const NavLink = styled.a`
  text-decoration: none;
  color: ${theme.darkGray};
  font-size: ${theme.fontSize.md};
  padding-left: 10px;
  cursor: pointer;
  position: relative;
  padding-bottom: 5px;
  padding-right: 5px;
  &:hover {
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
  @media screen and (max-width: 1100px) {
    padding: 0px 5px;
  }
`;
const NavRight = styled.div`
  display: flex;
  list-style: none;
  margin: 0 -8px;
  width: auto;
  padding-left: 0;
  align-items: center;
  justify-content: center;
`;
type IsOpen = {
  isOpen: boolean;
};
const MenuToogleButton = styled.button<IsOpen>`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 41px;
  transform: translateY(-50%);
  font-size: 24px;
  color: ${props => (props.isOpen ? theme.mainNeon : theme.darkGray)};
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
    position: absolute;
    right: 40px;
    top: 32px;
  }
`;

const LanguageButton = styled.button<{isActive: boolean}>`
  font-size: 12px;
  color: ${theme.darkGray};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  opacity: ${props => (props.isActive ? 1 : 0.5)};
  padding: 0 ${props => (props.isActive ? 10 : 'auto')};
  &:hover {
    transition: all 0.3s ease;
    opacity: 1;
    color: ${theme.mainNeon};
  }
  &::after {
    content: '';
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
  background-color: #fffefe;
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

  text-decoration: none;
  @media screen and (max-width: 1100px) {
    padding-top: 7px;
  }
`;
const NavSubList = styled.li`
  text-decoration: none;
  display: flex;
  padding: 5px 0;
  padding-right: 15px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1100px) {
    padding: 7px 7px;
  }
`;
const LanguageOutBox = styled.div`
  display: none;
  @media screen and (max-width: 1100px) {
    display: block;
  }
`;
const SubNavLink = styled.a`
  text-decoration: none;
  color: ${theme.darkGray};
  display: flex;
  padding-left: 10px;
  text-align: center;

  cursor: pointer;
  font-size: ${theme.fontSize.sm};
  @media screen and (max-width: 1100px) {
    font-size: ${theme.fontSize.md};
    padding-left: 0px;
    color: #424242;
  }
  &:hover {
    color: ${theme.mainNeon};
  }
`;
const EMLinkBox = styled.div`
  padding: ${theme.spacing.md};
  border-radius: 10px;
  background-color: ${theme.green};
  color: white;
  font-size: ${theme.fontSize.md};
  font-weight: 500;
  margin-left: ${theme.spacing.lg};
  cursor: pointer;
  @media screen and (max-width: 1100px) {
    margin-left: 0;
  }
`;
type NavItem = {
  label: string;
  link?: string;
  subItems?: NavItem[];
  email?: string;
};
type Props = {
  navlist: NavItem[];
  logo: any;
  lang: string[];
};
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
function Nav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const {i18n} = useTranslation();
  const location = useLocation();
  const localizedTexts: any = i18next.t('Nav', {returnObjects: true});
  const navItems: NavItem[] = localizedTexts['navlist'];
  const lang: string[] = localizedTexts['lang'];
  const logo: any = localizedTexts['logo'];
  const {language, setLanguage} = useLanguage();
  const handleLanguageChange = (newLang: string) => {
    // 현재 경로에서 언어 부분 추출
    const currentPath = location.pathname.replace(/^\/(ko|en)/, '');

    const state = location.state;

    if (newLang === 'ko') {
      setLanguage('ko');
      i18n.changeLanguage('ko');
      navigate(`/ko${currentPath}`, state ? {state: {...state}} : {});
    } else {
      setLanguage('en');
      i18n.changeLanguage('en');
      navigate(`/en${currentPath}`, state ? {state: {...state}} : {});
    }
  };
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const handleScroll = (hide: boolean) => {
    const {pageYOffset} = window;
    const deltaY = pageYOffset - pageY;
    if (!hide && deltaY < 0) {
      return;
    }

    const newHide = pageYOffset !== 0 && deltaY >= 0;
    setHide(newHide);
    setPageY(pageYOffset);
  };
  const throttleScroll = throttleHelper(() => handleScroll(hide), 20);
  useEffect(() => {
    document.addEventListener('scroll', throttleScroll);
    return () => document.removeEventListener('scroll', throttleScroll);
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
  const handleLogoClick = () => {
    if (
      window.location.pathname === '/ko' ||
      window.location.pathname === '/en'
    ) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      navigate(language === 'ko' ? '/ko' : '/en');
    }
  };
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const emailAddress = 'support@earthmera.com';
    window.location.href = `mailto:${emailAddress}`;

    // 폴백(fallback) 처리
    setTimeout(() => {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`,
        '_blank',
      );
    }, 300);
  };
  return (
    <Bar style={{top: !hide ? '0' : '-100%'}}>
      <Logo key="logo_link" onClick={handleLogoClick}>
        <HeaderLogo key="logo" src={logo.image} />
        <LogoText key="earthmera" language={language}>
          {logo.text}
        </LogoText>
      </Logo>
      <NavbarMenu isOpen={isOpen}>
        {navItems.map((item, i) => {
          return (
            <NavMenuList key={i}>
              <LogoIcon
                key={i + 'hd_icon'}
                className="hidden-icon"
                src={logo.image}
              />
              {item.subItems ? (
                <HoverContainer
                  className="HoverContainer"
                  key={i + 'hoverContainer'}
                  style={{overflow: 'visible'}}>
                  <NavLink
                    className="NavLink"
                    id={item.link}
                    key={i}
                    href={item.link}>
                    {item.label}
                    <FontAwesomeIcon icon={faCaretDown} className="fa-caret" />
                  </NavLink>
                  <ContainerSubItems
                    className="ContainerSubItems hidden-subItems"
                    key={i + 'hd_subItems'}>
                    <HoverLinks key={i + 'hvLinks'}>
                      {item.subItems.map((subItem, subIndex) => (
                        <NavSubList key={subIndex}>
                          <SubNavLink
                            key={subIndex + 'subLink'}
                            href={subItem.link ? subItem.link : ''}
                            onClick={() => {
                              isOpen && setIsOpen(false);
                            }}>
                            {subItem.label}
                          </SubNavLink>
                        </NavSubList>
                      ))}
                    </HoverLinks>
                  </ContainerSubItems>
                </HoverContainer>
              ) : (
                <HoverContainer
                  className="HoverContainer"
                  key={i + 'hoverContainer'}
                  style={{overflow: 'visible'}}>
                  <NavLink
                    className="NavLink"
                    id={item.link + 'NavLink' + i}
                    key={i}
                    href={item.link ? item.link : undefined}
                    onClick={e => {
                      if (item.email) {
                        // window.location.href = 'mailto:support@earthmera.com';
                        handleEmailClick(e);
                      } else {
                        isOpen && setIsOpen(false);
                      }
                    }}>
                    {item.label}
                  </NavLink>
                </HoverContainer>
              )}
              {windowWidth < 1100 && (
                <LogoIcon
                  key={i + 'hd_icon'}
                  className="hidden"
                  src={logo.image}
                />
              )}
            </NavMenuList>
          );
        })}
        {/* <EMLinkBox
          onClick={() => {
            navigate('/pre-signup');
          }}>
          {localizedTexts.jigu}
        </EMLinkBox> */}
        {/* {!isOpen && (
          <LanguageBox>
            <LanguageButton
              isActive={language === 'ko'}
              onClick={() => {
                handleLanguageChange('ko');
              }}>
              {lang[0]}
            </LanguageButton>
            <LanguageButton
              isActive={language === 'en'}
              onClick={() => {
                handleLanguageChange('en');
              }}>
              {lang[1]}
            </LanguageButton>
          </LanguageBox>
        )} */}
      </NavbarMenu>

      {/* <LanguageOutBox>
        <LanguageBox>
          <LanguageButton
            isActive={language === 'ko'}
            onClick={() => {
              handleLanguageChange('ko');
            }}>
            {lang[0]}
          </LanguageButton>
          <LanguageButton
            isActive={language === 'en'}
            onClick={() => {
              handleLanguageChange('en');
            }}>
            {lang[1]}
          </LanguageButton>
        </LanguageBox>
      </LanguageOutBox> */}

      <MenuToogleButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        <FontAwesomeIcon icon={faBars} />
      </MenuToogleButton>
    </Bar>
  );
}
export default Nav;
