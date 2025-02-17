import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getNewsDetail } from '../../../api/news.api';
import { useLanguage } from '../../../components/hooks/LanguageContext';
import Wrapper from '../../../components/Wrapper/Wrapper';
import NewsContent, { NewsContentDataType } from './NewsContent';
const Container = styled.div`
  margin-top: 80px;
`;

const LoadingBox = styled.div`
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function NewsDetailPage() {
  const {state} = useLocation();
  const {idx, title, url, uploadAt} = state;
  const {language} = useLanguage();
  const [detailData, setDetailData] = useState<NewsContentDataType | null>(
    {
      idx: idx,
      url: url,
      title: title,
      uploadAt: uploadAt,
      author: '',
      data: [],
    }
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    getNewsDetail(Number(idx), language)
      .then(response => {
        console.log('response', response);

        setDetailData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  }, [idx]);
  return (
    <Wrapper>
      <Container>
        {isLoading ? (
          <LoadingBox>
            <div>Loading...</div>
          </LoadingBox>
        ) : (
          detailData && <NewsContent detailData={detailData} />
        )}
      </Container>
    </Wrapper>
  );
}

export default NewsDetailPage;
