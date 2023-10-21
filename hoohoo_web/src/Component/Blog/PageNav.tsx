import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
type Props = {
    pages: number;
    currentPage: number;
    changePage: (num: number) => void;
};
const Container = styled.div`
    grid-column-gap: 1.5rem;
    align-items: center;
    margin-top: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    display: flex;
`;
const Arrow = styled.a`
    display: flex !important;
    width: 1.5rem;
    height: 1.5rem;
    background-color: transparent;
    border-style: none;
    border-radius: 0.25rem;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
`;

const PageNumbers = styled.div`
    grid-column-gap: 0.5rem;
    justify-content: center;
    align-items: center;
    display: flex;
`;
interface PageProps {
    page: number;
    curr: number;
}
const Page = styled.a<PageProps>`
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 0.25rem;
    justify-content: center;
    align-items: center;
    display: flex;
    color: ${props => props.page === props.curr ? theme.darkGray : theme.darkGray};
    text-decoration: none;
    cursor: pointer;
    border-radius: 7px;
    background-color: ${props => props.page === props.curr ? theme.mainNeon : 'transparent'};
`;
function PageNav(props: Props) {
    const page: number[] = Array.from({ length: props.pages }, (_, index) => index + 1);

    const handlePreviousClick = () => {
        if (props.currentPage > 1) {
            props.changePage(props.currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (props.currentPage < page.length) {
            props.changePage(props.currentPage + 1);
        }
    };

    console.log('props.currentPage', props.currentPage)
    return (
        <Container>
            {
                props.currentPage !== 1 &&
                <Arrow onClick={handlePreviousClick}><FontAwesomeIcon icon={faCaretLeft} color={theme.mainNeon} /></Arrow>
            }
            <PageNumbers>
                {page.map((num, index) => (
                    <Page page={num} curr={props.currentPage} onClick={() => props.changePage(num)} key={index}>
                        {num}
                    </Page>))
                }
            </PageNumbers>
            {
                props.currentPage !== page.length &&
                <Arrow onClick={handleNextClick}><FontAwesomeIcon icon={faCaretRight} color={theme.mainNeon} /></Arrow>
            }

        </Container>
    );
}
export default PageNav;