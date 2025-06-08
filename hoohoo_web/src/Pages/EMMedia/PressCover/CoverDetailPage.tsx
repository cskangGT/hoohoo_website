import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useLanguage} from '../../../components/hooks/LanguageContext';

import {FaArrowLeft} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import Wrapper from '../../../components/Wrapper/Wrapper';
import {theme} from '../../../style';
import DetailContent from './DetailContent';
import {coverDetailDataEN, coverDetailDataKO} from './presscoverData';
const Container = styled.div`
  margin-top: 80px;
`;
export const BackButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  border-radius: 30px;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: ${theme.fontSize.rg};
  color: ${theme.inActiveGray};
  margin-top: 10px;
`;
export const BackButtonIcon = styled(FaArrowLeft)`
  padding: 0px;
  font-size: ${theme.fontSize.md};
  color: ${theme.darkGray};
`;
function CoverDetailPage() {
  const {language} = useLanguage();
  const navigate = useNavigate();
  const [detailData, setDetailData] = useState(
    language === 'ko' ? coverDetailDataKO : coverDetailDataEN,
  );
  useEffect(() => {
    setDetailData(language === 'ko' ? coverDetailDataKO : coverDetailDataEN);
  }, [language]);
  console.log('detailData', detailData);

  return (
    <Wrapper>
      <Container>
        {detailData && (
          <DetailContent
            detailData={detailData.data}
            title={detailData.title}
          />
        )}
      </Container>
    </Wrapper>
  );
}

export default CoverDetailPage;
