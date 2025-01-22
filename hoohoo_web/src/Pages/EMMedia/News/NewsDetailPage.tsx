import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {getNewsDetail} from '../../../api/news.api';
import {useLanguage} from '../../../Component/hooks/LanguageContext';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import NewsContent, {NewsContentDataType} from './NewsContent';
const Container = styled.div`
  margin-top: 80px;
`;

function NewsDetailPage() {
  const {id} = useParams<{id: string}>();
  const {language} = useLanguage();
  const [detailData, setDetailData] = useState<NewsContentDataType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    getNewsDetail(Number(id))
      .then(response => {
        console.log('response', response);

        setDetailData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  }, [id]);
  return (
    <Wrapper>
      <Container>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          detailData && <NewsContent detailData={detailData} />
        )}
      </Container>
    </Wrapper>
  );
}

export default NewsDetailPage;
