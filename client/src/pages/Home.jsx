import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Card from "../components/Card";
import { fetchVideos } from "../api/ApiCalls";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos(type).then((data) => {
      setVideos(data);
    });
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
          <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
