import i18next from 'i18next';
import React, {useState} from 'react';
import styled from 'styled-components';
import {sendCode} from '../../api/deleteAcc';
import {theme} from '../../style';
import DeletionCategory from './DeletionCategory';
import {GreenLongNextButton} from './EmailProgress';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const BackButton = styled.a`
  position: absolute;
  left: 0px;
  top: 0px;
  cursor: pointer;
  padding: 20px 0px;
  @media screen and (max-width: 800px) {
    padding: 14px 0px;
  }
  @media screen and (max-width: 600px) {
    padding: 12px 0px;
  }
  @media screen and (max-width: 400px) {
    padding: 10px 0px;
  }
`;
const DescriptionInput = styled.textarea`
  height: 200px;
  border-radius: 10px;
  border-color: ${theme.white};
  width: 70%;
  font-size: 20px;
  color: ${theme.white};
  padding: 10px;
  background-color: rgba(79, 79, 79, 0.4);
  outline: none;
  border-width: 1px;
  box-shadow: 0px 4px 20px 0px transparent;
  transition:
    0.3s background-color ease-in-out,
    0.3s box-shadow ease-in-out,
    0.1s padding ease-in-out;
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
  &:focus {
    border-color: #21ff37;
  }
  @media screen and (max-width: 800px) {
    height: 150px;
    width: 80%;
    font-size: 18px;
  }
  @media screen and (max-width: 600px) {
    height: 120px;
    width: 90%;
    font-size: 14px;
  }
`;
const ContentContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    width: 90%;
  }
  @media screen and (max-width: 600px) {
    width: 95%;
  }
`;
const InfoText = styled.p`
  font-size: 20px;
  width: 90%;
  text-align: left;
  padding: 10px 0px;
  color: rgba(255, 255, 255, 0.8);
  @media screen and (max-width: 800px) {
    padding: 6px 0px;
    font-size: 16px;
  }
  @media screen and (max-width: 600px) {
    padding: 4px 0px;
    font-size: 14px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 300px;
  margin: 10px 0px;
  border-radius: 20px;
  @media screen and (max-width: 800px) {
    height: 200px;
  }
  @media screen and (max-width: 600px) {
    height: 150px;
  }
`;

const categories = [
  'LEAVING_TEMPORAILY',
  'DISSATISFIED',
  'LACK_OF_TIME',
  'LACK_OF_NECESSITY',
  'INSUFFICIENT_REWARD_COINS',
  'OTHER',
];
type Props = {
  setDeleteAccProgress: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setReason: React.Dispatch<React.SetStateAction<string>>;
  reason: string;
  category: string;
  email: string;
};
function ReasonProgress({
  setDeleteAccProgress,
  setReason,
  reason,
  setCategory,
  category,
  email,
}: Props) {
  const data: any = i18next.t('ManageAccModal', {returnObjects: true});
  // const [fontSize, setFontSize] = useState(44);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const handleDescriptionChange = (event: any) => {
    const newDesc = event.target.value;
    setDescription(newDesc);
  };
  const nextStep = async () => {
    const {isRegistered} = await sendCode(email);
    if (isRegistered) {
      setReason(description);
      setDeleteAccProgress(3);
    } else {
    }
  };
  return (
    <>
      <ContentContainer>
        <InfoText>{data.ReasonProgress.title}</InfoText>
        <Image
          src={require('../../../public/Images/delete_account_asset.jpeg')}
        />
        <InfoText>{data.ReasonProgress.content}</InfoText>
        {categories.map((categoryConstant: string) => (
          <DeletionCategory
            key={categoryConstant}
            selectedCategory={category}
            categoryConstant={categoryConstant}
            setCategory={setCategory}
            setIsSelected={setIsSelected}
          />
        ))}
      </ContentContainer>
      {category === 'OTHER' && (
        <DescriptionInput
          placeholder={data.ReasonProgress.placeholder}
          value={description}
          onChange={handleDescriptionChange}
          maxLength={400}
        />
      )}
      <GreenLongNextButton unable={!isSelected} onClick={nextStep}>
        {data.ReasonProgress.next}
      </GreenLongNextButton>
    </>
  );
}

export default ReasonProgress;
