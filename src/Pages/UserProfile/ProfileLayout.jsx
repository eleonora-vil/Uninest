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
} from "antd";
import moment from "moment";
import userService from "./userService";
import TopUpForm from "./TopUpForm";

const { Content } = Layout;
const { Option } = Select;

const ProfileLayout = ({ userData, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [isTopUpModalVisible, setIsTopUpModalVisible] = useState(false);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        ...userData,
        birthDate: userData.birthDate ? moment(userData.birthDate) : null,
      });
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
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#ffff" }}>
      <Content style={{ padding: "20px", maxWidth: "1500px" }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true }]}
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
                  <Option value="Male">Nam</Option>
                  <Option value="Female">Nữ</Option>
                  <Option value="Other">Khác</Option>
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
                  {userData?.wallet || 0}{" "}
                  <span style={{ fontSize: "24px" }}>VND</span>
                </p>
              </div>
              <Button onClick={showTopUpModal}>+Nạp thêm</Button>
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
