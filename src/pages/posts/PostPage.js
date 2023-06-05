import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import axios from "axios";
import Post from "./Post";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
        try {
            const [{data: post}] = await Promise.all([
                axiosReq.get(`/posts/${id}`),
                // axios.get(`/reviews/?post=${id}`),
            ])
            setPost({results: [post] })
            console.log(post)
        } catch(err){
            console.log(err)
        }
    };

    handleMount()
  }, [id])


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Post {...post.results[0]} setPosts={setPost} />
        <Container className={appStyles.Content}>
          Reviews
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular posts
      </Col>
    </Row>
  );
}

export default PostPage;