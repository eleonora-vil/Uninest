import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Avatar,
  List,
  Button,
  Tag,
  Breadcrumb,
  message,
} from "antd";
import {
  UserOutlined,
  EnvironmentOutlined,
  StarOutlined,
} from "@ant-design/icons";
import CustomSider from "./CustomSider";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import PropertyService from "./PropertyService";
import "./ManageProperty.css";

const { Content } = Layout;

const ManageProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData || !userData.userId) {
        throw new Error("User ID not found");
      }
      const data = await PropertyService.getHomesByUserId(userData.userId);
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      message.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await PropertyService.deleteHome(id);
      message.success("Property deleted successfully");
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
      message.error("Failed to delete property");
    }
  };

  return (
    <Layout>
      <AppHeader />
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý nhà</Breadcrumb.Item>
      </Breadcrumb>

      <Layout>
        <CustomSider />
        <Content style={{ padding: "0 50px" }}>
          {loading ? (
            <div>Loading...</div>
          ) : properties.length === 0 ? (
            <div>You don't have any properties yet.</div>
          ) : (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={properties}
              renderItem={(item) => (
                <Card className="card">
                  <List.Item key={item.homeId}>
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <img
                        width={150}
                        height={150}
                        alt="property"
                        src={
                          item.homeImages[0]?.image?.imageUrl ||
                          "https://via.placeholder.com/150"
                        }
                        className="card-image"
                      />
                      <div className="card-content">
                        <List.Item.Meta
                          title={
                            <a href="#" className="card-title">
                              {item.name}
                            </a>
                          }
                          description={
                            <>
                              <Tag color="black" className="tag">
                                Full nội thất
                              </Tag>
                              <Tag color="orange" className="tag">
                                {item.status || "Có sẵn"}
                              </Tag>
                              <div className="size">Diện tích: {item.size}</div>
                              <div className="price">
                                Giá thuê: {item.price}
                              </div>
                              <div>
                                <UserOutlined /> Chủ nhà: {item.owner}
                                <EnvironmentOutlined
                                  style={{ marginLeft: "10px" }}
                                />{" "}
                                {item.location?.province}
                              </div>
                            </>
                          }
                        />
                      </div>
                    </div>
                    <div className="tenant-info">
                      <Avatar icon={<UserOutlined />} /> Người thuê:{" "}
                      {item.tenant || "N/A"}
                      <StarOutlined style={{ marginLeft: "10px" }} />{" "}
                      {item.rating || "N/A"}
                      <div className="feedback">
                        {item.feedback || "Chưa có phản hồi"}
                        <Button type="link" className="feedback-button">
                          Phản hồi
                        </Button>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDelete(item.homeId)}
                      danger
                      style={{ marginTop: 16 }}
                    >
                      Xóa nhà
                    </Button>
                  </List.Item>
                </Card>
              )}
            />
          )}
        </Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};

export default ManageProperty;
