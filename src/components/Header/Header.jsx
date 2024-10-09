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
import IconButton from "@mui/joy/IconButton";
import Uninest from "../../assets/Uninest.png";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";

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
        navigate: "/listing",
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
  const [userRole, setUserRole] = useState(""); // New state for user role

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
    const storedUserData = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    setFullName(storedFullName || "");

    if (token && storedFullName) {
      setAvatarUrl(
        `https://api.dicebear.com/8.x/pixel-art/svg?seed=${encodeURIComponent(
          storedFullName
        )}`
      );
    }

    // Check user role
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserRole(userData.roleId || "");
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
      {userRole === "1" && (
        <Menu.Item key="dashboard" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Menu.Item>
      )}
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const handleHomeClick = () => {
    navigate("/");
  };

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
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        height: 64, // Specify a fixed height
      }}
    >
      <IconButton sx={{ padding: 2, width: 64, height: 64 }}>
        <img
          src={Uninest}
          alt="Company Logo"
          style={{
            width: 64,
            height: 64,
            objectFit: "contain",
          }}
          onClick={handleHomeClick}
        />
      </IconButton>

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
            type="text"
            icon={<UserOutlined />}
            onClick={() => navigate("/auth")}
            size="large"
          >
            Đăng nhập / Đăng kí
          </Button>
        </Space>
      )}

      <Button
        icon={<UploadOutlined />}
        type="primary"
        style={{ marginLeft: "16px" }}
        danger
        size="large"
        onClick={() => navigate("/posting")}
      >
        Đăng tin
      </Button>
    </Header>
  );
};

export default AppHeader;
