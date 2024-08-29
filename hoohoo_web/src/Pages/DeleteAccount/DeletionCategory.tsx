import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../style';
import { faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import i18next from 'i18next';
const Container = styled.a`
  width: 100%;
  cursor: pointer;
  background-color: ${theme.darkGray};
  justify-content: center;
  text-decoration: none;
  border-bottom: 1px solid ${theme.white};
  margin: 10px 0px;
  padding-bottom: 10px;
`;
const HorizontalEndToEndView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
type Props = {
    selectedCategory: string;
    categoryConstant: string;
    setCategory: (str: string) => void;
    setIsSelected: (b: boolean) => void;
  };
const Category = styled.p`
  color: ${theme.white};
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  margin: 0px;
  @media screen and (max-width: 800px) {
    
    font-size: 16px;
  }
  @media screen and (max-width: 600px) {
    
    font-size: 14px;
  }
`;

const DeletionCategory = ({
    selectedCategory,
    categoryConstant,
    setCategory,
    setIsSelected,
  }: Props) => {
    const [fontSize, setFontSize] = useState(30);
    const data : any = i18next.t('ManageAccModal', { returnObjects: true });
    const DELETION_CATEGORIES : any = {
        LEAVING_TEMPORAILY:
            data.ReasonProgress.category['LEAVING_TEMPORAILY'],
        DISSATISFIED: data.ReasonProgress.category.DISSATISFIED,
        LACK_OF_TIME: data.ReasonProgress.category.LACK_OF_TIME,
        LACK_OF_NECESSITY:
            data.ReasonProgress.category.LACK_OF_NECESSITY,
        INSUFFICIENT_REWARD_COINS:
            data.ReasonProgress.category.INSUFFICIENT_REWARD_COINS,
        OTHER: data.ReasonProgress.category.OTHER,
      };
    function handleSetCategory() {
      setCategory(categoryConstant);
      setIsSelected(true);
    }
    useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth; 
          if (width < 600) {
            setFontSize(18);
          } else if (width < 800) {
            setFontSize(24);
          } else {
            setFontSize(30);
          }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    return (
      <Container onClick={handleSetCategory}>
        <HorizontalEndToEndView>
          <Category>{DELETION_CATEGORIES[categoryConstant]}</Category>
          <FontAwesomeIcon
            icon={
              categoryConstant === selectedCategory
                ? faCircleDot
                : faCircle
            }
            color={
              categoryConstant === selectedCategory
                ? '#0FB83F'
                : theme.gray
            }
            fontSize={fontSize}
          />
          
        </HorizontalEndToEndView>
      </Container>
    );
  };
  export default DeletionCategory;
  
