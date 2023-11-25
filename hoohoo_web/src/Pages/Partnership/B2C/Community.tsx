import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../style';
import LinedHeader from '../../../Component/ContentBox/LinedHeader'
import {Container, HorizonContainer, LeftBox, Image, RightBox, Desc, } from '../../../Component/ContentBox/TwoColBoxesSection'
const MidTitle = styled(Desc)`
  font-weight: 700;
  padding: 10px 0;
  font-size: 1.7rem;
  padding-bottom: 30px;
`;
type DataProps = {
    header: string;
    content: string;
    image: string;
    lineImage?: string;
    midcontent: string;
}
type Props = {
    data : DataProps;
    flip? : boolean;
    index? : number;
}

export default function Community(props : Props) {
    let i: number = props.index ? props.index : 0;
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    // 화면 크기에 따라 isLargeScreen 상태를 설정합니다.
    useEffect(() => {
        function handleResize() {
            setIsLargeScreen(window.innerWidth > 800);
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
                    {
                        (i === 0 || !(!isLargeScreen && (i === 1 || i === 2))) && 
                        <LinedHeader 
                            data={{header:props.data.header, 
                            lineImage: props.data.lineImage}}
                            style={{color: theme.darkGray, textAlign: isLargeScreen && 'left'}}  
                        />
                    }
                        <MidTitle dangerouslySetInnerHTML={{__html: props.data.midcontent}} />
                        <Desc>
                            {props.data.content}
                        </Desc>       
                    </RightBox>
                    <LeftBox>
                        <Image src={props.data.image} />
                    </LeftBox>
                    
                </HorizonContainer>
        </Container >
    )
}
