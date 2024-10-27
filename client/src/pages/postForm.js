import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to get route parameters
import { useSelector } from 'react-redux';

const PostForm = () => {
    const user = useSelector((state) => state.user);
    
  const { id } = useParams(); // Extract the post ID from the URL
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchPostData = useCallback(async (postId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URI}/posts/${postId}`);
      const post = response.data;

      // Populate the form with the post data
      form.setFieldsValue({
        title: post.title,
        subtitle: post.subtitle,
        description: post.description,
      });
    } catch (error) {
      message.error("Failed to load post data.");
      console.error("Error fetching post data:", error);
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    if (id) {
      fetchPostData(id);
    }
  }, [id, fetchPostData]);

  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (id) {
        // Update existing post
        await axios.put(`${process.env.REACT_APP_API_URI}/posts/${id}`, {
          ...values,
          poster: user.id
        });
        message.success("Post updated successfully.");
      } else {
        // Create new post
        await axios.post(`${process.env.REACT_APP_API_URI}/posts`, {
          ...values,
          poster: user.id
        });
        message.success("Post created successfully.");
      }
      form.resetFields(); // Reset form fields after submission
    } catch (error) {
      message.error("Failed to save post.");
      console.error("Error saving post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        {id ? "Edit Post" : "Create Post"}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Subtitle"
            name="subtitle"
            rules={[{ required: true, message: "Please input the subtitle!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input the description!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {id ? "Update Post" : "Create Post"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default PostForm;
