// src/components/LayoutWrapper.js
import React, { useState } from "react";
import { Layout } from "antd";
import Toolbar from "./toolbar";
import LeftMenu from "./leftMenu";

const { Content } = Layout;

const LayoutWrapper = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* LeftMenu Component */}
      <LeftMenu collapsed={collapsed} />

      {/* Layout for the rest of the page */}
      <Layout className="site-layout">
        {/* Toolbar Component */}
        <Toolbar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />

        {/* Content Section */}
        <Content
          className="p-4"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            backgroundColor: "#fff",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
