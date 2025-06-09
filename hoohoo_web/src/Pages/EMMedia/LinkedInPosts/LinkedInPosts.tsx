import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {theme} from '../../../style';
import PostCardItem from './PostCardItem';
import {LinkedInPostDataType} from './PostType';
import postData from './postData.json';
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
`;
const Grid = styled.div`
  grid-column-gap: 0.2rem;
  grid-row-gap: 3rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  display: grid;
  @media screen and (max-width: 1100px) {
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
    grid-auto-columns: 1fr;
    margin-top: 50px;
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-auto-columns: 1fr;
    margin-top: 50px;
  }
`;
const Text = styled.span`
  color: ${theme.darkGray};
  display: flex;
  width: calc(100% - 60px);
  margin: 20px 30px;
  justify-content: center;
  align-items: center;
  align-items: center;
`;

function LinkedInPosts() {
  const [fetchedList, setFetchedList] = useState<LinkedInPostDataType[]>([]);
  useEffect(() => {
    setFetchedList(postData);
  }, []);
  return (
    <ContentBox>
      <Grid>
        {fetchedList.map((item, index) => (
          <PostCardItem key={item.idx} item={item} />
        ))}
      </Grid>
    </ContentBox>
  );
}

export default LinkedInPosts;
