import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import {
  Container,
  Desc,
  HorizonContainer,
  Image,
  LeftBox,
  RightBox,
} from '../../../Component/ContentBox/TwoColBoxesSection';
import {useLanguage} from '../../../Component/hooks/LanguageContext';
import {theme} from '../../../style';
const MidTitle = styled(Desc)`
  font-weight: 700;
  font-size: 1.3rem;
  @media screen and (max-width: 1000px) {
    margin: 20px 0;
    width: 100%;
    text-align: center;
    font-size: 1.3rem;
  }
  @media screen and (max-width: 500px) {
    margin: 10px 0;
    font-size: 1.1rem;
  }
`;
type DataProps = {
  header: string;
  content: string;
  image: string;
  lineImage?: string;
  midcontent?: string;
};
type Props = {
  data: DataProps;
  flip?: boolean;
  index?: number;
  children?: React.ReactNode;
  imageHeight?: number;
  imageWidth?: number | string;
  imageComponent?: React.ReactNode;
};

export default function Community(props: Props) {
  let i: number = props.index ? props.index : 0;
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const {language} = useLanguage();
  // 화면 크기에 따라 isLargeScreen 상태를 설정합니다.
  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 1000);
    }

    // resize 이벤트 리스너를 추가합니다.
    window.addEventListener('resize', handleResize);
    // 초기 설정을 위해 함수를 한 번 호출합니다.
    handleResize();

    // 컴포넌트 언마운트 시 이벤트 리스너를 제거합니다.
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Container>
      <HorizonContainer style={{position: 'relative'}} rightImage={props.flip}>
        <RightBox>
          <LinedHeader
            data={{header: props.data.header, lineImage: props.data.lineImage}}
            style={{color: theme.darkGray, textAlign: isLargeScreen && 'left'}}
          />
          {props.data.midcontent && (
            <Desc dangerouslySetInnerHTML={{__html: props.data.midcontent}} />
          )}
          <Desc dangerouslySetInnerHTML={{__html: props.data.content}} />
        </RightBox>
        <LeftBox>
          {props.imageComponent ? (
            props.imageComponent
          ) : (
            <Image
              src={props.data.image}
              height={props.imageHeight}
              width={props.imageWidth}
            />
          )}
        </LeftBox>
        {props.children && props.children}
      </HorizonContainer>
    </Container>
  );
}
