import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Col,
  Row,
  Radio,
  Breadcrumb,
  message,
  Modal,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "../../components/Style/PostProperty.css";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";

const { Option } = Select;

const PostProperty = () => {
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("size", values.size);
    formData.append("description", values.description);
    formData.append("bathroom", values.bathroom);
    formData.append("bedrooms", values.bedrooms);
    formData.append("locationId", values.locationId);
    formData.append("utilitiesId", values.utilitiesId);

    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      const response = await fetch("/api/Home/CreateHome", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        message.success("Home created successfully!");
      } else {
        message.error("Failed to create home.");
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

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
    <div className="page-container">
      <AppHeader />
      <div className="content-wrapper">
        <div className="form-container">
          <Breadcrumb style={{ margin: "16px 0", paddingBottom: "15px" }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Đăng tin</Breadcrumb.Item>
          </Breadcrumb>
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="Upload Hình Ảnh"
                  style={{ marginBottom: "24px" }}
                >
                  <Upload.Dragger
                    name="image"
                    accept=".jpg,.jpeg,.png,.gif"
                    fileList={fileList}
                    onChange={handleUploadChange}
                    beforeUpload={() => false} // Prevent automatic upload
                    style={{
                      width: "100%",
                      height: "300px",
                      border: "2px dashed #fd9252",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined
                        style={{ fontSize: "48px", color: "#fcb921" }}
                      />
                    </p>
                    <p
                      style={{
                        color: "#fd9252",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      Đăng từ 1-5 hình
                    </p>
                  </Upload.Dragger>
                </Form.Item>
                <Form.Item
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Ngày duy trì tin đăng
                    </span>
                  }
                  name="duration"
                  style={{ marginBottom: "24px" }}
                >
                  <Input
                    type="number"
                    placeholder="Enter number of days"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Danh Mục Tin Đăng
                    </span>
                  }
                  name="category"
                  required
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Phòng trọ">
                    <Option value="phongtro">Phòng trọ</Option>
                    <Option value="dichvu">Dịch vụ thứ 3</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Địa chỉ BĐS
                    </span>
                  }
                  name="address"
                  required
                  style={{ marginBottom: "24px" }}
                >
                  <Input
                    type="text"
                    placeholder="Địa chỉ"
                    style={{ width: "100%" }}
                    onClick={showModal} // Show modal on click
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Thông tin khác
                    </span>
                  }
                  name="additionalInfo"
                  style={{ marginBottom: "24px" }}
                >
                  <Input placeholder="Tình trạng nội thất" />
                </Form.Item>

                <Form.Item
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Diện tích & giá
                    </span>
                  }
                  required
                  style={{ marginBottom: "24px" }}
                >
                  <Input
                    placeholder="Diện tích"
                    name="size"
                    style={{ marginBottom: "16px" }}
                  />
                  <Input
                    placeholder="Giá thuê"
                    name="price"
                    style={{ marginBottom: "16px" }}
                  />
                  <Input placeholder="Số tiền cọc" name="deposit" />
                </Form.Item>

                <Form.Item
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Tiêu đề tin đăng và Mô tả chi tiết
                    </span>
                  }
                  required
                  style={{ marginBottom: "24px" }}
                >
                  <Input
                    placeholder="Tiêu đề tin đăng"
                    name="title"
                    style={{ marginBottom: "16px" }}
                  />
                  <Input.TextArea
                    placeholder="Mô tả chi tiết"
                    name="description"
                    rows={4}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Bạn là
                    </span>
                  }
                  name="userType"
                  style={{ marginBottom: "24px" }}
                >
                  <Radio.Group>
                    <Radio.Button
                      value="canhan"
                      style={{
                        marginRight: "5px",
                        background: "#d9d9d9",
                      }}
                    >
                      Cá nhân
                    </Radio.Button>
                    <Radio.Button
                      value="moigioi"
                      style={{
                        marginLeft: "5px",
                        background: "#d9d9d9",
                      }}
                    >
                      Môi giới
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "300px",
                      background: "#ffffff",
                      color: "#fcb921",
                    }}
                  >
                    Xem Trước
                  </Button>
                  <Button
                    type="primary"
                    style={{
                      marginLeft: "15px",
                      width: "300px",
                      background:
                        "linear-gradient(90deg, #fcd25e,#fdb859, #fc9a53)",
                      border: "none",
                    }}
                    onClick={{}}
                  >
                    Đăng Tin
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <FooterComponent />
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
    </div>
  );
};

export default PostProperty;
