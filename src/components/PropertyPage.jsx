import {
  Row,
  Col,
  Card,
  Button,
  List,
  Divider,
  Image,
  Tag,
  Typography,
  Avatar,
  Descriptions,
  Space,
  Layout,
  Carousel,
} from "antd";
import {
  PhoneOutlined,
  StarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import AppHeader from "./Header/Header";
import FooterComponent from "./Footer/Footer";

const { Title, Text } = Typography;

const PropertyPage = () => {
  const propertyDetails = {
    id: 1970,
    price: "$850",
    size: "75 sqm",
    bedrooms: 2,
    bathrooms: 2,
    status: "Furnished",
    address: "Masteri Thao Dien, Xa Lo Ha Noi Street, District 2",
    owner: {
      name: "Minh Quang",
      rating: 4.5,
      contact: "03262197034",
      image: "https://randomuser.me/api/portraits/men/32.jpg", // replace with actual owner image
    },
    amenities: [
      "Elevator",
      "Swimming Pool",
      "Gym",
      "TV",
      "Refrigerator",
      "Parking",
      "Balcony",
      "Air conditioner",
    ],
    description: "This apartment is located near central Thao Dien ...",
  };

  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/3/3d/Random_House.jpg",
    "/path/to/image2.jpg",
    "/path/to/image3.jpg",
    // Add all your image URLs here
  ];

  return (
    <Layout>
      <AppHeader />

      <div style={{ padding: "20px" }}>
        {/* Breadcrumb */}
        <Row>
          <Col span={24}>
            <Text>Trang chủ &gt; Nhà thuê</Text>
          </Col>
        </Row>

        {/* Main Property Section */}
        <Row gutter={16} style={{ marginTop: 20 }}>
          {/* Image Slider */}
          <Col span={16}>
            <Carousel autoplay>
              {images.map((src, index) => (
                <div key={index}>
                  <Image
                    width={"100%"}
                    src={src}
                    alt={`Property Image ${index + 1}`}
                  />
                </div>
              ))}
            </Carousel>
          </Col>

          {/* Owner Information */}
          <Col span={8}>
            <Card>
              <Space
                direction="vertical"
                align="center"
                style={{ width: "100%" }}
              >
                <Avatar size={64} src={propertyDetails.owner.image} />
                <Title level={5}>{propertyDetails.owner.name}</Title>
                <Text>
                  {propertyDetails.owner.rating} <StarOutlined /> (100 ratings)
                </Text>
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
            </Card>
          </Col>
        </Row>

        {/* Property Details Section */}
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={16}>
            <Descriptions title="Property Details" bordered>
              <Descriptions.Item label="ID">
                {propertyDetails.id}
              </Descriptions.Item>
              <Descriptions.Item label="Size">
                {propertyDetails.size}
              </Descriptions.Item>
              <Descriptions.Item label="Bathrooms">
                {propertyDetails.bathrooms}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                {propertyDetails.price}
              </Descriptions.Item>
              <Descriptions.Item label="Bedrooms">
                {propertyDetails.bedrooms}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {propertyDetails.status}
              </Descriptions.Item>
            </Descriptions>

            <Divider>Features</Divider>
            <List
              dataSource={propertyDetails.amenities}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />

            <Divider>Description</Divider>
            <Text>{propertyDetails.description}</Text>
          </Col>

          {/* Map Section */}
          <Col span={8}>
            <Card
              title="Location"
              extra={<Button href="#map">View on Google Maps</Button>}
            >
              {/* Insert Google Maps API or Image Here */}
              <Image
                width={"100%"}
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
      </div>
      <FooterComponent />
    </Layout>
  );
};

export default PropertyPage;
