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
export default function HomePage(){
    const CompanyLogoButton = () => (
        <IconButton sx={{ padding: 2, width: 64, height: 64 }}>
          <img
            src="https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-6/460535538_122105294522523904_2461728936276430116_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=sOcqU-oVd_gQ7kNvgE-YNu6&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=AiovkpM2EY65PFsglqEFYdO&oh=00_AYAWBfXjRqpBiDpTpEx49F5L4bxesCZ7aSSWsSkj__ZP-g&oe=66F2EF86"
            alt="Company Logo"
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
                          "--Form-maxWidth": "800px",
                          "--Transition-duration": "0.4s",
                        },
                      }}
                />
                <Box
                    sx={(theme) => ({
                    width: { xs: "100%", md: "50vw" },
                    transition: "width var(--Transition-duration)",
                    transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    backdropFilter: "blur(12px)",
                    backgroundColor: "rgba(255 255 255 / 0.2)",
                    [theme.getColorSchemeSelector("dark")]: {
                        backgroundColor: "rgba(19 19 24 / 0.4)",
                    },
                    })}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "100dvh",
                            width: "100%",
                            px: 2,
                        }}
                        >
                            <Box
                                component="header"
                                sx={{ py: 3, display: "flex", justifyContent: "space-between" }}
                            >
                                <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
                                {/* <CompanyLogoButton /> */}
                                    <Button
                                        variant="plain"
                                        startDecorator={<CompanyLogoButton />}
                                        size="lg"
                                        color="neutral"
                                        onClick={handleHomeClick}
                                    >
                                        UNINEST
                                    </Button>
                                </Box>
                            </Box>
                    </Box>
                </Box>
            </CssBaseline>
        </CssVarsProvider>
      );
}