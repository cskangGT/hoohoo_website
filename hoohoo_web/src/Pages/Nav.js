import styled from 'styled-components';
// import Nav from 'react-bootstrap/Nav';

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
  display:block;

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
// class NavLink extends Component {
//   render() {
//     var list = []
    
//   }
// }

// function Navbar() {
//   return (
//     <Bar>
//     <Nav defaultActiveKey="/home" as="ul">
//       <Nav.Item as="li">
//         <Nav.Link href="/home">Active</Nav.Link>
//       </Nav.Item>
//       <Nav.Item as="li">
//         <Nav.Link eventKey="link-1">Link</Nav.Link>
//       </Nav.Item>
//       <Nav.Item as="li">
//         <Nav.Link eventKey="link-2">Link</Nav.Link>
//       </Nav.Item>
//     </Nav>
//     </Bar>
//   );
// }
// export default Navbar;
const Nav = () => {
  const links = [{}];
    return (
        <Bar>
            <Navcontainer>
              <Listcontainer>
                <NavListlink><NavLink id='home' href='#home'> Home</NavLink></NavListlink>
              </Listcontainer>
            </Navcontainer>
        </Bar>
    )
}
export default Nav;