// src/components/Toolbar.js
import React from "react";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Toolbar = ({ collapsed, toggleCollapsed }) => {
  const user = useSelector((state) => state.user);

  return (
    <header className="bg-white p-0 flex items-center justify-between shadow-md">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        className="text-xl"
      />
      <div className="text-xl font-bold pr-4">
        Welcome, 
        <Link to="/profile" className="hover:underline ml-2">
          {user?.name}
        </Link>
      </div>
    </header>
  );
};

export default Toolbar;