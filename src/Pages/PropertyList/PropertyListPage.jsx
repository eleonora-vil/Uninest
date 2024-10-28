import React, { useState, useEffect } from "react";
import {
  List,
  Card,
  Button,
  Space,
  Menu,
  Row,
  Col,
  Collapse,
  Layout,
  Typography,
  Tag,
  message,
  Empty,
} from "antd";
import {
  FilterOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import api from "../../config/axios";

const { Panel } = Collapse;
const { Content } = Layout;
const { Text } = Typography;

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [sizeRange, setSizeRange] = useState(null);
  const [selectedUtilities, setSelectedUtilities] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [areaFilter, setAreaFilter] = useState(null);
  const [priceSort, setPriceSort] = useState(null); // null, 'asc', or 'desc'
  const [sizeSort, setSizeSort] = useState(null); // null, 'asc', or 'desc'

  // Add sorting functions
  const handlePriceSort = () => {
    const newSort = priceSort === "asc" ? "desc" : "asc";
    setPriceSort(newSort);
    setSizeSort(null); // Reset size sort when sorting by price

    const sorted = [...filteredProperties].sort((a, b) => {
      const priceA = parseFloat(
        a.price.replace(/[^0-9.,]/g, "").replace(",", ".")
      );
      const priceB = parseFloat(
        b.price.replace(/[^0-9.,]/g, "").replace(",", ".")
      );
      return newSort === "asc" ? priceA - priceB : priceB - priceA;
    });

    setFilteredProperties(sorted);
  };

  const handleSizeSort = () => {
    const newSort = sizeSort === "asc" ? "desc" : "asc";
    setSizeSort(newSort);
    setPriceSort(null); // Reset price sort when sorting by size

    const sorted = [...filteredProperties].sort((a, b) => {
      const sizeA = parseFloat(
        a.size.replace(/[^0-9.,]/g, "").replace(",", ".")
      );
      const sizeB = parseFloat(
        b.size.replace(/[^0-9.,]/g, "").replace(",", ".")
      );
      return newSort === "asc" ? sizeA - sizeB : sizeB - sizeA;
    });

    setFilteredProperties(sorted);
  };

  const applyFilters = (properties) => {
    let filtered = [...properties];

    // Price range filter
    if (priceRange) {
      filtered = filtered.filter((property) => {
        // Convert "6.5 triệu" or "4,2 triệu" to number
        const priceText = property.price.toLowerCase();
        const priceNumber =
          parseFloat(priceText.replace("triệu", "").replace(",", ".").trim()) *
          1000000; // Convert to actual value

        return priceNumber >= priceRange.min && priceNumber <= priceRange.max;
      });
    }

    // Size range filter
    if (sizeRange) {
      filtered = filtered.filter((property) => {
        // Handle the space before the number and any other formatting
        const sizeNumber = parseFloat(
          property.size
            .trim() // Remove leading/trailing spaces
            .replace(/\s+/g, "") // Remove all spaces
            .replace("m2", "")
            .replace("m²", "")
        );

        console.log("Size:", property.size, "Parsed:", sizeNumber); // For debugging
        return (
          !isNaN(sizeNumber) &&
          sizeNumber >= sizeRange.min &&
          sizeNumber <= sizeRange.max
        );
      });
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(
        (property) => property.status === statusFilter
      );
    }

    // Area filter
    if (areaFilter) {
      filtered = filtered.filter((property) => property.area === areaFilter);
    }

    // Utilities filter
    if (selectedUtilities.length > 0) {
      filtered = filtered.filter((property) =>
        selectedUtilities.every(
          (utility) =>
            property.utilities && property.utilities[utility] === true
        )
      );
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = applyFilters(properties);
    setFilteredProperties(filtered);
  }, [
    properties,
    priceRange,
    sizeRange,
    statusFilter,
    areaFilter,
    selectedUtilities,
  ]);

  const handlePriceFilter = (min, max) => {
    setPriceRange({ min, max });
  };

  const handleSizeFilter = (min, max) => {
    setSizeRange({ min, max });
    console.log(`Setting size range: ${min} - ${max}`); // For debugging
  };

  const clearFilters = () => {
    setPriceRange(null);
    setSizeRange(null);
    setStatusFilter(null);
    setAreaFilter(null);
    setSelectedUtilities([]);
    setFilteredProperties(properties); // Reset to original properties
    message.success("Đã xóa tất cả bộ lọc"); // Show success message
  };

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    const fetchProperties = async () => {
      try {
        const response = await api.get("api/Home/GetAll");
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        setError(error.message);
        message.error("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const renderLocation = (location) => {
    if (!userData || !userData.isActiveMember) {
      return (
        <Space>
          <EnvironmentOutlined />
          <Text type="secondary">
            <Link to="/auth" style={{ color: "#1890ff" }}>
              Subscribe to view location
            </Link>
          </Text>
        </Space>
      );
    }

    return (
      <Space>
        <EnvironmentOutlined />
        <Text>{formatAddress(location)}</Text>
      </Space>
    );
  };

  const formatAddress = (location) => {
    if (!location) return "";
    const parts = [
      location.houseNumber,
      location.street,
      location.town,
      location.district,
      location.province,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const renderUtilities = (utilities) => {
    if (!utilities) return null;
    const activeUtilities = Object.entries(utilities)
      .filter(([key, value]) => value === true && key !== "utilitiesId")
      .map(([key]) => {
        const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
        return (
          <Tag key={key} color="blue">
            {formatKey}
          </Tag>
        );
      });
    return <Space wrap>{activeUtilities}</Space>;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Content
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          marginTop: "65px",
          marginBottom: "64px",
        }}
      >
        {/* Filter controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Space>
            <Button icon={<FilterOutlined />} type="text" value="large">
              Lọc
            </Button>
            {/* <Button className="gradient-button" type="text" value="large">
              Quận 12
            </Button> */}
            <Button
              className="gradient-button"
              type="text"
              value="large"
              onClick={handlePriceSort}
              icon={
                priceSort ? (
                  priceSort === "asc" ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                ) : null
              }
            >
              Giá thuê{" "}
              {priceSort === "asc"
                ? "(Thấp - Cao)"
                : priceSort === "desc"
                ? "(Cao - Thấp)"
                : ""}
            </Button>

            <Button
              className="gradient-button"
              type="text"
              value="large"
              onClick={handleSizeSort}
              icon={
                sizeSort ? (
                  sizeSort === "asc" ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                ) : null
              }
            >
              Diện tích{" "}
              {sizeSort === "asc"
                ? "(Nhỏ - Lớn)"
                : sizeSort === "desc"
                ? "(Lớn - Nhỏ)"
                : ""}
            </Button>
            {/* <Button className="gradient-button" type="text" value="large">
              Tình trạng
            </Button> */}
          </Space>
        </div>

        {/* Main content area */}
        <Row
          gutter={[24, 24]}
          style={{
            minHeight: "calc(100vh - 200px)",
            position: "relative",
          }}
        >
          {/* House listings */}
          <Col
            span={16}
            style={{
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {filteredProperties.length === 0 ? (
              <div
                style={{
                  padding: "40px",
                  background: "#ffffff",
                  borderRadius: "8px",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Empty
                  description={<span>Không tìm thấy kết quả phù hợp</span>}
                  style={{ margin: 0 }}
                />
              </div>
            ) : (
              <List
                itemLayout="vertical"
                size="large"
                dataSource={filteredProperties}
                renderItem={(item) => (
                  <Link
                    to={`/property/${item.homeId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <List.Item style={{ marginBottom: "16px" }}>
                      <Card hoverable style={{ width: "100%" }}>
                        <Row gutter={16}>
                          <Col span={8}>
                            <img
                              alt={item.name}
                              src={
                                item.homeImages?.[0]?.image?.imageUrl ||
                                "https://via.placeholder.com/150"
                              }
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          </Col>
                          <Col span={16}>
                            <Typography.Title level={4}>
                              {item.name}
                            </Typography.Title>

                            <Space direction="vertical" size="small">
                              <Text
                                strong
                                style={{ color: "#f5222d", fontSize: "18px" }}
                              >
                                {item.price}/tháng
                              </Text>

                              <Space>
                                <HomeOutlined />
                                <Text>{item.size}</Text>
                                <Text>•</Text>
                                <Text>{item.bedrooms} PN</Text>
                                <Text>•</Text>
                                <Text>{item.bathroom} VS</Text>
                              </Space>

                              {renderLocation(item.location)}

                              <div style={{ marginTop: "8px" }}>
                                {renderUtilities(item.utilities)}
                              </div>
                            </Space>
                          </Col>
                        </Row>
                      </Card>
                    </List.Item>
                  </Link>
                )}
              />
            )}
          </Col>

          {/* Filters Column */}
          <Col
            span={8}
            style={{
              position: "sticky",
              top: 0,
              height: "fit-content",
            }}
          >
            <div
              style={{
                backgroundColor: "#f5f5f5",
                padding: "16px",
                borderRadius: "8px",
                position: "sticky",
                top: "85px",
                width: "100%",
              }}
            >
              <Button
                onClick={clearFilters}
                style={{
                  width: "100%",
                  marginBottom: "16px",
                  height: "40px",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="gradient-button"
                icon={<FilterOutlined />}
              >
                Xóa bộ lọc
              </Button>
              <Collapse defaultActiveKey={["1", "2", "3", "4"]}>
                <Panel header="Lọc theo khoảng giá" key="1">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {[
                      { text: "Dưới 2 triệu", range: [0, 2000000] },
                      { text: "2 - 3 triệu", range: [2000000, 3000000] },
                      { text: "3 - 5 triệu", range: [3000000, 5000000] },
                      { text: "5 - 7 triệu", range: [5000000, 7000000] },
                      { text: "7 - 10 triệu", range: [7000000, 10000000] },
                      { text: "Trên 10 triệu", range: [10000000, Infinity] },
                    ].map((item, index) => (
                      <Button
                        key={index}
                        type={
                          priceRange?.min === item.range[0] ? "primary" : "text"
                        }
                        onClick={() => handlePriceFilter(...item.range)}
                        style={{
                          width: "100%",
                          height: "36px",
                          padding: "0 12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <span style={{ marginLeft: "0" }}>{item.text}</span>
                      </Button>
                    ))}
                  </Space>
                </Panel>

                <Panel header="Lọc theo diện tích" key="2">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {[
                      { text: "Dưới 30 m²", range: [0, 30] },
                      { text: "30 - 50 m²", range: [30, 50] },
                      { text: "50 - 80 m²", range: [50, 80] },
                      { text: "80 - 100 m²", range: [80, 100] },
                      { text: "Trên 100 m²", range: [100, Infinity] },
                    ].map((item, index) => (
                      <Button
                        key={index}
                        type={
                          sizeRange?.min === item.range[0] ? "primary" : "text"
                        }
                        onClick={() => handleSizeFilter(...item.range)}
                        style={{
                          width: "100%",
                          height: "36px",
                          padding: "0 12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <span style={{ marginLeft: "0" }}>{item.text}</span>
                      </Button>
                    ))}
                  </Space>
                </Panel>

                {/* <Panel header="Lọc theo tình trạng" key="3">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {[
                      { text: "Nội thất cao cấp", value: "cachep" },
                      { text: "Nội thất đầy đủ", value: "full" },
                      { text: "Nhà trống", value: "empty" },
                    ].map((item, index) => (
                      <Button
                        key={index}
                        type={statusFilter === item.value ? "primary" : "text"}
                        onClick={() => handleStatusFilter(item.value)}
                        style={{
                          width: "100%",
                          height: "36px",
                          padding: "0 12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <span style={{ marginLeft: "0" }}>{item.text}</span>
                      </Button>
                    ))}
                  </Space>
                </Panel>

                <Panel header="Lọc theo khu vực" key="4">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {["Phường An Phú", "Phường An Phú", "Phường An Phú"].map(
                      (area, index) => (
                        <Button
                          key={index}
                          type={areaFilter === area ? "primary" : "text"}
                          onClick={() => handleAreaFilter(area)}
                          style={{
                            width: "100%",
                            height: "36px",
                            padding: "0 12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <span style={{ marginLeft: "0" }}>{area}</span>
                        </Button>
                      )
                    )}
                  </Space>
                </Panel> */}
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
