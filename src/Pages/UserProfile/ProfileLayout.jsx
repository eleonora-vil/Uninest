// src/ProfileLayout.js
import React, { useState } from "react";
import {
  Layout,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  DatePicker,
  Modal,
} from "antd";

const { Content } = Layout;
const { Option } = Select;

const ProfileLayout = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#ffff" }}>
      <Content style={{ padding: "20px", maxWidth: "1500px" }}>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Họ và tên">
                <Input defaultValue="Nguyễn Minh Quang" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số điện thoại">
                <Input defaultValue="0976812860" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Địa chỉ">
            <Input onClick={showModal} placeholder="Click to add details" />
          </Form.Item>
          <Form.Item label="Giới thiệu">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Tên gọi nhớ">
            <Input defaultValue="https://www.uninest.com/user/ten-goi-nho" />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              defaultValue="nguyenminhquang@gmail.com"
              suffix={<a href="#">Thay đổi</a>}
            />
          </Form.Item>
          <Form.Item label="CCCD/CMND">
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Giới tính">
                <Select defaultValue="Nam">
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày, tháng, năm sinh">
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              style={{
                background: "linear-gradient(to right, #f9a825, #f57c00)",
                borderColor: "#f57c00",
              }}
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Content>

      <Modal
        title="Chi tiết địa chỉ"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Số nhà">
            <Input />
          </Form.Item>
          <Form.Item label="Đường">
            <Input />
          </Form.Item>
          <Form.Item label="Phường/Xã">
            <Input />
          </Form.Item>
          <Form.Item label="Quận/Huyện">
            <Input />
          </Form.Item>
          <Form.Item label="Tỉnh/Thành phố">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ProfileLayout;
