// src/UserProfile.js
import React, { useState } from "react";
import { Layout, Menu, Form, Input, Button, Switch, Row, Col } from "antd";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import ProfileLayout from "./ProfileLayout"; // Import the ProfileLayout component

const { Header, Content, Sider } = Layout;

const UserProfile = () => {
  // State to track the selected menu item
  const [selectedMenuItem, setSelectedMenuItem] = useState("3");

  // Function to handle menu item click
  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  // Function to render content based on selected menu item
  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <ProfileLayout />;
      case "3":
        return (
          <div style={{ padding: "20px" }}>
            {" "}
            {/* Add padding for consistency */}
            <h3>Thay đổi mật khẩu</h3>
            <Form layout="vertical">
              <Form.Item label="Mật khẩu hiện tại">
                <Input.Password />
              </Form.Item>
              <Form.Item label="Mật khẩu mới">
                <Input.Password />
              </Form.Item>
              <Form.Item label="Xác nhận mật khẩu mới">
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  style={{ background: "#f9a825", borderColor: "#f9a825" }}
                >
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                background: "#f7f5f3",
              }}
            >
              <h3>Cho phép liên lạc qua điện thoại</h3>
              <p>
                Khi bật tính năng này, số điện thoại sẽ hiển thị trên tất cả
                thông tin đăng của bạn.
              </p>
              <Switch defaultChecked />
            </div>
            <a
              href="#"
              style={{
                color: "#f9a825",
                marginTop: "16px",
                display: "block",
              }}
            >
              Yêu cầu chấm dứt tài khoản
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Row
        justify="center"
        align="middle"
        style={{ height: "100%", paddingTop: 100, paddingBottom: 100 }}
      >
        <Col
          xs={{ flex: "0 0 100%" }}
          sm={{ flex: "0 0 90%" }}
          md={{ flex: "0 0 80%" }}
          lg={{ flex: "0 0 70%" }}
          xl={{ flex: "0 0 60%" }}
          xxl={{ flex: "0 0 50%" }}
        >
          <Header
            style={{ background: "#fff", padding: 0, textAlign: "center" }}
          >
            <h2>Thông tin cá nhân</h2>
          </Header>
          <Layout>
            <Sider width={250} style={{ background: "#f7f5f3" }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["3"]}
                selectedKeys={[selectedMenuItem]}
                onClick={handleMenuClick}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="1">Thông tin cá nhân</Menu.Item>
                <Menu.Item key="3">Cài đặt tài khoản</Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Content
                style={{
                  background: "#fff",
                  padding: 0,
                  minHeight: 280,
                  maxWidth: 1800,
                }}
              >
                {renderContent()}
              </Content>
            </Layout>
          </Layout>
        </Col>
      </Row>
      <FooterComponent />
    </Layout>
  );
};

export default UserProfile;
