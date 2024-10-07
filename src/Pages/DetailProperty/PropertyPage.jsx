import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axios";
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
} from "antd";
import {
  PhoneOutlined,
  StarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
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
            width: "100%",
            height: "auto",
            maxHeight: "650px",
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

const PropertyPage = () => {
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            <Text>Trang chủ &gt; Nhà thuê &gt; {propertyDetails.name}</Text>
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
            <Card>
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
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col xs={24} lg={14}>
            <Card>
              <Descriptions title="Property Details" bordered>
                <Descriptions.Item label="ID">
                  {propertyDetails.homeId}
                </Descriptions.Item>
                <Descriptions.Item label="Size">
                  {propertyDetails.size} sqm
                </Descriptions.Item>
                <Descriptions.Item label="Bathrooms">
                  {propertyDetails.bathroom}
                </Descriptions.Item>
                <Descriptions.Item label="Price">
                  ${propertyDetails.price}
                </Descriptions.Item>
                <Descriptions.Item label="Bedrooms">
                  {propertyDetails.bedrooms}
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  {propertyDetails.name}
                </Descriptions.Item>
              </Descriptions>

              <Divider>Description</Divider>
              <Text>{propertyDetails.description}</Text>
            </Card>
          </Col>

          {/* Map Section */}
          <Col xs={24} lg={10}>
            <Card
              title="Location"
              extra={<Button href="#map">View on Google Maps</Button>}
            >
              {/* Insert Google Maps API or Image Here */}
              <Image
                width="100%"
                src="/path/to/map-image.jpg"
                alt="Property Map"
              />
            </Card>

            <Card title="Other Areas" style={{ marginTop: 20 }}>
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
