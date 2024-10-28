import React, { useCallback, useEffect, useState } from "react";
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
  Card,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "../../components/Style/PostProperty.css";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import api from "../../config/axios";
import TopUpForm from "../UserProfile/TopUpForm";
import { Await } from "react-router-dom";
import PropertyPreview from "./PropertyPreview";

const { Option } = Select;

const PostProperty = () => {
  const [form] = Form.useForm();
  const [fileLists, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    houseNumber: "",
    street: "",
    ward: "",
    district: "",
    city: "",
  });
  const [autoRenew, setAutoRenew] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(null);
  const [price, setPrice] = useState(null);
  const [isTopUpModalVisible, setIsTopUpModalVisible] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isMembershipModalVisible, setIsMembershipModalVisible] =
    useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const handleUploadChange = useCallback(({ fileList }) => {
    setFileList(fileList);
  }, []);

  const getUserIdFromLocalStorage = useCallback(() => {
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
  }, []);

  const getIsMemberFromLocalStorage = useCallback(() => {
    try {
      const storedData = localStorage.getItem("user");
      if (storedData) {
        const userData = JSON.parse(storedData);
        return userData.isActiveMember;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving or parsing data:", error);
      return null;
    }
  }, []);

  const getUserWalletLocalStorage = useCallback(() => {
    try {
      const storedData = localStorage.getItem("user");
      if (storedData) {
        const walletData = JSON.parse(storedData);
        return walletData.wallet;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving or parsing data:", error);
      return null;
    }
  }, []);

  const handlePreview = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        const previewData = {
          name: values.tittle,
          homeId: "Preview",
          size: values.size,
          bathroom: values.bathroom,
          price: values.price,
          bedrooms: values.bedrooms,
          description: values.description,
          ownerName: "Current User",
          homeImages: fileLists.map((file) => ({
            image: {
              imageUrl:
                file.thumbUrl ||
                file.url ||
                URL.createObjectURL(file.originFileObj),
            },
          })),
          // Add other fields as necessary
        };
        setPreviewData(previewData);
        setShowPreview(true);
      })
      .catch((errorInfo) => {
        message.error("Please fill in all required fields before preview");
      });
  }, [form, fileLists]);

  if (showPreview && previewData) {
    return (
      <div>
        <PropertyPreview propertyDetails={previewData} />
        <Button
          onClick={() => setShowPreview(false)}
          style={{ margin: "20px" }}
        >
          Back to Edit
        </Button>
      </div>
    );
  }

  const handleMembershipChoice = async (choice) => {
    setIsMembershipModalVisible(false);
    if (choice === "member") {
      if (200000 <= getUserWalletLocalStorage()) {
        const success = await registerMembership();
        if (success) {
          // Proceed with creating listing as a member
          await onFinish(form.getFieldsValue());
        }
      } else {
        setIsTopUpModalVisible(true);
      }
    }
    if (choice === "wallet") {
      if (price <= getUserWalletLocalStorage()) {
        await onFinish(form.getFieldsValue());
      } else {
        setIsTopUpModalVisible(true);
      }
    }
  };

  const calculatePostingFee = (values) => {
    //const baseFee = 10000; // Base fee in VND
    const durationFee = (values || 0) * 5000; // 5000 VND per day
    return durationFee;
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
  const handleDurationChange = (value) => {
    const day = value;
    setDuration(day);
    setPrice(calculatePostingFee(day));
  };
  function formatCurrency(value) {
    // Ensure value is a number
    const numValue = Number(value);

    if (isNaN(numValue)) {
      return "Invalid input";
    }

    if (numValue < 1e6) {
      // Less than a million
      return numValue.toLocaleString("vi-VN");
    } else if (numValue >= 1e6 && numValue < 1e9) {
      // Millions
      return formatLargeNumber(numValue, 1e6, "triệu");
    } else if (numValue >= 1e9) {
      // Billions
      return formatLargeNumber(numValue, 1e9, "tỷ");
    } else {
      // Default case (shouldn't normally be reached)
      return numValue.toLocaleString("vi-VN");
    }
  }

  function formatLargeNumber(value, unitValue, unitName) {
    const wholePart = Math.floor(value / unitValue);
    const fractionalPart = Math.round((value % unitValue) / (unitValue / 10));

    let result = wholePart.toLocaleString("vi-VN") + " " + unitName;
    if (fractionalPart > 0) {
      result += " " + fractionalPart.toLocaleString("vi-VN");
    }
    return result;
  }

  const handleTopUpCancel = () => {
    setIsTopUpModalVisible(false);
    setIsMembershipModalVisible(true);
  };

  const handleTopUpSuccess = (successMessage) => {
    setIsTopUpModalVisible(false);
    message.success(successMessage);
    // Refresh the page after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const updateUserWallet = async (amount) => {
    try {
      const updateWalletResponse = await api.post(
        `api/User/UpdateWallet?userId=${getUserIdFromLocalStorage()}&amount=${amount}`
      );
      if (updateWalletResponse.status === 200) {
        //message.success("Wallet updated successfully");
        // Update the local storage with the new wallet balance
        const userData = JSON.parse(localStorage.getItem("user"));
        userData.wallet -= amount;
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("Failed to update wallet");
      }
    } catch (error) {
      console.error("Error updating wallet:", error);
      message.error("Failed to update wallet");
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (getIsMemberFromLocalStorage()) {
          // User is a member, proceed with creating listing
          await onFinish(values);
        } else {
          // User is not a member, show top-up form
          setIsMembershipModalVisible(true);
        }
      })
      .catch((errorInfo) => {
        // Form validation failed
        message.error("Please fill in all required fields");
      });
  };
  const registerMembership = async (autoRenew) => {
    try {
      const register = await api.post("api/User/register-membership", {
        autoRenew: autoRenew,
      });
      if (register.data.succeeded) {
        message.success("Membership registration successful!");
        // Update local storage to reflect new membership status
        const userData = JSON.parse(localStorage.getItem("user"));
        userData.isActiveMember = true;
        localStorage.setItem("user", JSON.stringify(userData));
        //await updateUserWallet(10000);
        await createListing();
        return true;
      } else {
        throw new Error(
          register.data.message || "Membership registration failed"
        );
      }
    } catch (error) {
      console.error("Error registering membership:", error.message);
      message.error("Failed to register membership: " + error.message);
      return false;
    }
  };

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

      // Store form data in localStorage before redirecting
      localStorage.setItem("pendingPropertyData", JSON.stringify(values));

      await createListing();
      // Redirect to the payment URL
      //window.location.href = paymentResponse.data.PaymentUrl;
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

      if (!storedValues) {
        throw new Error("No pending listing data found.");
      }

      const formData = new FormData();
      const userId = getUserIdFromLocalStorage();
      formData.append("UserId", userId);
      formData.append("Name", storedValues.tittle);
      formData.append("Price", formatCurrency(storedValues.price));
      formData.append("Size", storedValues.size);
      formData.append("Description", storedValues.description);
      formData.append("Bathroom", storedValues.bathroom);
      formData.append("Bedrooms", storedValues.bedrooms);
      formData.append("town", addressDetails.ward);
      formData.append("district", addressDetails.district);
      formData.append("province", addressDetails.city);
      formData.append("street", addressDetails.street);
      formData.append("Elevator", storedValues.amenities.includes("Elevator"));
      formData.append(
        "SwimmingPool",
        storedValues.amenities.includes("SwimmingPool")
      );
      formData.append("Gym", storedValues.amenities.includes("Gym"));
      formData.append("TV", storedValues.amenities.includes("TV"));
      formData.append(
        "Refrigerator",
        storedValues.amenities.includes("Refrigerator")
      );
      formData.append("Parking", storedValues.amenities.includes("Parking"));
      formData.append("Balcony", storedValues.amenities.includes("Balcony"));
      formData.append(
        "AirConditioner",
        storedValues.amenities.includes("AirConditioner")
      );
      const currentFileList = fileLists;
      // Append images
      if (currentFileList && currentFileList.length > 0) {
        currentFileList.forEach((file, index) => {
          if (file.originFileObj) {
            formData.append(`images`, file.originFileObj, file.name);
          } else {
            console.warn(`File at index ${index} does not have originFileObj`);
          }
        });
      } else {
        console.warn("No files found in currentFileList");
      }
      const response = await api.post("api/Home/CreateHome", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error(`API call failed with status ${response.status}`);
      }
      // After successful listing creation, update the wallet
      if (!getIsMemberFromLocalStorage()) {
        await updateUserWallet(price);
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

  if (isLoading) return <p>Loading...</p>; // Display loading message

  return (
    <div className="page-container">
      <AppHeader />
      <div className="content-wrapper">
        <div className="form-container">
          <Breadcrumb style={{ marginBottom: "16px", paddingBottom: "15px" }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Đăng tin</Breadcrumb.Item>
          </Breadcrumb>
          <Form form={form} layout="vertical">
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="image"
                  label="Upload Hình Ảnh"
                  style={{ marginBottom: "24px" }}
                >
                  <Upload.Dragger
                    accept=".jpg,.jpeg,.png,.gif"
                    fileList={fileLists}
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
                  required
                  rules={[{ required: true, type: Number }]}
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Ngày duy trì tin đăng
                    </span>
                  }
                  style={{ marginBottom: "24px" }}
                >
                  <InputNumber
                    placeholder="Nhập số ngày"
                    style={{ width: "100%" }}
                    onChange={handleDurationChange}
                    min={1}
                    addonAfter="ngày"
                    required
                  />
                </Form.Item>
                {!getIsMemberFromLocalStorage() && (
                  <Form.Item required>
                    {duration !== null && (
                      <span>
                        Giá tin đăng trong {duration} ngày là:{" "}
                        {formatCurrency(price)} VND/Tháng
                      </span>
                    )}
                  </Form.Item>
                )}
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
                    onClick={handlePreview}
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
                    onClick={handleSubmit}
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

      <Modal
        visible={isMembershipModalVisible}
        onCancel={() => setIsMembershipModalVisible(false)}
        footer={null}
        width={800} // Increased width for better layout
      >
        <Row gutter={24}>
          <Col span={12}>
            <div
              style={{
                borderRight: "1px solid #f0f0f0",
                padding: "30px",
                background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                borderRadius: "15px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3
                style={{
                  color: "#2c3e50",
                  fontSize: "28px",
                  marginBottom: "15px",
                  fontWeight: "bold",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                Trở thành thành viên UNINEST
              </h3>
              <p
                style={{
                  color: "#34495e",
                  fontSize: "18px",
                  lineHeight: "1.6",
                  marginBottom: "10px",
                }}
              >
                Năng suất hơn, mạnh mẽ hơn. Dùng thử các tính năng ưu việt
              </p>
              <p
                style={{
                  color: "#e74c3c",
                  fontSize: "22px",
                  fontWeight: "bold",
                  marginBottom: "25px",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                Chỉ với 200.000đ đăng bài không giới hạn
              </p>
              <Checkbox onChange={(e) => setAutoRenew(e.target.checked)}>
                Tự động gia hạn hàng tháng
              </Checkbox>
              <Button
                type="primary"
                onClick={() => handleMembershipChoice("member")}
                style={{
                  marginTop: 20,
                  backgroundColor: "#3498db",
                  borderColor: "#3498db",
                  fontSize: "18px",
                  padding: "10px 25px",
                  height: "auto",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2980b9";
                  e.currentTarget.style.borderColor = "#2980b9";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#3498db";
                  e.currentTarget.style.borderColor = "#3498db";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Đăng kí làm thành viên
              </Button>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ paddingLeft: 20 }}>
              <h3
                style={{
                  fontSize: "28px",
                  color: "#2c3e50",
                  marginBottom: "30px",
                  borderBottom: "2px solid #3498db",
                  paddingBottom: "10px",
                }}
              >
                Sử dụng ví
              </h3>
              <div style={{ marginTop: "40px" }}>
                <h3>Chi tiết tài khoản</h3>
                <Card
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                    borderRadius: "12px",
                    marginBottom: "30px",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  hoverable
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h4 style={{ color: "#f0f0f0", marginBottom: "10px" }}>
                        TỔNG TÀI KHOẢN
                      </h4>
                      <p
                        style={{
                          fontSize: "32px",
                          fontWeight: "bold",
                          margin: 0,
                        }}
                      >
                        {formatCurrency(getUserWalletLocalStorage()) || 0}{" "}
                        <span style={{ fontSize: "24px" }}>VND</span>
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setIsMembershipModalVisible(false);
                        setIsTopUpModalVisible(true);
                      }}
                      style={{
                        backgroundColor: "#4CAF50",
                        borderColor: "#4CAF50",
                        color: "white",
                        fontWeight: "bold",
                        height: "auto",
                        padding: "10px 20px",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#45a049")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#4CAF50")
                      }
                    >
                      +Nạp thêm
                    </Button>
                  </div>
                </Card>
              </div>
              <p style={{ fontSize: "18px", color: "#34495e" }}>
                Tiền đăng bài:{" "}
                <span style={{ fontWeight: "bold", color: "#e74c3c" }}>
                  {formatCurrency(price)} VNĐ
                </span>
              </p>
              {getUserWalletLocalStorage() < price && (
                <div>
                  <p>
                    Số tiền cần nạp:{" "}
                    {formatCurrency(price - getUserWalletLocalStorage())}
                    VNĐ
                  </p>
                </div>
              )}
              {getUserWalletLocalStorage() >= price ? (
                <Button
                  type="primary"
                  onClick={() => handleMembershipChoice("wallet")}
                  style={{ marginTop: 20 }}
                >
                  Trả bằng ví
                </Button>
              ) : (
                <div>
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    Không đủ tiền để đăng bài
                  </p>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsMembershipModalVisible(false);
                      setIsTopUpModalVisible(true);
                    }}
                    style={{ marginTop: 20 }}
                  >
                    Nạp ví
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Modal>

      <TopUpForm
        visible={isTopUpModalVisible}
        onSuccess={handleTopUpSuccess}
        onClose={handleTopUpCancel}
        onReturnToMembership={handleTopUpCancel}
      />
    </div>
  );
};

export default PostProperty;
