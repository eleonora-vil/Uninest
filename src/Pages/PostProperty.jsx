import React from "react";
import { Form, Input, Select, Button, Upload, Col, Row, Radio } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "../components/Style/PostProperty.css";
import AppHeader from "../components/Header/Header";
import FooterComponent from "../components/Footer/Footer";

const { Option } = Select;

const PostProperty = () => {
  return (
    <div className="page-container">
      <AppHeader />
      <div className="content-wrapper">
        <div className="form-container">
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="Upload Hình Ảnh"
                  style={{ marginBottom: "24px" }}
                >
                  <Upload.Dragger
                    name="image"
                    accept=".jpg,.jpeg,.png,.gif"
                    customRequest={(options) => {
                      console.log(options.file);
                      // Handle the uploaded file here
                    }}
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
                  required
                  style={{ marginBottom: "24px" }}
                >
                  <Input
                    type="text"
                    placeholder="Địa chỉ"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Thông tin khác
                    </span>
                  }
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
                    style={{ marginBottom: "16px" }}
                  />
                  <Input
                    placeholder="Giá thuê"
                    style={{ marginBottom: "16px" }}
                  />
                  <Input placeholder="Số tiền cọc" />
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
                    style={{ marginBottom: "16px" }}
                  />
                  <Input.TextArea placeholder="Mô tả chi tiết" rows={4} />
                </Form.Item>

                <Form.Item
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Bạn là
                    </span>
                  }
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
                      border: "none", // Remove border to match gradient
                    }}
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
    </div>
  );
};

export default PostProperty;
