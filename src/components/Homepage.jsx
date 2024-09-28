import React from "react";
import { Layout, Carousel, Card, Row, Col } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import AppHeader from "./Header/Header";
import FooterComponent from "./Footer/Footer";
// import "./App.css"; // Add your custom styles here

const { Content } = Layout;

const Homepage = () => {
  const renderCard = () => (
    <Card
      hoverable
      cover={<img alt="room" src="https://placeimg.com/300/200/arch" />}
      actions={[<HeartOutlined />]}
    >
      <Card.Meta title="Title" description="Information" />
      <p>$ Price</p>
      <p>Location: Some Place</p>
    </Card>
  );

  return (
    <Layout>
      <AppHeader />

      <Content>
        {/* Banner Section */}
        <div
          className="banner"
          style={{
            backgroundImage: "url(/path-to-banner)",
            padding: "50px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1>Tìm kiếm một căn trọ hoàn hảo cho bạn với UNINEST</h1>
          <Row justify="center">
            <Col span={6}>
              <h3>Tìm phòng trọ</h3>
              <p>Cho thuê, 123456 tin đăng</p>
            </Col>
            <Col span={6}>
              <h3>Dịch vụ dọn nhà</h3>
            </Col>
            <Col span={6}>
              <h3>Dịch vụ chuyển nhà</h3>
            </Col>
          </Row>
        </div>

        {/* Listings Section */}
        <div className="listings-section" style={{ padding: "50px" }}>
          <h2>Cho thuê</h2>
          <Carousel dots={false} arrows>
            <div>
              <Row gutter={16}>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
              </Row>
            </div>
            <div>
              <Row gutter={16}>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
              </Row>
            </div>
          </Carousel>

          <h2>Cho thuê trong khu vực của bạn</h2>
          <Carousel dots={false} arrows>
            <div>
              <Row gutter={16}>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
              </Row>
            </div>
            <div>
              <Row gutter={16}>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
                <Col span={6}>{renderCard()}</Col>
              </Row>
            </div>
          </Carousel>
        </div>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default Homepage;
