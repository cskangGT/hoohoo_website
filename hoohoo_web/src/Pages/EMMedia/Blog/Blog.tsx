import i18next from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {getBlogList} from '../../../api/blog';
import BlogCard from '../../../components/Blog/BlogCard';
import {
  BlogCategory,
  BlogDataType,
} from '../../../components/Blog/BlogCategory';
import PageNav from '../../../components/Blog/PageNav';
import {useLanguage} from '../../../components/hooks/LanguageContext';
import {theme} from '../../../style';
import BlogModal from './BlogModal';
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
  margin-top: 5px;
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
  font-size: ${theme.fontSize.md};
  font-weight: 500;
  margin: 0px;
  word-break: keep-all;
  &:hover {
    color: ${theme.darkGray};
  }
  @media screen and (max-width: 700px) {
    font-size: ${theme.fontSize.sm};
  }
`;
const Grid = styled.div`
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
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
const UnderLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${theme.darkGray};
`;
const GuideBox = styled.div`
  display: flex;

  margin-bottom: 1.5rem;
`;
const GuideText = styled.div`
  background-color: #d9d9d9;
  color: ${theme.darkGray};
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  opacity: 0.6;
  border-radius: 20px;
  font-weight: 500;
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

const OFFSET: number = 6;

function Blog() {
  const data: any = i18next.t('Blog', {returnObjects: true});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [fetchedList, setFetchedList] = useState<BlogDataType[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogDataType | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [numTotalData, setNumTotalData] = useState<number>(0);
  const handleOpen = () => setIsOpen(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchData = async (category: string, page: number) => {
    // let filteredData: BlogData[];
    // if (category === list[0]) {
    //     filteredData = blogdata;
    // } else {
    //     filteredData = blogdata.filter(item => item.category === category);
    // }
    // setNumTotalData(filteredData.length);
    // const startIndex = Math.max(0, filteredData.length - OFFSET * page);
    // const endIndex = filteredData.length - OFFSET * (page - 1);
    // const slicedData = filteredData.slice(startIndex, endIndex);
    // setFetchedList(slicedData); // 필요한 데이터 OFFSET만큼만 가져온다.
    const response = await getBlogList(
      page,
      category === 'ALL' ? '' : category,
    );
    if (response.data) {
      setNumTotalData(response.data.totalPagesCount);
      setFetchedList(response.data.results);
    }
  };
  const changePage = (num: number) => {
    setCurrentPage(num);
    fetchData(selectedCategory, num);
  };

  const handleSelectCategory = (category: string) => {
    // index는 category index 0 = All
    // e.stopPropagation();
    // category에 대한 데이터 요청
    setSelectedCategory(category);
    setCurrentPage(1);
    fetchData(category, 1);
  };
  useEffect(() => {
    handleSelectCategory(selectedCategory);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    console.log('fetchedList', fetchedList);
  }, [fetchedList]);
  const {language} = useLanguage();
  return (
    <>
      <ContentBox>
        <SlickBar>
          <ScrollContainer>
            {Object.values(BlogCategory).map(
              (
                item: {
                  value: string;
                  text: any;
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

            {isOpen && (
              <BlogModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedBlog={selectedBlog}
              />
            )}
          </ScrollContainer>
        </SlickBar>
        <GuideBox>
          <GuideText>{data.guideText}</GuideText>
        </GuideBox>
        {fetchedList.length === 0 ? (
          <Text style={{minHeight: 400}}>No blog found</Text>
        ) : (
          <>
            <Grid>
              {' '}
              {fetchedList.map((item, index) => (
                <BlogCard
                  key={index}
                  data={item}
                  setSelectedBlog={setSelectedBlog}
                  handleOpen={handleOpen}></BlogCard>
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
    </>
  );
}
export default Blog;
