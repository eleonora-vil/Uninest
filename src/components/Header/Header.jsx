import { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Button,
  Input,
  Space,
  Badge,
  Modal,
  message,
} from "antd";
import {
  BellOutlined,
  MessageOutlined,
  DownOutlined,
  SearchOutlined,
  MenuOutlined,
  UploadOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import IconButton from "@mui/joy/IconButton";
import Uninest from "../../assets/Uninest.png";
import api from "../../config/axios";
import TopUpForm from "../../Pages/UserProfile/TopUpForm"; // Assuming you have this component

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
      },
      {
        label: "Dịch vụ bên thứ ba",
        key: "setting:2",
        navigate: "/services",
      },
    ],
  },
];

const AppHeader = () => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [current, setCurrent] = useState("mail");
  const [userRole, setUserRole] = useState(""); // New state for user role
  const [userData, setUserData] = useState(null);
  const [userWallet, setUserWallet] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTopUpModalVisible, setIsTopUpModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requiredAmount, setRequiredAmount] = useState(0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const showSubscribeModal = () => {
    setIsModalVisible(true);
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/User/register-membership", {
        autoRenew: true,
      });

      if (response.data && response.data.success) {
        // Update the local user data
        setUserData((prevData) => ({
          ...prevData,
          ...response.data.result,
          isActiveMember: true,
          isMember: true,
        }));

        message.success("Successfully subscribed to membership!");
        setIsModalVisible(false);
      } else {
        throw new Error(response.data.errorMessage || "Failed to subscribe");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.errorMessage;
        if (
          errorMessage &&
          errorMessage.includes("Insufficient funds in wallet")
        ) {
          const match = errorMessage.match(
            /Required: (\d+), Available: (\d+(\.\d+)?)/
          );
          if (match) {
            const required = parseFloat(match[1]);
            const available = parseFloat(match[2]);
            const needed = required - available;
            setRequiredAmount(needed);
            Modal.confirm({
              title: "Insufficient Funds",
              content: `You need ${formatCurrency(
                needed
              )} more in your wallet to subscribe. Would you like to top up your account?`,
              onOk() {
                setIsTopUpModalVisible(true);
              },
            });
          } else {
            message.error(
              "Insufficient funds in wallet. Please top up your account."
            );
          }
        } else {
          message.error(errorMessage || "An error occurred. Please try again.");
        }
      } else {
        message.error("An error occurred. Please try again.");
      }
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopUpCancel = () => {
    setIsTopUpModalVisible(false);
  };

  const handleTopUpSuccess = (successMessage) => {
    setIsTopUpModalVisible(false);
    message.success(successMessage);
    // Optionally refresh user data here
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

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
    const storedUserData = localStorage.getItem("user");
    setIsLoggedIn(!!token);

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      setFullName(parsedUserData.fullName || "");
      setUserRole(parsedUserData.roleID.toString()); // Convert to string to match your condition
      setUserWallet(parsedUserData.wallet);

      // Check if the user has an avatarUrl
      if (parsedUserData.avatarUrl) {
        setAvatarUrl(parsedUserData.avatarUrl);
      } else if (parsedUserData.fullName) {
        // If no avatarUrl, generate one based on the fullName
        setAvatarUrl(
          `https://api.dicebear.com/8.x/pixel-art/svg?seed=${encodeURIComponent(
            parsedUserData.fullName
          )}`
        );
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserData(null);
    setFullName("");
    setUserRole("");
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
  };

  const userMenu = (
    <Menu>
      {userData && userData.roleID === 1 && (
        <Menu.Item key="dashboard" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Menu.Item>
      )}

      <Menu.Item key="profile" onClick={() => navigate("/manageProps")}>
        Manage Properties
      </Menu.Item>

      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>

      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const fetchLatestUserData = async () => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem("user"));
      if (!storedUserData || !storedUserData.email) {
        console.error("No user email found in localStorage");
        return;
      }

      const response = await api.get(
        `api/User/by-email?email=${encodeURIComponent(storedUserData.email)}`
      );

      if (response.data.success) {
        const latestUserData = response.data.data;

        // Update state
        setUserData(latestUserData);
        setFullName(latestUserData.fullName || "");
        setUserRole(latestUserData.roleID.toString());
        setUserWallet(latestUserData.wallet);
        setAvatarUrl(
          latestUserData.avatarUrl ||
            `https://api.dicebear.com/8.x/pixel-art/svg?seed=${encodeURIComponent(
              latestUserData.fullName
            )}`
        );

        // Update localStorage
        localStorage.setItem("user", JSON.stringify(latestUserData));

        console.log("User data updated successfully");
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching latest user data:", error);
      // Optionally, show an error message to the user
    }
  };

  const handleHomeClick = () => {
    fetchLatestUserData();
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
        position: "sticky",
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
        <Button type="text" icon={<WalletOutlined />} size="large" />
      </Space>

      {userData ? (
        <Dropdown overlay={userMenu} placement="bottomRight" size="large">
          <Space style={{ cursor: "pointer" }}>
            <Avatar src={avatarUrl} />
            <span>{userData.fullName}</span>
            {userData.isActiveMember ? (
              <Badge
                status="success"
                text="Member"
                style={{ fontSize: "12px" }}
              />
            ) : (
              <Button type="link" size="small" onClick={showSubscribeModal}>
                Subscribe
              </Button>
            )}
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
      <Modal
        title="Subscribe to Membership"
        visible={isModalVisible}
        onOk={handleSubscribe}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={isLoading}
      >
        <p>Would you like to subscribe to our membership program?</p>
        <p>
          The membership fee will be deducted from your wallet. The amount will
          be 200.000đ
        </p>
        <p>Auto-renewal will be enabled by default.</p>
        <p>Membership will last 3 months</p>
      </Modal>

      <TopUpForm
        visible={isTopUpModalVisible}
        onSuccess={handleTopUpSuccess}
        onClose={handleTopUpCancel}
        initialAmount={requiredAmount}
      />
    </Header>
  );
};

export default AppHeader;
