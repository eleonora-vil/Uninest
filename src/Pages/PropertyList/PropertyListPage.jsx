// App.js

import React, { useState } from "react";
import {
  List,
  Card,
  Button,
  Space,
  Dropdown,
  Menu,
  Radio,
  Row,
  Col,
  Collapse,
  Layout,
  Typography,
} from "antd";
import {
  FilterOutlined,
  DownOutlined,
  LaptopOutlined,
  RocketOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "./App.css";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";

const { Panel } = Collapse;
const { Content } = Layout;

const properties = [
  {
    title: "Phòng trọ Thanh Lộc mới 30m2",
    price: "3,30 triệu/tháng",
    area: "30 m²",
    status: "Cá Nhân",
    location: "758 Hà Huy Giáp",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "NHÀ TRỌ MỚI XÂY",
    price: "2,90 triệu/tháng",
    area: "30 m²",
    status: "Môi giới",
    location: "đường TX40",
    image: "https://via.placeholder.com/150",
  },
  // Add more properties as needed
];

const PropertyList = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [category, setCategory] = useState("Tất cả");
  const [sortLabel, setSortLabel] = useState("Giá thấp trước");

  const menu = (
    <Menu onClick={(e) => setSortLabel(e.key)}>
      <Menu.Item key="Giá thấp trước">Giá thấp trước</Menu.Item>
      <Menu.Item key="Giá cao trước">Giá cao trước</Menu.Item>
    </Menu>
  );

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value === "Tất cả") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(
        properties.filter((property) => property.status === e.target.value)
      );
    }
  };

  const handlePriceFilter = (min, max) => {
    setFilteredProperties(
      properties.filter(
        (property) => property.price >= min && property.price <= max
      )
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Content
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          marginTop: "5px",
          marginBottom: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <Space>
            <Button icon={<FilterOutlined />} type="text" value="large">
              Lọc
            </Button>
            <Button className="gradient-button" type="text" value="large">
              Quận 12
            </Button>
            <Button className="gradient-button" type="text" value="large">
              Giá thuê
            </Button>
            <Button className="gradient-button" type="text" value="large">
              Diện tích
            </Button>
            <Button className="gradient-button" type="text" value="large">
              Tình trạng
            </Button>
          </Space>
        </div>
        <Row gutter={16}>
          <Col span={16}>
            <div
              style={{
                marginBottom: "16px",
                backgroundColor: "#f5f5f5",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <div className="scrollable-buttons">
                <Space>
                  <Button className="custom-button" type="default">
                    Ký túc xá quận 12
                  </Button>
                  <Button className="custom-button" type="default">
                    Phòng trọ nam ở ghép quận 12
                  </Button>
                  <Button className="custom-button" type="default">
                    Phòng trọ gần đại học Nguyễn Tất Thành
                  </Button>
                  <Button className="custom-button" type="default">
                    Phòng trọ nữ ở ghép quận 12
                  </Button>
                </Space>
              </div>
              <Space
                style={{
                  marginTop: "20px",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Radio.Group value={category} onChange={handleCategoryChange}>
                  <Radio.Button value="Tất cả">Tất cả</Radio.Button>
                  <Radio.Button value="Cá Nhân">Cá Nhân</Radio.Button>
                  <Radio.Button value="Môi giới">Môi giới</Radio.Button>
                </Radio.Group>
                <Dropdown overlay={menu}>
                  <Button className="gradient-button">
                    {sortLabel} <DownOutlined />
                  </Button>
                </Dropdown>
              </Space>
            </div>
            <List
              itemLayout="vertical"
              size="small"
              dataSource={filteredProperties}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    style={{ display: "flex", alignItems: "center" }}
                    bodyStyle={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "10px",
                    }}
                  >
                    <img
                      alt="property"
                      src={item.image}
                      style={{
                        width: "150px",
                        height: "100px",
                        marginRight: "16px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3>{item.title}</h3>
                      <p>{item.area}</p>
                      <p style={{ color: "red", fontWeight: "bold" }}>
                        {item.price}
                      </p>
                      <p>{item.location}</p>

                      <Space>
                        <Button icon={<LaptopOutlined />} />
                        <Typography style={{ marginRight: "10px" }}>
                          Name
                        </Typography>
                        <Button icon={<RocketOutlined />} />
                        <Typography style={{ marginRight: "350px" }}>
                          Tin
                        </Typography>
                        <Button icon={<HeartOutlined />} danger />
                      </Space>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: "#f5f5f5",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Lọc theo khoảng giá" key="1">
                  <ul>
                    <li>
                      <Button
                        type="text"
                        onClick={() => handlePriceFilter(0, 1000000)}
                      >
                        Dưới 1 triệu
                      </Button>
                    </li>
                    <li>
                      <Button
                        type="text"
                        onClick={() => handlePriceFilter(1000000, 2000000)}
                      >
                        1 - 2 triệu
                      </Button>
                    </li>
                    <li>
                      <Button
                        type="text"
                        onClick={() => handlePriceFilter(2000000, 3000000)}
                      >
                        2 - 3 triệu
                      </Button>
                    </li>
                    <li>
                      <Button
                        type="text"
                        onClick={() => handlePriceFilter(3000000, 5000000)}
                      >
                        3 - 5 triệu
                      </Button>
                    </li>
                    <li>
                      <Button
                        type="text"
                        onClick={() => handlePriceFilter(5000000, 7000000)}
                      >
                        5 - 7 triệu
                      </Button>
                    </li>
                    <li>
                      <Button
                        type="text"
                        onClick={() => handlePriceFilter(7000000, Infinity)}
                      >
                        Trên 7 triệu
                      </Button>
                    </li>
                    <li>
                      <Button type="text">Xem thêm</Button>
                    </li>
                  </ul>
                </Panel>
                <Panel header="Lọc theo diện tích" key="2">
                  <ul>
                    <li>
                      <Button type="text">Dưới 20 m²</Button>
                    </li>
                    <li>
                      <Button type="text">20 - 30 m²</Button>
                    </li>
                    <li>
                      <Button type="text">30 - 40 m²</Button>
                    </li>
                    <li>
                      <Button type="text">40 - 50 m²</Button>
                    </li>
                    <li>
                      <Button type="text">Trên 50 m²</Button>
                    </li>
                  </ul>
                </Panel>
                <Panel header="Lọc theo tình trạng" key="3">
                  <ul>
                    <li>
                      <Button type="text">Nội thất cao cấp</Button>
                    </li>
                    <li>
                      <Button type="text">Nội thất đầy đủ</Button>
                    </li>
                    <li>
                      <Button type="text">Nhà trống</Button>
                    </li>
                  </ul>
                </Panel>
                <Panel header="Lọc theo khu vực" key="4">
                  <ul>
                    <li>
                      <Button type="text">Phuờng An Phú</Button>
                    </li>
                    <li>
                      <Button type="text">Phuờng An Phú</Button>
                    </li>
                    <li>
                      <Button type="text">Phuờng An Phú</Button>
                    </li>
                  </ul>
                </Panel>
              </Collapse>
            </div>
          </Col>
        </Row>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default PropertyList;
