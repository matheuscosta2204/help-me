// src/components/LeftMenu.js
import React from "react";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined, SettingOutlined, ReadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Sider from "antd/es/layout/Sider";

const LeftMenu = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="bg-gray-900">
      <div className="logo p-4 text-white text-center">
        {collapsed ? "Logo" : "My App"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="bg-gray-900"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ReadOutlined />}>
          <Link to="/posts">Posts</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          <Link to="/settings">Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default LeftMenu;
