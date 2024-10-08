// import React, { useState } from "react";
// import {
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Button,
//   Upload,
//   Col,
//   Row,
//   Typography,
//   Breadcrumb,
//   message,
// } from "antd";
// import { InboxOutlined } from "@ant-design/icons";
// import "../../components/Style/PostProperty.css";
// import AppHeader from "../../components/Header/Header";
// import FooterComponent from "../../components/Footer/Footer";
// import api from "../../config/axios"; // Assuming you have the api.js file in the src folder

// const { Option } = Select;
// const { Title } = Typography;

// const PostProperty = () => {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);

//   const handleUploadChange = ({ fileList }) => {
//     setFileList(fileList);
//   };

//   const onFinish = async (values) => {
//     const formData = new FormData();
//     formData.append("name", values.name);
//     formData.append("price", values.price);
//     formData.append("size", values.size);
//     formData.append("description", values.description);
//     formData.append("bathroom", values.bathroom);
//     formData.append("bedrooms", values.bedrooms);
//     formData.append("locationId", values.locationId);
//     formData.append("utilitiesId", values.utilitiesId);

//     fileList.forEach((file) => {
//       formData.append("images", file.originFileObj);
//     });

//     // Log the form data
//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ": " + pair[1]);
//     }

//     try {
//       const response = await api.post("/api/Home/CreateHome", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         const createdHome = response.data;
//         message.success("Home created successfully!");
//         console.log("Created home:", createdHome);
//         form.resetFields();
//         setFileList([]);
//       } else {
//         message.error("Failed to create home.");
//       }
//     } catch (error) {
//       console.error("Error details:", error.response?.data);
//       message.error(`Error: ${error.response?.data || error.message}`);
//     }
//   };

//   return (
//     <div className="page-container">
//       <AppHeader />
//       <div className="content-wrapper">
//         <div className="form-container">
//           <Breadcrumb style={{ margin: "16px 0", paddingBottom: "15px" }}>
//             <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item>Post Property</Breadcrumb.Item>
//           </Breadcrumb>
//           <Title level={2}>Create New Home</Title>
//           <Form form={form} layout="vertical" onFinish={onFinish}>
//             <Row gutter={24}>
//               <Col span={12}>
//                 <Form.Item
//                   name="name"
//                   label="Name"
//                   rules={[
//                     { required: true, message: "Please input the name!" },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   name="price"
//                   label="Price"
//                   rules={[
//                     { required: true, message: "Please input the price!" },
//                   ]}
//                 >
//                   <InputNumber style={{ width: "100%" }} />
//                 </Form.Item>
//                 <Form.Item
//                   name="size"
//                   label="Size"
//                   rules={[
//                     { required: true, message: "Please input the size!" },
//                   ]}
//                 >
//                   <InputNumber style={{ width: "100%" }} />
//                 </Form.Item>
//                 <Form.Item name="description" label="Description">
//                   <Input.TextArea />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   name="bathroom"
//                   label="Number of Bathrooms"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please input the number of bathrooms!",
//                     },
//                   ]}
//                 >
//                   <InputNumber style={{ width: "100%" }} />
//                 </Form.Item>
//                 <Form.Item
//                   name="bedrooms"
//                   label="Number of Bedrooms"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please input the number of bedrooms!",
//                     },
//                   ]}
//                 >
//                   <InputNumber style={{ width: "100%" }} />
//                 </Form.Item>
//                 <Form.Item
//                   name="locationId"
//                   label="Location ID"
//                   rules={[
//                     { required: true, message: "Please select the location!" },
//                   ]}
//                 >
//                   <Select placeholder="Select location">
//                     <Option value={1}>Location 1</Option>
//                     <Option value={2}>Location 2</Option>
//                     {/* Add more options as needed */}
//                   </Select>
//                 </Form.Item>
//                 <Form.Item
//                   name="utilitiesId"
//                   label="Utilities ID"
//                   rules={[
//                     { required: true, message: "Please select the utilities!" },
//                   ]}
//                 >
//                   <Select placeholder="Select utilities">
//                     <Option value={1}>Utilities 1</Option>
//                     <Option value={2}>Utilities 2</Option>
//                     {/* Add more options as needed */}
//                   </Select>
//                 </Form.Item>
//               </Col>
//             </Row>
//             <Form.Item label="Upload Images">
//               <Upload.Dragger
//                 name="images"
//                 multiple
//                 fileList={fileList}
//                 onChange={handleUploadChange}
//                 beforeUpload={() => false}
//               >
//                 <p className="ant-upload-drag-icon">
//                   <InboxOutlined />
//                 </p>
//                 <p className="ant-upload-text">
//                   Click or drag file to this area to upload
//                 </p>
//               </Upload.Dragger>
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Create Home
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//       <FooterComponent />
//     </div>
//   );
// };

// export default PostProperty;

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
  Typography,
  Breadcrumb,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "../../components/Style/PostProperty.css";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";

const { Option } = Select;
const { Text } = Typography;

const PostProperty = () => {
  const [fileList, setFileList] = useState([]);

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
