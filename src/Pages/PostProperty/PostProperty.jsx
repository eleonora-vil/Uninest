import React, { useEffect, useState } from "react";
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
  InputNumber,
  Checkbox,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "../../components/Style/PostProperty.css";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import api from "../../config/axios";

const { Option } = Select;

const PostProperty = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    houseNumber: "",
    street: "",
    ward: "",
    district: "",
    city: "",
  });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  function getUserIdFromLocalStorage() {
    try {
      const storedData = localStorage.getItem("user");
      if (storedData) {
        const userData = JSON.parse(storedData);
        return userData.userId;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving or parsing data:", error);
      return null;
    }
  }
  useEffect(() => {
    // Check payment status on component mount (for handling redirect back from payment gateway)
    const urlParams = new URLSearchParams(window.location.search);
    const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
    if (vnp_ResponseCode === "00") {
      setPaymentStatus("success");
      message.success(
        "Payment successful! Your listing will be created shortly."
      );
      // Proceed with creating the listing
      createListing();
    } else if (vnp_ResponseCode) {
      setPaymentStatus("failed");
      message.error("Payment failed. Please try again.");
    }
  }, []);
  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const userId = getUserIdFromLocalStorage();
      if (!userId) {
        message.error("User ID not found. Please log in.");
        return;
      }

      // Validate form data
      if (
        !values.tittle ||
        !values.price ||
        !values.size ||
        !values.description ||
        !values.category
      ) {
        throw new Error("Missing required fields");
      }

      // Initiate payment first
      const paymentResponse = await api.post("api/Payment/Checkout", {
        userId: userId,
        amount: calculatePostingFee(values),
        orderDescription: `Payment for posting: ${values.tittle}`,
        name: "Property Posting Fee",
      });

      if (paymentResponse.data && paymentResponse.data.PaymentUrl) {
        // Store form data in localStorage before redirecting
        localStorage.setItem("pendingPropertyData", JSON.stringify(values));
        localStorage.setItem("pendingFileList", JSON.stringify(fileList));

        // Redirect to the payment URL
        window.location.href = paymentResponse.data.PaymentUrl;
      } else {
        throw new Error("Invalid payment response");
      }
    } catch (error) {
      console.error("Error details:", error);
      message.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const createListing = async () => {
    try {
      const storedValues = JSON.parse(
        localStorage.getItem("pendingPropertyData")
      );
      const storedFileList = JSON.parse(
        localStorage.getItem("pendingFileList")
      );

      if (!storedValues) {
        throw new Error("No pending listing data found.");
      }

      const formData = new FormData();
      const userId = getUserIdFromLocalStorage();
      formData.append("UserId", userId);
      formData.append("Name", storedValues.tittle);
      formData.append("Price", storedValues.price);
      formData.append("Size", storedValues.size);
      formData.append("Description", storedValues.description);
      formData.append("Bathroom", storedValues.bathroom);
      formData.append("Bedrooms", storedValues.bedrooms);
      formData.append("town", addressDetails.ward);
      formData.append("district", addressDetails.district);
      formData.append("province", addressDetails.city);
      formData.append("street", addressDetails.street);

      storedFileList.forEach((file, index) => {
        formData.append(`images`, file.originFileObj);
      });

      const response = await api.post("api/Home/CreateHome", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      message.success("Home created successfully!");
      form.resetFields();
      setFileList([]);
      // Clear stored data
      localStorage.removeItem("pendingPropertyData");
      localStorage.removeItem("pendingFileList");
    } catch (error) {
      console.error("Error creating listing:", error);
      message.error("Failed to create listing. Please contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePostingFee = (values) => {
    const baseFee = 10000; // Base fee in VND
    const durationFee = (values.duration || 1) * 5000; // 5000 VND per day
    return baseFee + durationFee;
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    form.setFieldsValue({ address: getFullAddress() });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddressChange = (field, value) => {
    setAddressDetails((prev) => ({ ...prev, [field]: value }));
  };

  const getFullAddress = () => {
    const { houseNumber, street, ward, district, city } = addressDetails;
    return `${houseNumber} ${street}, ${ward}, ${district}, ${city}`.trim();
  };

  return (
    <div className="page-container">
      <AppHeader />
      <div className="content-wrapper">
        <div className="form-container">
          <Breadcrumb style={{ marginBottom: "16px", paddingBottom: "15px" }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Đăng tin</Breadcrumb.Item>
          </Breadcrumb>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="image"
                  label="Upload Hình Ảnh"
                  style={{ marginBottom: "24px" }}
                >
                  <Upload.Dragger
                    accept=".jpg,.jpeg,.png,.gif"
                    fileList={fileList}
                    onChange={handleUploadChange}
                    beforeUpload={() => false}
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
                  name="duration"
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Ngày duy trì tin đăng
                    </span>
                  }
                  style={{ marginBottom: "24px" }}
                >
                  <InputNumber
                    placeholder="Enter number of days"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  name="category"
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
                  name="address"
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Địa chỉ BĐS
                    </span>
                  }
                  style={{ marginBottom: "24px" }}
                >
                  <Input
                    placeholder="Địa chỉ"
                    style={{ width: "100%" }}
                    onClick={showModal}
                    readOnly
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Thông tin khác
                    </span>
                  }
                  style={{ marginBottom: 0 }}
                  required
                >
                  <Form.Item
                    name="bathroom"
                    rules={[
                      { required: true, message: "Vui lòng nhập số phòng tắm" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Số phòng tắm"
                      min={0}
                      style={{ width: "100%" }}
                      addonAfter="phòng"
                    />
                  </Form.Item>

                  <Form.Item
                    name="bedrooms"
                    rules={[
                      { required: true, message: "Vui lòng nhập số phòng ngủ" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Số phòng ngủ"
                      min={0}
                      style={{ width: "100%" }}
                      addonAfter="phòng"
                    />
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  name="amenities"
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Tiện ích
                    </span>
                  }
                  style={{ marginBottom: "24px" }}
                >
                  <Checkbox.Group style={{ width: "100%" }}>
                    <Row gutter={[16, 8]}>
                      <Col span={8}>
                        <Checkbox value="Elevator">Thang máy</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="SwimmingPool">Hồ bơi</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Gym">Phòng tập gym</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="TV">TV</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Refrigerator">Tủ lạnh</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Parking">Bãi đậu xe</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Balcony">Ban công</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="AirConditioner">Máy lạnh</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
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
                  <Form.Item
                    name="size"
                    rules={[
                      { required: true, message: "Vui lòng nhập diện tích" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Diện tích"
                      style={{ width: "100%" }}
                      addonAfter="m²"
                    />
                  </Form.Item>
                  <Form.Item
                    name="price"
                    rules={[
                      { required: true, message: "Vui lòng nhập giá thuê" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Giá thuê"
                      style={{ width: "100%" }}
                      addonAfter="/Tháng"
                    />
                  </Form.Item>
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
                  <Form.Item
                    name="tittle"
                    rules={[
                      { required: true, message: "Vui lòng nhập tiêu đề" },
                    ]}
                  >
                    <Input placeholder="Tiêu đề tin đăng" />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                  >
                    <Input.TextArea placeholder="Mô tả chi tiết" rows={4} />
                  </Form.Item>
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
                    onClick={() => form.validateFields().then(console.log)}
                  >
                    Xem Trước
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      marginLeft: "15px",
                      width: "300px",
                      background:
                        "linear-gradient(90deg, #fcd25e,#fdb859, #fc9a53)",
                      border: "none",
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
      <Modal
        title="Chi tiết địa chỉ"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Số nhà">
            <Input
              value={addressDetails.houseNumber}
              onChange={(e) =>
                handleAddressChange("houseNumber", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Đường" name="street">
            <Input
              value={addressDetails.street}
              onChange={(e) => handleAddressChange("street", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Phường/Xã" name="ward">
            <Input
              value={addressDetails.ward}
              onChange={(e) => handleAddressChange("ward", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Quận/Huyện" name="district">
            <Input
              value={addressDetails.district}
              onChange={(e) => handleAddressChange("district", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Tỉnh/Thành phố" name="province">
            <Input
              value={addressDetails.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostProperty;
