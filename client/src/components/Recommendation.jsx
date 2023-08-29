import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { fetchVideosbyTag } from "../api/ApiCalls";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideosbyTag(tags).then((data) => {
      setVideos(data);
    });
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
