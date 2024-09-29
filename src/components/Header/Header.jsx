import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Button, Input, Space } from "antd";
import {
  BellOutlined,
  MessageOutlined,
  FileOutlined,
  DownOutlined,
  SearchOutlined,
  MenuOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const { Header } = Layout;
// const { SubMenu } = Menu;

const categories = [
  {
    label: "Category",
    key: "SubMenu",
    icon: <MenuOutlined />,
    children: [
      {
        label: "Thuê nhà",
        key: "setting:1",
        navigate: "/renting",
        // children: [
        //   {
        //     label: "Option 1",
        //     key: "setting:1",
        //   },
        //   {
        //     label: "Option 2",
        //     key: "setting:2",
        //   },
        // ],
      },
      {
        label: "Dịch vụ bên thứ ba",
        key: "setting:2",
        navigate: "/services",
        // children: [
        //   {
        //     label: "Option 3",
        //     key: "setting:3",
        //   },
        //   {
        //     label: "Option 4",
        //     key: "setting:4",
        //   },
        // ],
      },
    ],
  },
];

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    const item = categories[0].children.find((child) => child.key === e.key);
    if (item && item.navigate) {
      navigate(item.navigate);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedFullName = localStorage.getItem("fullName");
    setIsLoggedIn(!!token);
    setFullName(storedFullName || "");

    if (token && storedFullName) {
      setAvatarUrl(
        `https://api.dicebear.com/8.x/pixel-art/svg?seed=${encodeURIComponent(
          storedFullName
        )}`
      );
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("fullName");
    localStorage.clear();
    setIsLoggedIn(false);
    setFullName("");
    toast.info("Logged out", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="header"
      style={{
        backgroundColor: "#F9A825",
        padding: "0 50px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="logo">
        <img src="/logo.png" alt="UNINEST" style={{ height: "32px" }} />
      </div>

      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={categories}
        style={{
          backgroundColor: "#F9A825",
        }}
      />
      <Input size="large" prefix={<SearchOutlined />} style={{ width: 750 }} />

      <Space size="middle">
        <Button type="text" icon={<BellOutlined />} size="large" />
        <Button type="text" icon={<MessageOutlined />} size="large" />
        <Button type="text" icon={<FileOutlined />} size="large" />
      </Space>

      {isLoggedIn ? (
        <Dropdown overlay={userMenu} placement="bottomRight" size="large">
          <Space style={{ cursor: "pointer" }}>
            <Avatar src={avatarUrl} />
            <span>{fullName}</span>
            <DownOutlined />
          </Space>
        </Dropdown>
      ) : (
        <Space>
          <Button
            type="primary"
            icon={<UserOutlined />}
            onClick={() => navigate("/auth")}
          >
            Sign In / Sign Up
          </Button>
        </Space>
      )}

      <Button
        icon={<UploadOutlined />}
        type="primary"
        style={{ marginLeft: "16px" }}
        danger
        size="large"
      >
        Đăng tin
      </Button>
    </Header>
  );
};

export default AppHeader;
