import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import { useNavigate } from "react-router-dom";
// import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
// import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function HomePage() {
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
      <CssBaseline>
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
            backgroundColor: "grey", // This sets the background color to grey
            height: "100%", // This ensures the grey background covers the full viewport height
          }}
        >
          <Box
            sx={() => ({
              height: "50%",
              width: "100%",
              position: "fixed",
              right: 0,
              top: 0,
              bottom: 0,
              transition:
                "background-image var(--Transition-duration), left var(--Transition-duration) !important",
              transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
              backgroundColor: "background.level1",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundImage:
                "url(https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            })}
          >
            {/* Centered text */}
            <Box
              sx={{
                position: "absolute",
                top: "35%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontSize: "60px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h2"
                component="div"
                sx={{ fontSize: "70%", color: "#fff" }}
              >
                Cùng tìm kiếm một căn trọ hoàn hảo cho bạn với UNINEST
              </Typography>
            </Box>

            {/* White box split into two sections */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                bottom: "5%",
                transform: "translateX(-50%)",
                width: "45%", // Adjust the width of the white box
                height: "35%",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                display: "flex", // Flexbox for splitting into two parts
                alignItems: "center",
                justifyContent: "space-between", // Evenly space between sections
                padding: "20px", // Padding inside the box
              }}
            >
              {/* Left Section: Single Icon with Text */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "space-evenly",
                  width: "35%", // Adjust width for the left section
                }}
              >
                <Typography
                  sx={{
                    fontSize: "90%",
                    color: "#343131",
                    marginBottom: 2,
                    textAlign: "left",
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

              {/* Right Section: Two Icons with Text */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "50%", // Adjust width for the right section
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "90%",
                    color: "#343131",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Dịch vụ bên thứ ba
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="plain"
                      startDecorator={<CleaningLogoButton />} // Replace with your actual icon or logo
                      size="lg"
                      color="neutral"
                      onClick={handleHomeClick}
                    >
                      Dọn nhà
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="plain"
                      startDecorator={<MovingLogoButton />} // Replace with your actual icon or logo
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
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: "5%",
              transform: "translateX(-50%)",
              width: "45%", // Adjust the width of the white box
              height: "35%",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex", // Flexbox for splitting into two parts
              alignItems: "center",
              justifyContent: "space-between", // Evenly space between sections
              padding: "20px", // Padding inside the box
            }}
          ></Box>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: "5%",
              transform: "translateX(-50%)",
              width: "45%", // Adjust the width of the white box
              height: "35%",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex", // Flexbox for splitting into two parts
              alignItems: "center",
              justifyContent: "space-between", // Evenly space between sections
              padding: "20px", // Padding inside the box
            }}
          ></Box>
        </Box>
      </CssBaseline>
    </CssVarsProvider>
  );
}
