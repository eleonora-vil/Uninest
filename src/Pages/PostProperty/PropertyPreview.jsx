import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  List,
  Divider,
  Image,
  Typography,
  Avatar,
  Descriptions,
  Space,
} from "antd";
import {
  PhoneOutlined,
  StarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";

const { Title, Text } = Typography;
const { Content } = Layout;

const ImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]?.image?.imageUrl);

  useEffect(() => {
    if (images && images.length > 0) {
      setMainImage(images[0]?.image?.imageUrl);
    }
  }, [images]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Image
          src={mainImage}
          alt="Main Property Image"
          style={{
            width: "55vw",
            height: "75vh",
            maxHeight: "100vh",
            maxWidth: "100vw",
            objectFit: "cover",
          }}
        />
      </Col>
      <Col span={24}>
        <Row
          gutter={[8, 8]}
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          {images.map((image, index) => (
            <Col key={index} style={{ display: "inline-block" }}>
              <Image
                src={image.image.imageUrl}
                alt={`Property Image ${index + 1}`}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => setMainImage(image.image.imageUrl)}
                preview={false}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

// useEffect(() => {
//   return () => {
//     propertyDetails.homeImages.forEach((image) => {
//       if (image.image.imageUrl.startsWith("blob:")) {
//         URL.revokeObjectURL(image.image.imageUrl);
//       }
//     });
//   };
// }, [propertyDetails.homeImages]);

const PropertyPreview = ({ propertyDetails }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Content style={{ padding: "20px", overflow: "auto" }}>
        {/* Breadcrumb */}
        <Row>
          <Col span={20}>
            <Text>
              <Link to="/" style={{ textDecoration: "none", color: "#F9A825" }}>
                Trang chủ
              </Link>{" "}
              &gt;{" "}
              <Link
                to="/listing"
                style={{ textDecoration: "none", color: "#F9A825" }}
              >
                Nhà Thuê
              </Link>{" "}
              &gt; {propertyDetails.name}
            </Text>
          </Col>
        </Row>

        {/* Main Property Section */}
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          {/* Image Gallery */}
          <Col xs={24} lg={14}>
            <ImageGallery images={propertyDetails.homeImages} />
          </Col>

          {/* Owner Information */}
          <Col xs={24} lg={10}>
            <Card style={{ top: 0, zIndex: 1 }}>
              <Row gutter={[16, 16]}>
                {/* Owner Details */}
                <Col span={24}>
                  <Space
                    direction="vertical"
                    align="center"
                    style={{ width: "100%" }}
                  >
                    <Avatar size={64} src="/path/to/default/avatar.jpg" />
                    <Title level={5}>{propertyDetails.ownerName}</Title>
                    <Text>
                      4.5 <StarOutlined /> (100 ratings)
                    </Text>
                  </Space>
                </Col>

                {/* Communication Options */}
                <Col span={24}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button
                      icon={<PhoneOutlined />}
                      size="large"
                      style={{ width: "100%" }}
                    >
                      Call Now
                    </Button>
                    <Button
                      icon={<MessageOutlined />}
                      size="large"
                      style={{ width: "100%" }}
                    >
                      Chat with Owner
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Property Details Section */}
        <Row gutter={[16, 16]} style={{ marginTop: 20, width: "100%" }}>
          <Col xs={24} lg={14}>
            <Card
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Descriptions
                title="Chi tiết cho thuê"
                bordered
                style={{ width: "100%" }}
              >
                <Descriptions.Item label="ID">
                  {propertyDetails.homeId}
                </Descriptions.Item>
                <Descriptions.Item label="Diện tích">
                  {propertyDetails.size} m²
                </Descriptions.Item>
                <Descriptions.Item label="Phòng tắm">
                  {propertyDetails.bathroom} phòng
                </Descriptions.Item>
                <Descriptions.Item label="Giá cả">
                  ${propertyDetails.price}/Tháng
                </Descriptions.Item>
                <Descriptions.Item label="Phòng ngủ">
                  {propertyDetails.bedrooms} phòng
                </Descriptions.Item>
              </Descriptions>

              <Divider>Mô tả</Divider>
              <Text>{propertyDetails.description}</Text>
            </Card>
          </Col>

          {/* Map Section */}
          <Col xs={24} lg={10}>
            <Card
              title="Vị trí"
              extra={<Button href="#map">Vị trí trên Google Maps</Button>}
            >
              <Image
                width="100%"
                src="/path/to/map-image.jpg"
                alt="Property Map"
              />
            </Card>

            <Card title="Khu vực khác" style={{ marginTop: 20 }}>
              <List
                size="small"
                dataSource={[
                  "District 1",
                  "District 2",
                  "District 7",
                  "Go Vap",
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Card>
          </Col>
        </Row>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default PropertyPreview;
