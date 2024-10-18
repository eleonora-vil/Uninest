import { useState, useEffect, useCallback } from "react";
import { usePayOS } from "payos-checkout";
import api from "../../config/axios";
import { Button, Modal, Typography, Space, InputNumber, message } from "antd";

const { Title } = Typography;

const TopUpForm = ({ visible, onSuccess, onClose, initialAmount = 0 }) => {
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(initialAmount.toString());
  const [payOSConfig, setPayOSConfig] = useState({
    RETURN_URL: window.location.origin,
    ELEMENT_ID: "embedded-payment-container",
    CHECKOUT_URL: null,
    embedded: true,
    onSuccess: (event) => {
      onSuccess("Nạp tiền thành công");
    },
  });

  // pass money needed for use something
  useEffect(() => {
    setAmount(initialAmount.toString());
  }, [initialAmount]);

  const { open, exit } = usePayOS(payOSConfig);

  const resetForm = useCallback(() => {
    setAmount("");
    setIsCreatingLink(false);
    setPayOSConfig((prevConfig) => ({
      ...prevConfig,
      CHECKOUT_URL: null,
    }));
    exit();
  }, [exit]);

  useEffect(() => {
    if (visible && !isModalOpen) {
      setIsModalOpen(true);
    } else if (!visible && isModalOpen) {
      setIsModalOpen(false);
      resetForm();
      const container = document.getElementById("embedded-payment-container");
      if (container) {
        container.innerHTML = "";
      }
    }
  }, [visible, isModalOpen, resetForm]);

  const checkOrderStatus = async (orderCode) => {
    try {
      const response = await api.post(
        "/api/Payment/CheckOrderAndUpdateWallet",
        orderCode
      );

      if (
        response.data.error === 0 &&
        response.data.data.paymentInfo.Status === "PAID"
      ) {
        onSuccess("Nạp tiền thành công");
        return true; // Indicate successful payment
      }
      return false; // Payment not completed yet
    } catch (error) {
      console.error("Error checking order status:", error);
      return false;
    }
  };

  const handleGetPaymentLink = async () => {
    setIsCreatingLink(true);
    exit();
    try {
      const response = await api.post("/api/Payment/CreatePayOSLink", {
        productName: "wallet",
        description: "nap vi",
        returnUrl: window.location.origin,
        cancelUrl: window.location.origin,
        price: parseInt(amount),
        buyerName: "",
      });

      if (response.data.error === 0) {
        setPayOSConfig((oldConfig) => ({
          ...oldConfig,
          CHECKOUT_URL: response.data.data.paymentInfo.checkoutUrl,
        }));

        const orderCode = response.data.data.paymentInfo.orderCode;

        // Start checking order status
        const checkInterval = setInterval(async () => {
          const isPaid = await checkOrderStatus(orderCode);
          if (isPaid) {
            clearInterval(checkInterval);
          }
        }, 5000);

        // Set a timeout to stop checking after 5 minutes
        setTimeout(() => {
          clearInterval(checkInterval);
        }, 5 * 60 * 1000);
      } else {
        throw new Error(
          response.data.message || "Failed to create payment link"
        );
      }
    } catch (error) {
      console.error("Error creating payment link:", error);
      message.error("Lỗi khi tạo liên kết thanh toán");
    } finally {
      setIsCreatingLink(false);
    }
  };

  useEffect(() => {
    if (payOSConfig.CHECKOUT_URL != null) {
      open();
    }
  }, [payOSConfig, open]);

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Nạp tiền vào ví"
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <InputNumber
          style={{ width: "100%" }}
          value={amount}
          onChange={(value) => setAmount(value)}
          placeholder="Nhập số tiền"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          min={0}
        />
        <Space>
          {isCreatingLink ? (
            <Button type="primary" loading>
              Đang tạo liên kết thanh toán...
            </Button>
          ) : (
            <Button
              block
              type="primary"
              onClick={handleGetPaymentLink}
              disabled={!amount}
            >
              Xác nhận nạp tiền
            </Button>
          )}
          <Button onClick={handleCancel}>Hủy</Button>
        </Space>
      </Space>
      {payOSConfig.CHECKOUT_URL && (
        <div
          id="embedded-payment-container"
          style={{ height: "400px", marginTop: "20px" }}
        ></div>
      )}
    </Modal>
  );
};

export default TopUpForm;
