import React, { useState, useEffect } from "react";
import { Card, Pagination, Row, Col, Spin, message, Button } from "antd";
import axios from "axios";
import { ReadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // Fetch posts from the API
  const fetchPosts = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/posts", {
        params: { page, pageSize },
      });
      console.log('response.data?.data?.posts', response.data?.data?.posts)
      setPosts(response.data?.posts);
      setTotal(response.data.totalPosts);
    } catch (error) {
      message.error("Failed to load posts.");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage, newPageSize) => {
    setPage(newPage);
    setPageSize(newPageSize);
    fetchPosts(newPage, newPageSize);
  };

  // Fetch posts when the component mounts or page changes
  useEffect(() => {
    fetchPosts(page, pageSize);
  }, [page, pageSize]);

  return (
    <div className="p-8 bg-gray-50 min-h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center space-x-2">
          <ReadOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
          <span>Posts</span>
        </h1>
        <Link to="/newPost">
          <Button type="primary">Create New Post</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} className="flex-grow">
            {posts.map((post) => (
              <Col key={post._id} xs={24} sm={12} md={8} lg={6}>
                <Link to={`/post/${post._id}`}>
                <Card
                  title={post.title}
                  bordered={true}
                  hoverable
                  className="shadow-md"
                >
                  <p className="text-sm text-gray-500">{post.subtitle}</p>
                  <p>{post.description}</p>
                  <p className="text-xs text-gray-400 mt-4">
                    Created: {new Date(post.createDate).toLocaleString()}
                  </p>
                </Card>
                </Link>
              </Col>
            ))}
          </Row>

          <div className="flex justify-end mt-6">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={total}
              showSizeChanger
              onChange={handlePageChange}
            />
          </div>
        </>
      )}

      {/* Add an empty div to push the pagination to the bottom */}
      <div className="mt-auto" />
    </div>
  );
};

export default Posts;
