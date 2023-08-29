import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Comment from "./Comment";
import { fetchComments } from "../api/ApiCalls";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { addComment } from "../api/ApiCalls";

const Container = styled.div``;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState([]);

  const handleComment = (e) => {
    e.preventDefault();
    addComment(desc, videoId).then((data) => {
      setComments(comments.concat(data));
    });
  };

  useEffect(() => {
    fetchComments(videoId).then((data) => {
      setComments(data);
    });
  }, [videoId]);

  return (
    <Container>
      {currentUser && (
        <NewComment>
          <Avatar src={currentUser.img} />
          <Input
            placeholder="Add a comment..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Button onClick={handleComment}>Comment</Button>
        </NewComment>
      )}
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
