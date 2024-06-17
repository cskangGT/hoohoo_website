import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BgImage, theme } from '../../../style';
import BlogCard from '../../../Component/Blog/BlogCard';
import PageNav from '../../../Component/Blog/PageNav';
import BlogModal from './BlogModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import FootContact from '../../../Component/Footer/FootContact';
import {BlogCategory, BlogData} from './type';
import { getBlogList } from '../../../api/blog';
const Container = styled.div`
    width: calc(100% - 30px);
    display: flex;
    margin: 0px auto;
    flex-direction: column;
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
display: flex;
  overflow: visible;
  
  margin: 0;
  padding: 0;
  
  padding-top: 10px;
  margin-top: 10px;
`;

// 아래가 LeftBar
const ScrollContainer = styled.div`
    margin-bottom: 10px;
    padding-bottom: 10px;
    display: flex;
    border-bottom: 2px solid #12121232;
    width: 100%;
    
    overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch; // for smooth scrolling on iOS
  user-select: none;

  /* Hide the scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
    
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
    op: number;
    selectedIndex: number;
}
const Outline = styled.button<OutlineProps>`
      opacity: ${props => props.op === props.selectedIndex ? 1 : 0.3};
  background: none;
  border: none;
  margin-right: 10px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: all 0.2s ease 0s;
  border-radius: 10px;
  white-space: nowrap;
    &:hover {
        background-color: ${theme.darkGray};
        color: ${theme.white};
    }
    @media screen and (max-width: 800px) {
        height: 100%;
  }
`;
const OutlineText = styled.h3`
    color: ${theme.darkGray};
    padding: 5px;
    margin : 0;
    font-size: 18px;
    margin: 0px 10px;
    margin-bottom: 7px;
    
    &:hover {
        color: ${theme.white};
    }
    @media screen and (max-width: 700px){
        font-size: 14px;
    }
`;
const Grid = styled.div`
    min-height: 400px;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    display: grid;
    @media screen and (max-width: 1100px){
        grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
    grid-auto-columns: 1fr;
    margin-top: 50px;
    }
    @media screen and (max-width: 700px){
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

const OFFSET: number = 30;

const NewBlogBtn = styled.button`
// margin : 20px 5px;
    font-size: 20px;
    font-weight: 300;
    cursor: pointer;
    text-decoration: none;
    
    background-color: transparent;
    color: ${theme.darkGray};
  /* padding: 10px 15px; */
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    min-height: 1px;
    transition: all 0.2s ease 0s;
    border-radius: 10px;
    padding: 10px;
    &:hover{
        color: ${theme.mainNeon};
    }
`;
const BlogTitleText = styled.h2`
  font-size: 30px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 50px 0;
  font-family: 'Fredoka';
  @media screen and (max-width: 1100px){
    font-size: 26px;
    }
    @media screen and (max-width: 700px){
        font-size: 22px;
    }
`;
function Blog() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [fetchedList, setFetchedList] = useState<BlogData[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<BlogData>({blogCategory: '', blogId: 0, blogImage: ''});
    const dataList = Object.values(BlogCategory).map((item) => ({
        text: item.text,
        value: item.value,
      }));
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [totalPage, setTotalPage] = useState<number>(0);
    const toggleBlogModal = () => setIsOpen(!isOpen);
    

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    // blogdata.reverse();
    
    
    const fetchData = async (page: number, category?: string) => {
        const response = await getBlogList(page, category !== 'ALL' ? category : undefined);
        if (response.status >= 200 && response.status < 300) {
            setFetchedList(response.data.results);
            setTotalPage(response.data.totalPagesCount);
        }
    };
    useEffect(()=> {
        fetchData(1);
    },[])
    const changePage = (num: number) => {
        setCurrentPage(num);
        
        fetchData(num, dataList[selectedIndex].value);
    }

    const handleSelectCategory = (index: number) => { // index는 category index 0 = All
        // e.stopPropagation();
        // category에 대한 데이터 요청
        // const category = dataList[index].value;
        // if (category === 'All') {
        //     setFilteredData(fetchedList);
        // } else {
        //     setFilteredData(fetchedList.filter(blog => blog.blogCategory === category));
        // }

        setSelectedIndex(index);
        setCurrentPage(1);
        
        fetchData( 1,dataList[index].value);
    }
    const handleCardClick = (blog: BlogData) => {
        setSelectedBlog(blog);
        toggleBlogModal();
    }
    useEffect(() => {
        handleSelectCategory(0);
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
        <BgImage>
            <Wrapper>
                <Container>
                    <BlogTitleText>This is not a movie poster. It's Real</BlogTitleText>
                    <ContentBox>
                        <SlickBar >
                            <ScrollContainer >
                                {dataList?.map((item, index) => (
                                    <Outline key={index} op={index} selectedIndex={selectedIndex} onClick={() => handleSelectCategory(index)} >
                                        <OutlineText key={index + "text"}>{item.text}</OutlineText>
                                    </Outline>
                                ))}
                                {isOpen &&
                                    <BlogModal isOpen={isOpen} setIsOpen={setIsOpen} selectedBlog={selectedBlog} />}
                            </ScrollContainer>
                        </SlickBar>
                        {
                            fetchedList?.length === 0 ? <Text style={{ minHeight: 400 }}>No Blog</Text>
                                : <>
                                    <Grid>
                                        {
                                            fetchedList?.map((item, index) => (
                                                <BlogCard key={index} data={item} onClick={handleCardClick}></BlogCard>
                                            ))
                                        }
                                    </Grid>
                                    <PageNav pages={totalPage} currentPage={currentPage} changePage={changePage} />
                                </>
                        }


                    </ContentBox>
                </Container>
            </Wrapper >
        </BgImage>
        <hr style={{ color: theme.darkGray, margin: 0 }} />
        <FootContact />
        </>
    )
}
export default Blog;