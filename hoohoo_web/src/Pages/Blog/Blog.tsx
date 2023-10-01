import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import BlogCard from '../../Component/Blog/BlogCard';
import PageNav from '../../Component/Blog/PageNav';
import BlogModal from './BlogModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import blogdata from './data.json';
import { useCookies } from 'react-cookie';

const Container = styled.div`
    width: 100%;
    max-width: 1140px;
    display: flex;
    margin: 0px auto;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    padding: 5rem 15px;
`;
const ContentBox = styled.div`
    max-width: 1140px;
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

const LongBar = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1100px){
    justify-content: center;
    margin-bottom: 0;
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
    cursor: pointer;
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
        color: ${theme.mainNeon};
    }
`;
const OutlineText = styled.h3`
    color: ${theme.white};
    padding: 5px;
    margin : 0;
`;
const LeftBar = styled.div`
  display: flex;
  
  @media screen and (max-width: 1100px){
    justify-content: center;
    margin-bottom: 0;
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
  color: ${theme.white};
  display: flex;
  width: 100%;
  margin: 20px 30px;
  justify-content: center;
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
    color: ${theme.white};
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
    const [numTotalData, setNumTotalData] = useState<number>(blogdata.length);
    const handleOpen = () => setIsOpen(true);
    const [cookies] = useCookies(['token', 'username']);
    const [logIn, setLogIn] = useState<boolean>(!!cookies.username);
    blogdata.reverse();

    useEffect(() => {
        setLogIn(!!cookies.username);
    }, [cookies.username]);
    const fetchData = (category: string, page: number) => {
        let filteredData: BlogData[];
        if (category === list[0]) {
            filteredData = blogdata;
        } else {
            filteredData = blogdata.filter(item => item.category === category);
        }
        setNumTotalData(filteredData.length);
        const startIndex = Math.max(0, filteredData.length - OFFSET * page);
        const endIndex = filteredData.length - OFFSET * (page - 1);
        const slicedData = filteredData.slice(startIndex, endIndex);
        setFetchedList(slicedData); // 필요한 데이터 OFFSET만큼만 가져온다.
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
        // category에 대한 데이터 요청
        setSelectedCategory(index)
        setCurrentPage(1);
        fetchData(list[index], 1);
    }
    useEffect(() => {
        handleSelectCategory(selectedCategory);
    }, [])
    return (
        <React.Fragment>
            <Container>
                <ContentBox>
                    <SlickBar>
                        <LongBar>
                            <LeftBar>
                                {list.map((item, index) => (
                                    <Outline key={index} op={index} selectedCategory={selectedCategory} onClick={() => { handleSelectCategory(index) }}>
                                        <OutlineText key={index + "text"}>{item}</OutlineText>
                                    </Outline>
                                ))}</LeftBar>
                            {logIn &&
                                <NewBlogBtn onClick={handleOpen} ><FontAwesomeIcon icon={faPlus} style={{ paddingRight: 10 }} />New Blog</NewBlogBtn>}

                            {isOpen &&
                                <BlogModal isOpen={isOpen} setIsOpen={setIsOpen} />}
                        </LongBar>
                    </SlickBar>
                    {
                        fetchedList.length === 0 ? <Text>No Posts to show</Text>
                            : <Grid> {
                                fetchedList.map((item, index) => (
                                    <BlogCard key={index} data={item}></BlogCard>
                                ))
                            }</Grid>
                    }
                    <PageNav pages={Math.ceil(numTotalData / OFFSET)} currentPage={currentPage} changePage={changePage} />

                </ContentBox>
            </Container>
        </React.Fragment>
    )
}
export default Blog;