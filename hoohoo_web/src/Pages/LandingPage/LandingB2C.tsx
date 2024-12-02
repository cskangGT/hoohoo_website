import i18next from 'i18next';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../../style';
const Background = styled.section`
  background-color: #fffefe;
  display: flex;
  width: 100%;
  margin-top: 50px;
`;
const Cell = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;
const LeftCell = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55%;
  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;
const RightCell = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(45%);
  padding: 30px 50px;
  position: relative;
  @media screen and (max-width: 1100px) {
    width: calc(100% - 30px);
    padding: 30px 15px;
    align-items: center;
    margin-bottom: 30px;
  }
`;
const Header = styled.h4`
  color: ${theme.darkGray};
  letter-spacing: 0.4px;
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 0.8rem;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  font-family: 'Fredoka';
  @media screen and (max-width: 800px) {
    text-align: center;
    font-size: 2rem;
    margin-top: 10px;
  }
`;
const Title = styled.h3`
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${theme.darkGray};
  @media screen and (max-width: 800px) {
    margin-top: 0.7rem;
    font-size: 1.5rem;
  }
`;
const Title2 = styled.h3`
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  padding-left: 5px;
  color: #ff7b27;
  @media screen and (max-width: 800px) {
    margin-top: 0.7rem;
    font-size: 1.5rem;
  }
`;
const Content = styled.p`
  letter-spacing: -0.5px;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.darkGray};
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  @media screen and (max-width: 800px) {
    text-align: center;
    font-size: 1.3rem;
  }
`;
export const PartnerButton = styled.a`
  font-size: 26px;
  font-weight: 500;
  cursor: pointer;
  line-height: 1.5;
  text-decoration: none;
  border-radius: 30px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  margin: 1rem 0;
  margin-top: 40px;
  background-color: ${theme.mainNeon};
  color: ${theme.darkGray};
  width: 70%;
  text-align: center;
  padding: 12px 30px;
  font-family: 'Fredoka';
  @media screen and (max-width: 1100px) {
    font-size: 22px;
    margin-right: 0;
    margin-top: 20px;
    width: auto;
  }
`;
const TitleBox = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 1100px) {
    justify-content: center;
  }
`;
const LeftImage = styled.img`
  object-fit: contain;
  width: 90%;
  overflow: hidden;
  border-radius: 20px;
  @media screen and (max-width: 1100px) {
    position: relative;
    object-fit: cover;
    top: 0;
    left: 0;
  }
`;
const HighlightedText = styled.span`
  color: #ff7b27;
`;
interface DataProps {
  image: string;
  header: string;
  firstDesc: {
    part1: string;
    part2: string;
  };
  secDesc: {
    part1: string;
    part2: string;
  };
  highlight: string;
  button: string;
}
function LandingB2C() {
  const data: DataProps = i18next.t('b2c', {returnObjects: true});
  const navigate = useNavigate();
  const handleOpen = () => {
    navigate('/submitform');
  };
  return (
    <Background>
      <Cell>
        <LeftCell>
          <LeftImage src={data.image} />
        </LeftCell>
        <RightCell>
          <Header>
            {data.header.split(data.highlight).map((segment, index, array) =>
              index === array.length - 1 ? (
                segment
              ) : (
                <>
                  {segment}
                  <HighlightedText>{data.highlight}</HighlightedText>
                </>
              ),
            )}
          </Header>
          <TitleBox>
            <Title>{data.firstDesc.part1}</Title>
            <Title2>{data.firstDesc.part2}</Title2>
          </TitleBox>
          <Content>
            {data.secDesc.part1}
            <br /> {data.secDesc.part2}
          </Content>
          <PartnerButton onClick={handleOpen}>{data.button}</PartnerButton>
        </RightCell>
      </Cell>
    </Background>
  );
}
export default LandingB2C;
