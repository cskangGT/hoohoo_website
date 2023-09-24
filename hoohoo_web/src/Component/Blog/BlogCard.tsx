import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';

const Card = styled.div`
    box-shadow: rgba(0, 0, 0, 0.08) 0px 40px 80px 0px;
    background: linear-gradient(253deg, rgba(200, 200, 200, 0.1) 10%, rgba(252, 230, 187, 0.3) 30%);
    backdrop-filter: blur(20px);
    border-radius: 15px;
    width: 350px;
    cursor: pointer;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    @media screen and (max-width: 1100px) {
        padding: 10px 12px 35px;
        width: auto;
    }
    &:hover {
        box-shadow:
            inset 0 -3em 3em rgba(0, 0, 0, 0.1),
            0 0 0 2px rgba(113, 247, 69, 0.7),
            0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
    }
`;
const Image = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
`;
const Title = styled.h3`
  margin-top: 10px;
  font-size: 22px;
  color: ${theme.white};
  margin-bottom: 5px;
`;
const Content = styled.h3`
  margin-top: 0px;
  color: ${theme.white};
  font-size: 12px;
`;
const ContainerCD = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    margin-bottom: .25rem;
`;
interface CategoryProps {
    color: string;
}
const CategoryBox = styled.div<CategoryProps>`
    letter-spacing: .3px;
    font-size: .725rem;
    line-height: 1.7;
    border-radius: 20px;
    margin-right: 0.5rem;
    padding: 0.25rem 0.75rem;
    background-color: ${props => props.color};
`;
const DateBox = styled.div`
    letter-spacing: .3px;
    font-size: .725rem;
    line-height: 1.7;
`;
const Btn = styled.a`
    text-decoration: none;
    display: flex;
    background-color: ${theme.subNeon};
    height: 50px;
    border-radius: 20px;
    border : none;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    width:288px;
    margin: 40px auto 0px;
    font-weight: 600;
    justify-content: center;
    align-items:center;
    text-align: center;
    color: ${theme.darkGray};
    &:hover {
        background-color: ${theme.mainNeon};
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.7);
    }
`;
type BlogData = {
    'image': string;
    'category': string;
    'date': string;
    'title': string;
    'desc': string;
};
type Props = {
    data: BlogData;
};

function BlogCard(props: Props) {
    if (!props.data || !props.data.image) {
        return null;
    }
    let color: string;
    if (props.data.category === "Trash-Picking") {
        color = '#FFADAD'
    } else if (props.data.category === "Reuse") {
        color = '#FFD6A5'
    } else if (props.data.category === "Recycle") {
        color = '#aae0d4'
    } else if (props.data.category === "Transportation") {
        color = '#FDFFB6'
    } else {
        color = '#D9EDF8'
    }
    return (
        <Card onClick={() => console.log('blog')} >
            <Image src={props.data.image} />
            <Title>{props.data.title}</Title>
            <ContainerCD>
                <CategoryBox color={color}>
                    {props.data.category}
                </CategoryBox>
                <DateBox>{props.data.date}</DateBox>
            </ContainerCD>
            <Content>{props.data.desc}</Content>
        </Card>
    );
}
export default BlogCard;