import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Alert, Spin } from "antd";

const PropertyMap = ({ location }) => {
  const [mapError, setMapError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Convert address to coordinates (you might want to use geocoding service)
  const center = {
    lat: 21.0285, // Default coordinates for Hanoi
    lng: 105.8542,
  };

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const handleLoadError = () => {
    setMapError(true);
    setIsLoading(false);
  };

  const handleMapLoad = () => {
    setIsLoading(false);
  };

  if (mapError) {
    return (
      <Alert
        message="Không thể tải bản đồ"
        description={
          <div>
            <p>Có thể do trình chặn quảng cáo đang hoạt động. Vui lòng:</p>
            <ul>
              <li>Tắt trình chặn quảng cáo</li>
              <li>Làm mới trang</li>
              <li>Hoặc xem trực tiếp trên Google Maps</li>
            </ul>
          </div>
        }
        type="warning"
        showIcon
      />
    );
  }

  return (
    <div style={{ position: "relative", minHeight: "400px" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <Spin tip="Đang tải bản đồ..." />
        </div>
      )}
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        onError={handleLoadError}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={center}
          onLoad={handleMapLoad}
        >
          <Marker position={center} title="Property Location" />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default PropertyMap;
