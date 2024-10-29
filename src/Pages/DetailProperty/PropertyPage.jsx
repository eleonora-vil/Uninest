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
  Breadcrumb,
} from "antd";
import {
  StarOutlined,
  InfoCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";

const { Title, Text } = Typography;
const { Content } = Layout;

const ImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]?.image?.imageUrl);

  return (
    <Card bordered={false} className="gallery-card">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Image
            src={mainImage}
            alt="Main Property Image"
            style={{
              width: "100%",
              height: "600px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Col>
        <Col span={24}>
          <Row
            gutter={[12, 12]}
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              padding: "4px 0",
            }}
          >
            {images.map((image, index) => (
              <Col key={index} style={{ display: "inline-block" }}>
                <Image
                  src={image.image.imageUrl}
                  alt={`Property Image ${index + 1}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    cursor: "pointer",
                    borderRadius: "4px",
                    transition: "all 0.3s",
                    border:
                      mainImage === image.image.imageUrl
                        ? "2px solid #1890ff"
                        : "2px solid transparent",
                  }}
                  onClick={() => setMainImage(image.image.imageUrl)}
                  preview={false}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Card>
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
    <Card
      className="owner-card"
      style={{
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Space direction="vertical" align="center" style={{ width: "100%" }}>
            <Avatar
              size={80}
              src="/path/to/default/avatar.jpg"
              style={{ border: "2px solid #f0f0f0" }}
            />
            <Title level={4} style={{ margin: "12px 0 4px" }}>
              {propertyDetails.users.fullName}
            </Title>
            <Space>
              <StarOutlined style={{ color: "#faad14" }} />
              <Text strong>4.5</Text>
              <Text type="secondary">(100 ratings)</Text>
            </Space>

            {showContactInfo && (
              <Space direction="vertical" style={{ marginTop: "16px" }}>
                <Text strong>Email: {propertyDetails.users.email}</Text>
                <Text strong>Phone: {propertyDetails.users.phoneNumber}</Text>
              </Space>
            )}
          </Space>
        </Col>

        <Col span={24}>
          <Button
            type="primary"
            icon={<InfoCircleOutlined />}
            size="large"
            style={{
              width: "100%",
              height: "48px",
              borderRadius: "6px",
            }}
            onClick={handleBookNowClick}
          >
            {showContactInfo
              ? "Contact Information Shown"
              : "View Contact Info"}
          </Button>
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
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <AppHeader />
      <Content
        style={{ padding: "20px 48px", maxWidth: "1800px", margin: "0 auto" }}
      >
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: "24px" }}>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined /> Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/listing">Properties</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{propertyDetails?.name}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Property Title */}
        <Title level={2} style={{ marginBottom: "24px" }}>
          {propertyDetails?.name}
        </Title>

        {/* Main Content */}
        <Row gutter={[32, 32]}>
          <Col xs={26} xl={16} xxl={14}>
            <ImageGallery
              images={propertyDetails?.homeImages}
              style={{
                width: "100%",
                ".ant-image": {
                  width: "100%",
                  height: "600px", // Increased height
                },
              }}
            />

            {/* Property Details Card */}
            <Card
              style={{
                marginTop: "24px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Title level={4}>Property Details</Title>
              <Descriptions
                bordered
                column={{ xs: 1, sm: 2, md: 3, lg: 4 }} // More responsive columns
              >
                <Descriptions.Item label="ID">
                  {propertyDetails?.homeId}
                </Descriptions.Item>
                <Descriptions.Item label="Diện tích">
                  {propertyDetails.size} m²
                </Descriptions.Item>
                <Descriptions.Item label="Bathrooms">
                  {propertyDetails?.bathroom}
                </Descriptions.Item>
                <Descriptions.Item label="Price">
                  ${propertyDetails?.price}/Month
                </Descriptions.Item>
                <Descriptions.Item label="Bedrooms">
                  {propertyDetails?.bedrooms}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <Title level={4}>Description</Title>
              <Text>{propertyDetails?.description}</Text>
            </Card>
          </Col>

          <Col xs={24} xl={8} xxl={10}>
            <OwnerInfoCard />

            {/* Map Section */}
            <Card
              title={<Title level={4}>Location</Title>}
              style={{
                marginTop: "24px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {showContactInfo ? (
                <>
                  <PropertyMap location={propertyDetails?.location} />
                  <Button
                    type="link"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${propertyDetails.location.houseNumber} ${propertyDetails.location.street}, ${propertyDetails.location.town}, ${propertyDetails.location.district}, ${propertyDetails.location.province}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: "16px" }}
                  >
                    View on Google Maps
                  </Button>
                </>
              ) : (
                <div
                  style={{
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fafafa",
                    borderRadius: "8px",
                    border: "1px dashed #d9d9d9",
                  }}
                >
                  <Space direction="vertical" align="center">
                    <InfoCircleOutlined
                      style={{ fontSize: "32px", color: "#bfbfbf" }}
                    />
                    <Text type="secondary">
                      Subscribe to view the exact location
                    </Text>
                    <Button type="primary" onClick={handleBookNowClick}>
                      View Location
                    </Button>
                  </Space>
                </div>
              )}

              {/* Address Section */}
              <Descriptions column={1} style={{ marginTop: "24px" }} bordered>
                <Descriptions.Item label={<Text strong>Address</Text>}>
                  {showContactInfo
                    ? `${propertyDetails.location.houseNumber} ${propertyDetails.location.street}, ${propertyDetails.location.town}, ${propertyDetails.location.district}, ${propertyDetails.location.province}`
                    : "Login and subscribe to view full address"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Similar Properties */}
            <Card
              title={<Title level={4}>Similar Properties</Title>}
              style={{
                marginTop: "24px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <List
                itemLayout="horizontal"
                dataSource={[
                  "District 1",
                  "District 2",
                  "District 7",
                  "Go Vap",
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://via.placeholder.com/40" />}
                      title={<Text strong>{item}</Text>}
                      description="Available properties in this area"
                    />
                    <Button type="link">View</Button>
                  </List.Item>
                )}
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
