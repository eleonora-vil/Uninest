import React from "react";
import { Layout, Card, Avatar, Button, Typography, Space } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { Title, Text } = Typography;

const CustomSider = () => {
  return (
    <Sider width={400} style={{ background: "#fff", padding: "20px" }}>
      <Card
        cover={
          <img
            alt="example"
            src="https://plus.unsplash.com/premium_photo-1661964014750-963a28aeddea?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            style={{ height: "200px", objectFit: "cover" }}
          />
        }
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{
            position: "absolute",
            top: "150px", // Adjust this value to control vertical overlap
            left: "15%",
            transform: "translateX(-50%)",
            zIndex: 1,
            border: "2px solid white",
          }}
        />
        <Title level={4}>Minh Quang</Title>
        <Text type="secondary">
          <HomeOutlined /> Chủ nhà
        </Text>
        <div style={{ marginTop: "10px" }}>
          <Space direction="vertical">
            <Space>
              <CalendarOutlined />
              <Text>Đã tham gia: 21/6/2024</Text>
            </Space>
            <Space>
              <CheckCircleOutlined />
              <Text>Đã xác thực: </Text>
            </Space>
            <Space>
              <EnvironmentOutlined />
              <Text>Tp. Hồ Chí Minh, Việt Nam</Text>
            </Space>
          </Space>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Text strong>4.5</Text> <Text type="secondary">★</Text>
          <Text type="secondary">
            {" "}
            | Người theo dõi: 1212 | Đang theo dõi: 11
          </Text>
        </div>
        <Button
          type="primary"
          block
          style={{
            marginTop: "20px",
            backgroundColor: "#f0c14b",
            borderColor: "#f0c14b",
          }}
        >
          Chia sẻ trang của bạn
        </Button>
        <Button block style={{ marginTop: "10px", borderColor: "#f0c14b" }}>
          Chỉnh sửa trang cá nhân
        </Button>
      </Card>
    </Sider>
  );
};

export default CustomSider;
