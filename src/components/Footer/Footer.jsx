// FooterComponent.jsx
import React from "react";
import { Layout, Row, Col, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import "./FooterComponent.css"; // We'll use this for custom styling.
import bocongthuong from "../../assets/bocongthuong.png";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="footer">
      <Row justify="space-between" align="middle">
        <Col xs={14} md={6} className="footer-logo-qrcode">
          <img
            src="https://picsum.photos/140"
            alt="Logo"
            className="logo"
            style={{ marginRight: "10px" }}
          />
          <img
            src="https://picsum.photos/140"
            alt="QR Code"
            className="qrcode"
          />
        </Col>

        <Col xs={14} md={4}>
          <h3>HƯỚNG DẪN</h3>
          <ul className="footer-links">
            <li>
              <a href="/about-us" target="_blank" rel="noopener noreferrer">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a
                href="/pricing-support"
                target="_blank"
                rel="noopener noreferrer"
              >
                Báo giá & hỗ trợ
              </a>
            </li>
            <li>
              <a href="/faq" target="_blank" rel="noopener noreferrer">
                Câu hỏi thường gặp
              </a>
            </li>
            <li>
              <a href="/report-bugs" target="_blank" rel="noopener noreferrer">
                Góp ý báo lỗi
              </a>
            </li>
          </ul>
        </Col>

        <Col xs={14} md={5}>
          <h3>QUY ĐỊNH</h3>
          <ul className="footer-links">
            <li>
              <a
                href="/posting-rules"
                target="_blank"
                rel="noopener noreferrer"
              >
                Quy định đăng tin
              </a>
            </li>
            <li>
              <a
                href="/terms-agreement"
                target="_blank"
                rel="noopener noreferrer"
              >
                Điều khoản thỏa thuận
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a
                href="/complaint-resolution"
                target="_blank"
                rel="noopener noreferrer"
              >
                Giải quyết khiếu nại
              </a>
            </li>
          </ul>
        </Col>

        <Col
          xs={14}
          md={6}
          className="footer-contact"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          <span>Chăm sóc khách hàng</span>
          <br />
          <MailOutlined
            style={{ fontSize: "14px", marginRight: "10px", marginTop: "10px" }}
            size="lagre"
          />
          <span>trogiup@uninest.com.vn</span>
          <br />
          <br />
          <span>Hotline</span>
          <br />
          <PhoneOutlined
            style={{ fontSize: "14px", marginRight: "10px", marginTop: "10px" }}
            size="large"
          />
          <span>1900 1886</span>
        </Col>

        <Col xs={14} md={6} className="footer-contact">
          <h3>CHỨNG NHẬN</h3>
          <img
            src={bocongthuong}
            alt="Chứng nhận"
            style={{ marginLeft: "0px", width: "150px" }} // Adjust the image width as necessary
          />
        </Col>
        <Col xs={14} md={6} className="footer-social">
          <h3>LIÊN KẾT</h3>

          <Button
            type="link"
            shape="circle"
            icon={<FacebookOutlined style={{ fontSize: "30px" }} />}
            href="https://www.facebook.com/uninest.findyourhome"
            target="_blank"
            style={{ marginRight: "15px" }}
          />

          <Button
            type="link"
            shape="circle"
            icon={<InstagramOutlined style={{ fontSize: "30px" }} />}
            href="https://www.instagram.com/uninest.inspirated?igsh=MXdiajBkb2kwanAzeg=="
            target="_blank"
            style={{ marginRight: "15px" }}
          />

          {/* <Button
            type="link"
            shape="circle"
            href="https://zalo.me"
            target="_blank"
            style={{
              padding: 0,
              width: "34px",
              height: "34px",
              borderRadius: "50%",
            }} // adjust size as needed
          >
            <img
              src="https://cdn.haitrieu.com/wp-content/uploads/1422/01/Logo-Zalo-Arc.png"
              alt="Zalo"
              style={{ width: "14px" }}
            />
          </Button> */}
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
