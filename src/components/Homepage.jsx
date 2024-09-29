import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import AppHeader from "./Header/Header";
import FooterComponent from "./Footer/Footer";

export default function HomePage() {
  const navigate = useNavigate();

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

  const handleHomeClick = () => {
    navigate("/");
  };

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
          }}
        >
          <Box
            sx={{
              height: "70vh",
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

          <Box
            sx={{
              mt: "20vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              p: 4,
            }}
          >
            <Box
              sx={{
                width: { xs: "90%", sm: "80%", md: "60%", lg: "45%" },
                height: "350px",
                bgcolor: "#fff",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                p: 3,
              }}
            >
              {/* Content for the second box */}
              <Typography variant="h6">Additional Information Box 1</Typography>
              <Typography>
                This box can contain more information or features.
              </Typography>
            </Box>

            <Box
              sx={{
                width: { xs: "90%", sm: "80%", md: "60%", lg: "45%" },
                height: "350px",
                bgcolor: "#fff",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                p: 3,
              }}
            >
              {/* Content for the third box */}
              <Typography variant="h6">Additional Information Box 2</Typography>
              <Typography>
                This box can contain even more information or features.
              </Typography>
            </Box>
          </Box>
        </Box>
        <FooterComponent />
      </Box>
    </CssVarsProvider>
  );
}
