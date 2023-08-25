import styled from 'styled-components';
// import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterestP } from '@fortawesome/free-brands-svg-icons';
const Logo = styled.div`
  
`;
const Bar = styled.nav`
  background-color: transparent;
  border-color: transparent;
  border-radius: 4px;
  position: relative;
  min-height: 50px;
  margin-bottom: 25px;
  border: 1px solid transparent;
`;
const Navcontainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
`;
const Listcontainer = styled.ul`
    float: left;
    margin:0;
    margin-left: -15px;
`;
const NavListlink = styled.li`
  position: relative;
  display: block;

`;
const NavLink = styled.a`
  padding-bottom: 12.5px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 12.5px;
  font-size: 18px;
  text-align: center;
  line-height: 25px;
  background-color: transparent;
  color:rgba(255, 255, 255, 0.7);
`;
const LogoIcon = styled.i`
  
`;
const Nav = () => {
  const links = [{}];
  return (
    <header>
      <Logo>
        <FontAwesomeIcon icon={faPinterestP} size='xl' style={{ color: "#f1f1f1" }} />
        Logo</Logo>
      <Bar>
        <Navcontainer>
          <Listcontainer>
            <NavListlink><NavLink id='home' href='#home'> Home</NavLink></NavListlink>
          </Listcontainer>
        </Navcontainer>
      </Bar>
    </header>
  )
}
export default Nav;