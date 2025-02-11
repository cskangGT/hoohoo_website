import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getNewsList } from '../../api/news.api';
import PageNav from '../../Component/Blog/PageNav';
import FootContact from '../../Component/Footer/FootContact';
import { useLanguage } from '../../Component/hooks/LanguageContext';
import Wrapper from '../../Component/Wrapper/Wrapper';
import { BgImage, theme } from '../../style';
import NewsCard from './News/NewsCard';
import newsData from './News/newsData.json';
import { NewsCategory, NewsDataType } from './News/NewsType';
const Container = styled.div`
  width: calc(100% - 30px);
  display: flex;
  margin: 0px auto;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  padding: 5rem 15px;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  justify-content: center;
`;
const SlickBar = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;

  margin-top: 20px;
`;

const ScrollContainer = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  display: flex;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  align-items: center;
  @media screen and (max-width: 700px) {
    margin-bottom: 0;
    justify-content: space-between;
    overflow-x: scroll;
    white-space: nowrap;
    user-select: none;
    -webkit-overflow-scrolling: touch; // for smooth scrolling on iOS
  }
`;

interface OutlineProps {
  op: string;
  selectedCategory: string;
}
const Outline = styled.button<OutlineProps>`
  opacity: ${props => (props.op === props.selectedCategory ? 1 : 0.3)};
  background: none;
  border: none;
  margin-right: 10px;
  outline: none;
  display: inline-block;
  height: 100%;

  min-height: 1px;
  transition: all 0.2s ease 0s;
  border-radius: 10px;
  &:hover {
    color: ${theme.darkGray};
    opacity: 1;
  }
  @media screen and (max-width: 800px) {
    height: 30%;
  }
`;
const OutlineText = styled.h3`
  color: ${theme.darkGray};
  padding: 5px;
  margin: 0;
  font-size: ${theme.fontSize.md};
  font-weight: 500;
  &:hover {
    color: ${theme.darkGray};
  }
  @media screen and (max-width: 700px) {
    font-size: ${theme.fontSize.sm};
  }
`;
const OFFSET = 10;
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

function NewsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL');
  const [fetchedList, setFetchedList] = useState<NewsDataType[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsDataType | undefined>();
  const [numTotalData, setNumTotalData] = useState<number>(1);

  const {language} = useLanguage();
  const fetchData = async () => {
    const data = newsData.data;
    setFetchedList(data);
    const response = await getNewsList();
    if (response.data) {
      setFetchedList(response.data);
    }
  };
  const changePage = (num: number) => {
    setCurrentPage(num);
    fetchData();
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    fetchData();
  };
  useEffect(() => {
    handleSelectCategory(selectedCategory);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <BgImage bgcolor="white">
        <Wrapper>
          <Container>
            <ContentBox>
              <SlickBar>
                <ScrollContainer>
                  {Object.values(NewsCategory).map(
                    (
                      item: {
                        value: string;
                        text: {
                          ko: string;
                          en: string;
                        };
                      },
                      index: number,
                    ) => (
                      <Outline
                        key={index}
                        op={item.value}
                        selectedCategory={selectedCategory}
                        onClick={() => handleSelectCategory(item.value)}>
                        <OutlineText key={index + 'text'}>
                          {language === 'ko' ? item.text.ko : item.text.en}
                        </OutlineText>
                      </Outline>
                    ),
                  )}
                  {/* {logIn && (
                      <NewBlogBtn onClick={handleOpen}>
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{paddingRight: 10}}
                        />
                        New Blog
                      </NewBlogBtn>
                    )} */}
                </ScrollContainer>
              </SlickBar>
              {fetchedList.length === 0 ? (
                <Text style={{minHeight: 400}}>
                  {language === 'ko' ? '아직 뉴스가 없습니다.' : 'No news yet.'}
                </Text>
              ) : (
                <>
                  <Grid>
                    {' '}
                    {fetchedList.map((item, index) => (
                      <NewsCard key={item.id} item={item} />
                    ))}
                  </Grid>
                  <PageNav
                    pages={Math.ceil(numTotalData / OFFSET)}
                    currentPage={currentPage}
                    changePage={changePage}
                  />
                </>
              )}
            </ContentBox>
          </Container>
        </Wrapper>
      </BgImage>
      <hr style={{color: theme.darkGray, margin: 0}} />
      <FootContact />
    </>
  );
}

export default NewsPage;
