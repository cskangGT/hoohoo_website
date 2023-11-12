import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
const HeaderContainer = styled.div`
  display: inline-block;
  margin-bottom: 30px;
  justify-content: center;
  @media screen and (max-width: 500px){
        margin-bottom: 10px;
    }
`;
const Header = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 3.7rem;
  line-height: 1;
  text-align: left;
  font-family:'Fredoka';
  @media screen and (max-width: 500px){
        text-align: center;
    }
`;
const Line = styled.img<{dynamicWidth: number}>`
  width: ${props => props.dynamicWidth}px;
`;
type Props = {
  style? : {};
    data: any;
    color?: string;
}
export default function LinedHeader(props : Props) {
    const [headerWidth, setHeaderWidth] = useState<number>(0);
    const headerRef = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        if (headerRef.current) {
            setHeaderWidth(headerRef.current.offsetWidth);
          }
    }, []); // props.data.header가 변경될 때마다 실행
    return (
      <HeaderContainer>
        <Header ref={headerRef} style={{color: props.color && props.color, ...props.style}}
        dangerouslySetInnerHTML={{__html: props.data.header}} />
        <Line src={props.data.lineImage} dynamicWidth={headerWidth} />
      </HeaderContainer>
    )
}