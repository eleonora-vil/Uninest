import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/axios";
import PropertyMap from "./PropertyMap";
import {
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
  Layout,
  Modal,
} from "antd";
import { StarOutlined, InfoCircleOutlined } from "@ant-design/icons";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";

const { Title, Text } = Typography;
const { Content } = Layout;

const ImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]?.image?.imageUrl);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Image
          src={mainImage}
          alt="Main Property Image"
          style={{
            width: "55vw",
            height: "75vh",
            maxHeight: "90vh",
            maxWidth: "90vw",
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

const PropertyPage = () => {
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  const isMember = userData?.isActiveMember;

  // Handle book now click
  const handleBookNowClick = () => {
    if (!userData) {
      Modal.warning({
        title: "Login Required",
        content: "Please login to view contact information.",
      });
      return;
    }

    if (!isMember) {
      Modal.warning({
        title: "Membership Required",
        content:
          "You need to be a member to view contact information. Please subscribe to continue.",
      });
      return;
    }

    setShowContactInfo(true);
  };

  // Modify the owner information card section
  const OwnerInfoCard = () => (
    <Card style={{ top: 0, zIndex: 1 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space direction="vertical" align="center" style={{ width: "100%" }}>
            <Avatar size={64} src="/path/to/default/avatar.jpg" />
            <Title level={5}>{propertyDetails.users.fullName}</Title>
            <Text>
              4.5 <StarOutlined /> (100 ratings)
            </Text>

            {showContactInfo && (
              <>
                <Text strong>Email: {propertyDetails.users.email}</Text>
                <Text strong>Phone: {propertyDetails.users.phoneNumber}</Text>
              </>
            )}
          </Space>
        </Col>

        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              icon={<InfoCircleOutlined />}
              size="large"
              style={{ width: "100%" }}
              onClick={handleBookNowClick}
            >
              {showContactInfo
                ? "Contact Information Shown"
                : "View Contact Info"}
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );

  const AddressSection = () => (
    <Descriptions column={1} style={{ marginTop: "16px" }}>
      <Descriptions.Item label="Địa chỉ">
        {showContactInfo
          ? `${propertyDetails.location.houseNumber} ${propertyDetails.location.street}, ${propertyDetails.location.town}, ${propertyDetails.location.district}, ${propertyDetails.location.province}`
          : "Login and subscribe to view full address"}
      </Descriptions.Item>
    </Descriptions>
  );

  const MapSection = () => (
    <Card
      title="Vị trí"
      extra={
        showContactInfo ? (
          <Button
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${propertyDetails.location.houseNumber} ${propertyDetails.location.street}, ${propertyDetails.location.town}, ${propertyDetails.location.district}, ${propertyDetails.location.province}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Xem trên Google Maps
          </Button>
        ) : (
          <Button onClick={handleBookNowClick} icon={<InfoCircleOutlined />}>
            View Location
          </Button>
        )
      }
    >
      {showContactInfo ? (
        <PropertyMap location={propertyDetails.location} />
      ) : (
        <div
          style={{
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
            border: "1px dashed #d9d9d9",
            borderRadius: "2px",
          }}
        >
          <Space direction="vertical" align="center">
            <InfoCircleOutlined
              style={{ fontSize: "24px", color: "#bfbfbf" }}
            />
            <Text type="secondary">Subscribe to view the exact location</Text>
          </Space>
        </div>
      )}
      <AddressSection />
    </Card>
  );

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await api.get(`api/Home/GetHomeByID?id=${id}`);
        setPropertyDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!propertyDetails) return <div>No property details found</div>;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Content style={{ padding: "20px", overflow: "auto" }}>
        {/* Breadcrumb */}
        <Row>
          <Col span={20}>
            <Text>
              <Link
                underline="none"
                to={`/`}
                style={{
                  textDecoration: "none",
                  color: "#F9A825",
                }}
              >
                Trang chủ
              </Link>{" "}
              &gt;{" "}
              <Link
                underline="none"
                to={`/listing`}
                style={{
                  textDecoration: "none",
                  color: "#F9A825",
                }}
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
            <OwnerInfoCard />
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
                  {propertyDetails.size} 300 sqm
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
                {/* <Descriptions.Item label="Name" style={{ width: "20%" }}>
                  {propertyDetails.name}
                </Descriptions.Item> */}
              </Descriptions>

              <Divider>Mô tả</Divider>
              <Text>{propertyDetails.description}</Text>
            </Card>
          </Col>

          {/* Map Section */}
          <Col xs={24} lg={10}>
            <MapSection />
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

export default PropertyPage;
