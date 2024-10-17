import React, { useState, useEffect } from "react";
import { Layout, Card, Avatar, Button, Typography, Space, message } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { getUserProfile } from "../../config/axios"; // Import the getUserProfile function
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { Title, Text } = Typography;

const CustomSider = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      console.log("User profile response:", response); // Keep this for debugging

      if (response.data && response.data.success && response.data.result) {
        const userData = response.data.result;
        setUserData(userData);
      } else {
        console.error("Unexpected response structure:", response);
        message.error(
          "Failed to fetch user profile. Unexpected response structure."
        );
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      if (error.response) {
        console.error("Error response:", error.response);
        if (error.response.status === 401) {
          message.error("Unauthorized access. Please log in again.");
          navigate("/auth");
        } else {
          message.error(
            `Error ${error.response.status}: ${
              error.response.data.message || "An error occurred"
            }`
          );
        }
      } else if (error.request) {
        console.error("Error request:", error.request);
        message.error(
          "No response received from server. Please try again later."
        );
      } else {
        console.error("Error", error.message);
        message.error("Error setting up the request. Please try again.");
      }
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Sider width={450} style={{ background: "#fff", padding: "20px" }}>
      <Card
        cover={
          <img
            alt="profile cover"
            src={userData.avatarUrl || "https://via.placeholder.com/450x200"}
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
          src={userData.avatarUrl}
          icon={<UserOutlined />}
          style={{
            position: "absolute",
            top: "180px",
            left: "12%",
            transform: "translateX(-50%)",
            zIndex: 1,
            border: "2px solid white",
          }}
        />
        <div style={{ marginTop: "40px", textAlign: "left" }}>
          <Title level={4}>{userData.fullName}</Title>
          <Text type="secondary">
            <HomeOutlined /> {userData.roleName || "Chủ nhà"}
          </Text>
          <div style={{ marginTop: "10px" }}>
            <Space direction="vertical">
              <Space>
                <CalendarOutlined />
                <Text>
                  Đã tham gia:{" "}
                  {moment(userData.createDate).format("DD/MM/YYYY")}
                </Text>
              </Space>
              <Space>
                <CheckCircleOutlined />
                <Text>
                  Đã xác thực: {userData.status === "Active" ? "Có" : "Không"}
                </Text>
              </Space>
              <Space>
                <EnvironmentOutlined />
                <Text>{userData.address || "Chưa cập nhật địa chỉ"}</Text>
              </Space>
            </Space>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Text strong>{userData.rating || "N/A"}</Text>{" "}
            <Text type="secondary">★</Text>
            <Text type="secondary">
              {" "}
              | Người theo dõi: {userData.followers || 0} | Đang theo dõi:{" "}
              {userData.following || 0}
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
          <Button
            block
            style={{ marginTop: "10px", borderColor: "#f0c14b" }}
            onClick={() => navigate("/profile")}
          >
            Chỉnh sửa trang cá nhân
          </Button>
        </div>
      </Card>
    </Sider>
  );
};

export default CustomSider;
