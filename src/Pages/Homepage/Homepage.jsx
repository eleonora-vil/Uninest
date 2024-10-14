import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { CardMedia } from "@mui/material";
// import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Time Icon
// import LocationOnIcon from "@mui/icons-material/LocationOn"; // Location Icon
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import TruncatedText from "../../utils/TruncatedText";
import { decorate } from "react-toastify/addons/use-notification-center";
export default function HomePage() {
  const navigate = useNavigate();
  const [cardData, setCardData] = React.useState([]); // Store house data
  const [loading, setLoading] = React.useState(true); // Handle loading state
  const [error, setError] = React.useState(null); // Handle errors

  const handleHomeClick = () => {
    navigate("/listing");
  };

  React.useEffect(() => {
    // Fetch data from API when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("api/Home/GetAll"); // Adjust endpoint
        setCardData(response.data); // Store the data
      } catch (error) {
        setError(error.message); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  const RentingLogoButton = () => (
    <IconButton sx={{ padding: 2, width: 64, height: 64 }}>
      <img
        src="https://cdn-icons-png.flaticon.com/128/4820/4820436.png"
        alt="Renting Logo"
        style={{
          width: 64,
          height: 64,
          objectFit: "contain",
          justifyContent: "left",
        }}
      />
    </IconButton>
  );

  const CleaningLogoButton = () => (
    <IconButton sx={{ padding: 2, width: 64, height: 64 }}>
      <img
        src="https://cdn-icons-png.flaticon.com/128/4673/4673099.png"
        alt="Cleaning Logo"
        style={{
          width: 64,
          height: 64,
          objectFit: "contain",
        }}
      />
    </IconButton>
  );

  const MovingLogoButton = () => (
    <IconButton sx={{ padding: 2, width: 64, height: 64 }}>
      <img
        src="https://cdn-icons-png.flaticon.com/128/15288/15288881.png"
        alt="Moving Logo"
        style={{
          width: 64,
          height: 64,
          objectFit: "contain",
        }}
      />
    </IconButton>
  );

  const renderCards = (data) => {
    return data.map((item) => (
      <Link
        key={item.homeId}
        to={`/property/${item.homeId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card
          sx={{
            minWidth: 200,
            marginRight: 2,
            borderRadius: 5,
            height: "wrap-content",
          }}
        >
          {item.homeImages && item.homeImages.length > 0 ? (
            <CardMedia
              component="img"
              height="200"
              image={item.homeImages[0].image?.imageUrl}
              alt={item.name}
            />
          ) : (
            <CardMedia
              component="img"
              height="200"
              image="/path/to/default/image.jpg"
              alt="No image available"
            />
          )}
          <CardContent>
            <Typography variant="h2">
              <TruncatedText text={item.name} maxLength="30" />
            </Typography>
            <Typography variant="h10">
              {item.bedrooms} PN - {item.bathroom} NVS
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <AttachMoneyIcon sx={{ color: "red", fontSize: 20, mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {item.price}.000đ/Tháng
              </Typography>
            </Box>
            {/* Removed postTime and postPlace as they're not in the API response */}
            {/* <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <AccessTimeIcon sx={{ color: "gray", fontSize: 20, mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {item.postTime}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <LocationOnIcon sx={{ color: "gray", fontSize: 20, mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {item.postPlace}
          </Typography>
        </Box> */}
          </CardContent>
        </Card>
      </Link>
    ));
  };

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>Error: {error}</p>; // Display error message

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "100%",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <AppHeader />
        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.level1",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "60vh",
              position: "relative",
              backgroundImage:
                "url(https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              component="div"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                color: "#fff",
                textAlign: "center",
                mb: 4,
                width: "50%",
              }}
            >
              Cùng tìm kiếm một căn trọ hoàn hảo cho bạn với UNINEST
            </Typography>

            <Box
              sx={{
                width: { xs: "90%", sm: "80%", md: "60%", lg: "45%" },
                bgcolor: "#fff",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                p: 3,
                position: "absolute",
                bottom: "-15%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: { xs: "100%", sm: "35%" },
                  mb: { xs: 2, sm: 0 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "#343131",
                    mb: 2,
                    fontWeight: "bold",
                  }}
                >
                  Tìm phòng trọ
                </Typography>
                <Button
                  variant="plain"
                  startDecorator={<RentingLogoButton />}
                  size="lg"
                  color="neutral"
                  onClick={handleHomeClick}
                >
                  Cho thuê
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", sm: "60%" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "#343131",
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  Dịch vụ bên thứ ba
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <Button
                    variant="plain"
                    startDecorator={<CleaningLogoButton />}
                    size="lg"
                    color="neutral"
                    onClick={handleHomeClick}
                  >
                    Dọn nhà
                  </Button>
                  <Button
                    variant="plain"
                    startDecorator={<MovingLogoButton />}
                    size="lg"
                    color="neutral"
                    onClick={handleHomeClick}
                  >
                    Chuyển nhà
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Existing Main Content */}
          <Box
            sx={{
              mt: "15vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              p: 4,
            }}
          >
            {/* First Box with Scrollable Cards */}
            <Box
              sx={{
                width: { xs: "90%", sm: "80%", md: "60%", lg: "45%" },
                height: "100%",
                bgcolor: "#fff",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                p: 3,
                display: "block",

                overflowX: "auto",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "#343131",
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  Cho thuê trong khu vực của bạn
                </Typography>
                <Link
                  underline="none"
                  to={`/listing`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: "bold",
                  }}
                >
                  Xem thêm <span style={{ marginLeft: "4px" }}>&gt;</span>
                </Link>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                }}
              >
                {renderCards(cardData)}
              </Box>
            </Box>

            {/* Second Box with Scrollable Cards */}
            <Box
              sx={{
                width: { xs: "90%", sm: "80%", md: "60%", lg: "45%" },
                height: "100%",
                bgcolor: "#fff",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                p: 3,
                display: "block",

                overflowX: "auto",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "#343131",
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  Cho thuê
                </Typography>
                <Link
                  href="http://localhost:5173/listing" // Replace with your desired URL
                  underline="none"
                  to={`/listing`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: "bold",
                  }}
                >
                  Xem thêm <span style={{ marginLeft: "4px" }}>&gt;</span>
                </Link>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                }}
              >
                {renderCards(cardData)}
              </Box>
            </Box>
          </Box>
        </Box>
        <FooterComponent />
      </Box>
    </CssVarsProvider>
  );
}
