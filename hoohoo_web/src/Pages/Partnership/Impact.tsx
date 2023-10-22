import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import ImpactCard from '../../Component/ContentBox/ImpactCard';
const Container = styled.div`
    display:flex;
    flex-direction: column;
    width: 100% - 40px;
    padding: 30px 20px;
    margin: 20px 0;
    background-color: rgba(57,62,70, 0.25);
    border-radius: 40px;
    position: relative;
    overflow: hidden;
`;

const ImpactHeader = styled.h2`
    color: ${theme.darkGray};
    display: flex;
    justify-content: center;
`;
const FlexBox = styled.div`
    width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 700px) {
     flex-direction: column;
    }
`;
interface ImpactCardProps {
    photoPath: string;
    header: string;
    contents: string;
}
function Impact() {

    const data = {
        header: "YOUR GREEN IMPACT IN NUMBERS",
        content: ""

    }

    const impactData: ImpactCardProps[] = [
        {
            photoPath: 'Images/card1.jpg',
            header: '51,762,170lb',
            contents: 'Annual music festival waste in the US.'
        },
        {
            photoPath: 'Images/card2.jpg',
            header: '5.00lb',
            contents: 'Avergae Daily Waste Generated per Music festival Attendee.'
        },
        {
            photoPath: 'Images/card3.jpg',
            header: '8%',
            contents: 'Recycling Rate of Plastic Waste generatedat the Festival.'
        }
    ]
    return (
        <Container>
            <ImpactHeader>Environmental Impact of the Music Festival</ImpactHeader>
            <FlexBox>
                {impactData.map((item, index) => (
                    <ImpactCard item={item} />
                ))}
            </FlexBox>
        </Container >
    )
}
export default Impact;