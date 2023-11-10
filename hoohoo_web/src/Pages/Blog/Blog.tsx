import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BgImage, theme } from '../../style';
import BlogCard from '../../Component/Blog/BlogCard';
import PageNav from '../../Component/Blog/PageNav';
import BlogModal from './BlogModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import Wrapper from '../../Component/Wrapper/Wrapper';

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
  overflow: visible;
  margin: 0;
  padding: 0;
  margin-top: 20px;
`;

// 아래가 LeftBar
const ScrollContainer = styled.div`
margin-bottom: 20px;
padding-bottom: 10px;
  display: flex;
  
  
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
    selectedCategory: number;
}
const Outline = styled.button<OutlineProps>`
    opacity: ${props => props.op === props.selectedCategory ? 1 : 0.3};
    background : none;
    border: none;
    margin-right: 10px;
    outline: none;
    display: block;
    float: left;
    height: 100%;
    min-height: 1px;
    transition: all 0.2s ease 0s;
    border-radius: 10px;
    &:hover {
        background-color: ${theme.darkGray};
        color: ${theme.white};
    }
    @media screen and (max-width: 800px) {
        height: 30%;
  }
`;
const OutlineText = styled.h3`
    color: ${theme.darkGray};
    padding: 5px;
    margin : 0;
    font-size: 18px;
    &:hover {
        color: ${theme.white};
    }
    @media screen and (max-width: 700px){
        font-size: 14px;
    }
`;
const Grid = styled.div`
    
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
type BlogData = {
    'id': number;
    'image': string;
    'category': string;
    'date': string;
    'title': string;
    'desc': string;
};
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

function Blog() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [fetchedList, setFetchedList] = useState<BlogData[]>([]);
    const list: string[] = ["All", "Trash-Picking", "Reuse", "Recycle", "Transportation", "Eco Product"];
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [numTotalData, setNumTotalData] = useState<number>(0);
    const handleOpen = () => setIsOpen(true);
    const [cookies] = useCookies(['token', 'username']);
    const [logIn, setLogIn] = useState<boolean>(!!cookies.username);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    // blogdata.reverse();

    useEffect(() => {
        setLogIn(!!cookies.username);
    }, [cookies.username]);
    const fetchData = (category: string, page: number) => {
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
        // fetch(`http://localhost:4000/blogs?category=${category}&offset=${OFFSET}&page=${page}`)
        //     .then(response => response.json())
        //     .then(data => setFetchedList(data))
        //     .catch(error => console.error('Error fetching data:', error));
    }
    const changePage = (num: number) => {
        setCurrentPage(num);
        fetchData(list[selectedCategory], num);
    }

    const handleSelectCategory = (index: number) => { // index는 category index 0 = All
        // e.stopPropagation();
        // category에 대한 데이터 요청
        setSelectedCategory(index)
        setCurrentPage(1);
        fetchData(list[index], 1);
    }
    useEffect(() => {
        handleSelectCategory(selectedCategory);
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <BgImage>
            <Wrapper>
                <Container>
                    <ContentBox>
                        <SlickBar>
                                <ScrollContainer >
                                    {list.map((item, index) => (
                                        <Outline key={index} op={index} selectedCategory={selectedCategory} onClick={() => handleSelectCategory(index)} >
                                            <OutlineText key={index + "text"}>{item}</OutlineText>
                                        </Outline>
                                    ))}
                                    {logIn &&
                                    <NewBlogBtn onClick={handleOpen} ><FontAwesomeIcon icon={faPlus} style={{ paddingRight: 10 }} />New Blog</NewBlogBtn>}

                                {isOpen &&
                                    <BlogModal isOpen={isOpen} setIsOpen={setIsOpen} />}
                                    </ScrollContainer>
                                
                    
                        </SlickBar>
                        {
                            fetchedList.length === 0 ? <Text style={{ minHeight: 400 }}>Opening Soon</Text>
                                : <><Grid> {
                                    fetchedList.map((item, index) => (
                                        <BlogCard key={index} data={item}></BlogCard>
                                    ))
                                }</Grid>
                                    <PageNav pages={Math.ceil(numTotalData / OFFSET)} currentPage={currentPage} changePage={changePage} />
                                </>
                        }


                    </ContentBox>
                </Container>
            </Wrapper >
        </BgImage>
    )
}
export default Blog;