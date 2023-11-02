import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import { useNavigate } from "react-router-dom";
const Card = styled.div`
    box-shadow: rgba(0, 0, 0, 0.08) 0px 40px 80px 0px;
    background: linear-gradient(253deg, rgba(11, 21, 68, 0.1) 10%, rgba(31, 36, 108, 0.2) 30%);
    backdrop-filter: blur(20px);
    border-radius: 10px;
    width: 45%;
    padding: 10px 10px 30px;
    margin: 0px 12px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1100px) {
        padding: 10px 12px 35px;
    }
    @media screen and (max-width: 700px) {
        width: 100%;
    }
`;
const Image = styled.img`
    width: 100%;
    height: auto;
    border-radius: 5px;
`;
const Content = styled.h2`
  margin-top: 40px;
  color: ${theme.darkGray};
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
`;
const Btn = styled.a`
    text-decoration: none;
    display: flex;
    background-color: ${theme.subNeon};
    height: 50px;
    border-radius: 20px;
    border : none;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    width: 288px;
    margin: 40px auto 0px;
    font-weight: 600;
    justify-content: center;
    align-items:center;
    text-align: center;
    cursor: pointer;
    color: ${theme.darkGray};
    &:hover {
        background-color: ${theme.mainNeon};
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.7);
    }
    @media screen and (max-width: 700px) {
        width: 90%;
    }
`;
type Item = {
    image: string;
    msg: string;
    button: string;
};
type Props = {
    item: Item;
};

function PartnersCardComponent(props: Props) {
    const navigate = useNavigate();
    if (!props.item || !props.item.image) {
        return null;
    }

    function handleClick() {
        navigate(`/coming_soon`);
    }
    return (
        <Card>
            <Image src={props.item.image} />
            <Content>{props.item.msg}</Content>
            <Btn onClick={(event) => {
                event.preventDefault()
                handleClick()
            }}> {props.item.button}</Btn>
        </Card>
    );
}
export default PartnersCardComponent;