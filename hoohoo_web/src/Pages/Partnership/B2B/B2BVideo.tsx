import i18next from 'i18next';
import React, { useState } from 'react';
import styled from 'styled-components';
import LinedHeader from '../../../components/ContentBox/LinedHeader';
import Wrapper from '../../../components/Wrapper/Wrapper';
import { theme } from '../../../style';
import PartnerModal from '../PartnerModal';

const Bg = styled.section`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;

  video {
    width: 100%;
    height: auto;
    min-height: 100vh;
    object-fit: cover;
    z-index: -1;
  }
`;

const Container = styled.div`
  position: relative;
  margin-bottom: 40px;
  width: calc(100%);
  height: 100vh;
`;
const Button = styled.button`
  text-decoration: none;
  background-color: #006dff;
  width: 250px;
  height: 60px;
  font-size: 36px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20%;
  font-family: 'Fredoka';
  color: ${theme.white};
  border-radius: 30px;
  border-color: #006dff;
  @media screen and (max-width: 700px) {
    font-size: 22px;
  }
`;

export default function B2BVideo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const data: any = i18next.t('b2bvideo', {returnObjects: true});
  return (
    <Bg>
      <Wrapper>
        <Container>
          <video autoPlay loop muted playsInline>
            <source src={data.video} type="video/mp4" />
          </video>
          <LinedHeader
            data={{header: data.header}}
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '4.5rem',
              color: theme.white,
              zIndex: 10,
              textAlign: 'center',
            }}
          />
          <LinedHeader
            data={{header: data.content}}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '2.4rem',
              color: theme.white,
              zIndex: 10,
              textAlign: 'center',
              width: '100%',
            }}
          />
          <Button
            onClick={() => {
              setIsOpen(true);
            }}>
            {data.button}
          </Button>
          {isOpen && <PartnerModal isOpen={isOpen} setIsOpen={setIsOpen} />}
        </Container>
      </Wrapper>
    </Bg>
  );
}
