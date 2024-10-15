import React from "react";
import { Layout, Card, Avatar, List, Button, Tag, Breadcrumb } from "antd";
import {
  UserOutlined,
  EnvironmentOutlined,
  StarOutlined,
} from "@ant-design/icons";
import CustomSider from "./CustomSider";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import "./ManageProperty.css"; // Import the CSS file

const { Content } = Layout;

const properties = [
  {
    title: "Cho thuê phòng Tx38, Hà Huy Giáp quận 12",
    size: "18 m²",
    price: "1,60 triệu/tháng",
    status: "Có sẵn",
    tenant: "Thành Tài",
    feedback: "Sạch sẽ thoáng mát",
    rating: 4.5,
    location: "Phường Thạnh Xuân",
    owner: "Minh Quang",
  },
  // Add more properties as needed
];

const ManageProperty = () => {
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
          <List
            itemLayout="vertical"
            size="large"
            dataSource={properties}
            renderItem={(item) => (
              <Card className="card">
                <List.Item key={item.title}>
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <img
                      width={150}
                      height={150}
                      alt="logo"
                      src="https://justatinabit.com/wp-content/uploads/2022/08/justatinabit-nursery-tour-peach-floral-theme-girl-nursery-decor-25.jpg"
                      className="card-image"
                    />
                    <div className="card-content">
                      <List.Item.Meta
                        title={
                          <a href="#" className="card-title">
                            {item.title}
                          </a>
                        }
                        description={
                          <>
                            <Tag color="black" className="tag">
                              Full nội thất
                            </Tag>
                            <Tag color="orange" className="tag">
                              {item.status}
                            </Tag>
                            <div className="size">Diện tích: {item.size}</div>
                            <div className="price">Giá thuê: {item.price}</div>
                            <div>
                              <UserOutlined /> Chủ nhà: {item.owner}
                              <EnvironmentOutlined
                                style={{ marginLeft: "10px" }}
                              />{" "}
                              {item.location}
                            </div>
                          </>
                        }
                      />
                    </div>
                  </div>
                  <div className="tenant-info">
                    <Avatar icon={<UserOutlined />} /> Người thuê: {item.tenant}
                    <StarOutlined style={{ marginLeft: "10px" }} />{" "}
                    {item.rating}
                    <div className="feedback">
                      {item.feedback}
                      <Button type="link" className="feedback-button">
                        Phản hồi
                      </Button>
                    </div>
                  </div>
                </List.Item>
              </Card>
            )}
          />
        </Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};

export default ManageProperty;
