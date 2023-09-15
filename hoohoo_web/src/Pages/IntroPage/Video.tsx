import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGooglePlay, faAppStore } from '@fortawesome/free-brands-svg-icons';
const Container = styled.div`
    height: 29vw;
    max-height: 390px;
    background: transparent;
    max-width: 1120px;
    display: flex !important;
    margin: 11% 0;
    width: 100%;
    @media screen and (max-width: 1100px) {
      margin: 15% 0;
    }
`;
const ContentBox = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    // @media screen and (max-width: 1100px) {
    //     flex-direction: column;
    //     justify-content: center;
    //     align-items: center;
    // }
`;
const IndexBox = styled.div`
  width: 45%;
  @media screen and (max-width: 1100px) {
    margin-top: 20px;
}
`;

const VideoBox = styled.div`
  width: 55%;
  
`;
const Video = styled.div`
  width: 100%:
  transition: .9s;
    opacity: 1;
    transition-delay: 0s;
    z-index: 999;
`;
const VideoContent = styled.iframe`
  max-height: 390px;
  height: 27vw;
  width: 100%;
`;
const HisBox = styled.a`
    border-top: 1px solid rgba(255,255,255,.2);
    border-bottom: 1px solid rgba(255,255,255,.2);
    display: flex;
    margin-left: 10px;
    padding: 5px 30px;
    flex-direction: flex-start;
    height: 20%;
    align-items: center;
    text-decoration: none;
    color: ${theme.white};
    background : transparent;
    opacity: 0.5;
    font-size: 22px;
    &:hover {
        opacity: 1;
      }
`;


interface DataProps {
    video: string;
    title: string;
}

function VideoSection() {
    const data: DataProps[] = [{
        video: "https://www.youtube.com/embed/ZSTsfkG7SaE?si=SNW42Wb57LB3bobF",
        title: "Iphone 15 Pro!"
    }, {
        video: "https://www.youtube.com/embed/-7PaaFTotzk?si=vO7XwXFbKbxm5PKe",
        title: "Hello ~~"
    }, {
        video: "https://www.youtube.com/embed/9BbDdhkEeeE?si=3cGJT-WIJIq79iwY",
        title: "Song Playlist"
    }, {
        video: "https://www.youtube.com/embed/0crz-UkonGA?si=g5eud5lmGQ9NyuL9",
        title: "IU concert"
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