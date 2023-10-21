import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
const Container = styled.div`
    height: 29vw;
    max-height: 390px;
    background: transparent;
    display: flex !important;
    margin: 11% 0;
    width: 100%;
    @media screen and (max-width: 1100px) {
      margin: 15% 0;
    }
    @media screen and (max-width: 500px) {
      height: auto;
      max-height: auto;
      margin: 15vh 0;
    }
`;
const ContentBox = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 500px) {
      flex-direction: column;
    }
`;
const IndexBox = styled.div`
  width: 45%;
  max-height: 390px;
  height: 100%;
  @media screen and (max-width: 1100px) {
}
    @media screen and (max-width: 500px) {
        display: flex;
        flex-direction: column;
        margin-top: 50px;
        width: 100%;
        height: auto;
        }
`;

type VideoListProps = {
    num: number;
}
const HisBox = styled.a<VideoListProps>`
    border-top: 1px solid rgba(0,0,0,.2);
    border-bottom: 1px solid rgba(0,0,0,.2);
    display: flex;
    margin-left: 10px;
    padding: 5px 30px;
    flex-direction: flex-start;
    height: calc(90%/ ${props => props.num});
    align-items: center;
    text-decoration: none;
    color: ${theme.darkGray};
    background : transparent;
    opacity: 0.5;
    font-size: 18px;
    font-weight: 500;
    &:hover {
        opacity: 1;
      }
      @media screen and (max-width: 500px) {
        padding: 10px 20px;
        margin: 0 20px;
    }
`;
const VideoBox = styled.div`
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px) {
      width: 100%;
    }
`;
const Video = styled.div`
  width: 100%;
  transition: .9s;
    opacity: 1;
    transition-delay: 0s;
    z-index: 999;
`;
const VideoContent = styled.iframe`
  max-height: 390px;
  height: 27vw;
  width: 100%;
  @media screen and (max-width: 500px) {
        height: 212px;
    }
`;



interface DataProps {
    video: string;
    title: string;
}

function VideoSection() {
    const data: DataProps[] = [{
        video: "https://www.youtube.com/embed/yzk18ZvRW0E?si=H_37XpQejN9CmF34",
        title: "Protecting the Environment with EarthMera"
    }, {
        video: "https://www.youtube.com/embed/_iar-vWcimE?si=yAVI4Ls07kt0TVuQ",
        title: "Keep claen the Music festival with EarthMera"
    }, {
        video: "https://www.youtube.com/embed/0xmXdZHHuwI?si=DeOc5FIszCL_ndmA",
        title: "Save Earth Make points!"
    }, {
        video: "https://www.youtube.com/embed/xehU5GHS3I4?si=zp7KSx0gIIxQ_1t_",
        title: "EarthMera with school challenge"
    }]

    const [selectedVideo, setSelectedVideo] = useState<DataProps>(data[0]);

    return (
        <Container>
            <ContentBox>
                <VideoBox>
                    <Video>
                        {selectedVideo && (
                            <VideoContent
                                width="560"
                                height="315"
                                src={selectedVideo.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></VideoContent>
                        )}
                    </Video>
                </VideoBox>
                <IndexBox>
                    {data.map((dict, index) => (
                        <HisBox
                            key={index}
                            href='#'
                            num={data.length}
                            onClick={(event) => {
                                event.preventDefault();
                                setSelectedVideo(dict)
                            }}
                            style={{ opacity: dict.title === selectedVideo.title ? 1 : 0.5 }}
                        >
                            {dict.title}
                        </HisBox>
                    ))}
                </IndexBox>
            </ContentBox>
        </Container >
    )
}
export default VideoSection;