import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Switch,
  Row,
  Col,
  message,
  Modal,
} from "antd";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import ProfileLayout from "./ProfileLayout";
import userService from "./userService";
import moment from "moment"; // Import moment
import { getUserProfile } from "../../config/axios"; // Import the getUserProfile function

const { Header, Content, Sider } = Layout;

const UserProfile = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [userData, setUserData] = useState(null);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  // const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  // const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

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
        form.setFieldsValue({
          ...userData,
          birthDate: userData.birthDate ? moment(userData.birthDate) : null,
        });
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

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  const handleProfileUpdate = async (values) => {
    try {
      const response = await userService.updateProfile(values);
      if (response.data.success) {
        setUserData(response.data.data);
        message.success("Profile updated successfully");
      }
    } catch (error) {
      message.error(
        "Failed to update profile: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handlePasswordChange = async (values) => {
    try {
      const response = await userService.changePassword(values);
      if (response.data.success) {
        message.success("Password changed successfully");
        passwordForm.resetFields();
      }
    } catch (error) {
      message.error(
        "Failed to change password: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return (
          <ProfileLayout
            userData={userData}
            onUpdateSuccess={handleProfileUpdate}
          />
        );
      case "3":
        return (
          <div style={{ padding: "20px" }}>
            <h3>Thay đổi mật khẩu</h3>
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handlePasswordChange}
            >
              <Form.Item
                name="currentPassword"
                label="Mật khẩu hiện tại"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters long",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu mới"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ background: "#f9a825", borderColor: "#f9a825" }}
                >
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
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
                defaultSelectedKeys={["1"]}
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
