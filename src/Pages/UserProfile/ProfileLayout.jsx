// src/ProfileLayout.js
import React, { useEffect, useState } from "react";
import {
  Layout,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  DatePicker,
  message,
  Card,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import userService from "./userService";
import TopUpForm from "./TopUpForm";

const { Content } = Layout;
const { Option } = Select;

const ProfileLayout = ({ userData, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [isTopUpModalVisible, setIsTopUpModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(userData?.avatarUrl || null);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        ...userData,
        birthDate: userData.birthDate ? moment(userData.birthDate) : null,
      });
      setImageUrl(userData.avatarUrl);
    }
  }, [userData, form]);

  const onFinish = async (values) => {
    try {
      const response = await userService.updateProfile(values);
      if (response.data.success) {
        message.success("Profile updated successfully");
        if (onUpdateSuccess) onUpdateSuccess(response.data.result);
      }
    } catch (error) {
      message.error(
        "Failed to update profile: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleImageUpload = async (info) => {
    if (info.file.status === "done") {
      try {
        const response = await userService.updateUserImage(
          info.file.originFileObj
        );
        if (response.success) {
          setImageUrl(response.result.avatarUrl);
          message.success("Profile picture updated successfully");
        } else {
          message.error(response.message || "Failed to update profile picture");
        }
      } catch (error) {
        message.error(
          "Failed to update profile picture: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  const showTopUpModal = () => {
    setIsTopUpModalVisible(true);
  };

  const handleTopUpCancel = () => {
    setIsTopUpModalVisible(false);
  };

  const handleTopUpSuccess = (successMessage) => {
    setIsTopUpModalVisible(false);
    message.success(successMessage);
    // Refresh the page after a short delay
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#ffff" }}>
      <Content style={{ padding: "20px", maxWidth: "1500px" }}>
        <Row gutter={16}>
          <Col span={5}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
              beforeUpload={(file) => {
                const isJpgOrPng =
                  file.type === "image/jpeg" || file.type === "image/png";
                if (!isJpgOrPng) {
                  message.error("You can only upload JPG/PNG file!");
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                  message.error("Image must smaller than 2MB!");
                }
                return isJpgOrPng && isLt2M;
              }}
              onChange={handleImageUpload}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Col>
          <Col span={16}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Số điện thoại" name="phoneNumber">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Địa chỉ" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input disabled />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Giới tính" name="gender">
                    <Select>
                      <Option value="male">Nam</Option>
                      <Option value="female">Nữ</Option>
                      <Option value="other">Khác</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Ngày, tháng, năm sinh" name="birthDate">
                    <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    background: "linear-gradient(to right, #f9a825, #f57c00)",
                    borderColor: "#f57c00",
                  }}
                >
                  Lưu thay đổi
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        {/* New Section for Account Details */}
        <div style={{ marginTop: "40px" }}>
          <h3>Chi tiết tài khoản</h3>
          <Card
            style={{
              background: "#333",
              color: "#fff",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h4>TỔNG TÀI KHOẢN</h4>
                <p style={{ fontSize: "24px" }}>
                  {formatCurrency(userData?.wallet || 0)}{" "}
                </p>
              </div>
              <Button onClick={showTopUpModal}>+ Nạp thêm</Button>
            </div>
          </Card>
        </div>
        <TopUpForm
          visible={isTopUpModalVisible}
          onSuccess={handleTopUpSuccess}
          onClose={handleTopUpCancel}
        />
      </Content>
    </Layout>
  );
};

export default ProfileLayout;
