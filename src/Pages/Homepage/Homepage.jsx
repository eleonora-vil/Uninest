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
export default function HomePage() {
  const navigate = useNavigate();
  const [cardData, setCardData] = React.useState([]); // Store house data
  const [loading, setLoading] = React.useState(true); // Handle loading state
  const [error, setError] = React.useState(null); // Handle errors

  const handleHomeListingClick = () => {
    navigate("/listing");
  };
  const handleServiceListintClick = () => {
    navigate("/services");
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

  const PropertyCard = ({ item }) => {
    return (
      <Card
        sx={{
          minWidth: 300, // Fixed width for consistency
          maxWidth: 300,
          borderRadius: 3,
          transition: "transform 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={
            item.homeImages?.[0]?.image?.imageUrl ||
            "/path/to/default/image.jpg"
          }
          alt={item.name}
          sx={{
            objectFit: "cover",
            borderRadius: "12px 12px 0 0",
          }}
        />
        <CardContent sx={{ p: 2 }}>
          <Typography
            level="h2"
            sx={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            <TruncatedText text={item.name} maxLength="30" />
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              level="body2"
              sx={{
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              🛏️ {item.bedrooms} PN • 🚿 {item.bathroom} VS
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            <AttachMoneyIcon sx={{ fontSize: 20, mr: 0.5 }} />
            <Typography level="h4" sx={{ color: "red" }}>
              {item.price}/Tháng
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Update the renderCards function
  const renderCards = (data) => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 2, // Add padding bottom for scroll bar
          "::-webkit-scrollbar": {
            height: 8,
          },
          "::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: 4,
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "#555",
            },
          },
        }}
      >
        {data.map((item) => (
          <Link
            key={item.homeId}
            to={`/property/${item.homeId}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
            }}
          >
            <PropertyCard item={item} />
          </Link>
        ))}
      </Box>
    );
  };

  // Update the scrollable sections
  const ScrollableSection = ({ title, data }) => {
    return (
      <Box
        sx={{
          width: { xs: "90%", sm: "80%", md: "60%", lg: "45%" },
          bgcolor: "#fff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "#343131",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
          <Link
            to="/listing"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            Xem thêm
            <span style={{ marginLeft: "4px" }}>&gt;</span>
          </Link>
        </Box>
        {renderCards(data)}
      </Box>
    );
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
                  onClick={handleHomeListingClick}
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
                    onClick={handleServiceListintClick}
                  >
                    Dọn nhà
                  </Button>
                  <Button
                    variant="plain"
                    startDecorator={<MovingLogoButton />}
                    size="lg"
                    color="neutral"
                    onClick={handleServiceListintClick}
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
                mt: "15vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                p: 4,
              }}
            >
              <ScrollableSection
                title="Cho thuê trong khu vực của bạn"
                data={cardData}
              />
              <ScrollableSection title="Cho thuê" data={cardData} />
            </Box>
          </Box>
        </Box>
      </Box>
      <FooterComponent />
    </CssVarsProvider>
  );
}
