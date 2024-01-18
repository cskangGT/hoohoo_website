import React from 'react'
import styled from 'styled-components';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import { theme } from '../../../style';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 40px;
    
    @media screen and (max-width: 1100px) {
    
    }
  @media screen and (max-width: 700px) {
        
    }
`;
const HeaderBox = styled.div`
  width: auto;
  margin-left: 30px;
  
  @media screen and (max-width: 1100px) {
    width: 80%;
    }
  @media screen and (max-width: 700px) {
        width: 80%;
        justify-content: center;
        align-items: center;
    }
`;
const ContentBox = styled.div`

    align-items: center;
    justify-content: center;
    margin-top: 30px;
    width: 100%;
    flex-direction: column;
    padding: 0 20px;
`;
const Upper = styled.div`
  justify-content: center;
  flex-direction: row;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  width: 100%;
  @media screen and (max-width: 1100px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    }
  @media screen and (max-width: 700px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
    }
`;
const BottomCenter = styled.div`
  width: 100%;
  align-items: center;
    justify-content: center;
    display: flex;
`;
const BottomBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  width: 810px;
  align-self: center;
  justify-self: center;
  margin-bottom: 30px;
  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
// const BottomBox = styled.div`
//   justify-content: center;
//   align-items: center;
//   flex-direction: row;
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
//   gap: 30px;
//   margin-bottom: 30px;
//   width: 100%;
//   @media screen and (max-width: 1100px) {
//     grid-template-rows: 1fr 1fr;
//     grid-template-columns: 1fr 1fr;
//   }
//   @media screen and (max-width: 700px) {
//     grid-template-columns: 1fr;
//     grid-template-rows: 1fr 1fr 1fr;
//   }
// `;
const ItemBackground = styled.div`
  background-color: #785D4F;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 20px;
  overflow: hidden;
`;
const Image = styled.img`
  width: 150px;
  align-self: center;
  justify-self: center;
`;
const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OverlayBox = styled.div`
  padding: 20px 15px;
  position: absolute;
  z-index: 10;
  background-color:rgba(0, 0, 0, 0.54);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 130px; */
  top: 0;
  bottom: 0;
`;
const CategoryText = styled.p`
  font-size: 22px;
  color: ${theme.white};
  font-weight: 700;
`;
const ContentText = styled.p`
  font-size: 16px;
  width: 95%;
  text-align: center;
  line-height: 1.2;
  color: ${theme.white};
`;
type CategoryItemType = {
    img : string;
    name: string;
    content: string;
}
type Props = {
    item : CategoryItemType
}
function CategoryItem ( {item } :Props ) {
    return (
    <ItemBackground>
        <Image src={item.img} />
        <OverlayBox>
            <CategoryText>
                {item.name}
            </CategoryText>
<ContentText>
    {item.content}
</ContentText>
        </OverlayBox>
    </ItemBackground>
    )
}
export default function CategorySection() {
    const data = {
        "title" :{
            "header": "Our eco-ation category",
            "lineImage": "Images/platform2pline.png"
        },
        "categories1" : [
            {
                "img":"Images/c1.png",
                "name": "Eco-friendly products",
                "content": ": Photo of Using eco-products like eco-bags or tumblers."
            },
            {
                "img":"Images/category_recycle.png",
                "name": "Recycle",
                "content": ": Photo of recycling."
            },
            {
                "img":"Images/category_transportation.png",
                "name": "Transportation",
                "content": ": Photo of using public transport."
            },
            {
                "img":"Images/category2.png",
                "name": "Reuse",
                "content": ": Photo of an item repurposed from something discarded or unused."
            }
        ],
        "categories2" : [
            {
                "img":"Images/category_trashpick.png",
                "name": "Disposing-trash",
                "content": ": Photo of throwing garbage into a bin."
            },
            {
                "img":"Images/category_biobag.png",
                "name": "Bio-based bag",
                "content": ": Photo of a full eco-friendly plastic bag."
            },
            {
                "img":"Images/category_cigar.png",
                "name": "Disposing-Cigarrete",  
                "content": ": Photo of putting a cigarette butt in a trash bin."
            }
        ]
    }
  return (
    <Container>
        <HeaderBox>
            <LinedHeader data={data.title} color={theme.darkGray} style={{textAlign: 'center'}} />
        </HeaderBox>
        <ContentBox>
            <Upper>
                {data.categories1.map((item: CategoryItemType)=> (
                    <CenterBox>
                        <CategoryItem item={item} />
                    </CenterBox>
                ))}
            </Upper>
            <BottomCenter>
            <BottomBox>
                {data.categories2.map((item: CategoryItemType)=> (
                    <CenterBox>
                        <CategoryItem item={item} />
                    </CenterBox>
                ))}
            </BottomBox>
            </BottomCenter>
        </ContentBox>
    </Container>
  )
}

