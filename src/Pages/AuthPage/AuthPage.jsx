import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import api from "../../config/axios";
import Uninest from "../../assets/Uninest.png";

// const customTheme = extendTheme({ defaultColorScheme: "dark" });

export default function AuthPage() {
  // 'signin', 'signup', or 'forgotpassword'
  const [authMode, setAuthMode] = React.useState("signin");
  const [showPassword, setShowPassword] = React.useState(false);

  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleAuthMode = (mode) => {
    setAuthMode(mode);
  };

  const CompanyLogoButton = () => (
    <IconButton sx={{ padding: 2, width: 64, height: 64 }}>
      <img
        src={Uninest}
        alt="Company Logo"
        style={{
          width: 64,
          height: 64,
          objectFit: "contain",
        }}
      />
    </IconButton>
  );

  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      switch (authMode) {
        case "signin": {
          try {
            console.log("Attempting login...");
            const loginResponse = await api.post("api/Auth/Login", {
              email: formData.get("email"),
              password: formData.get("password"),
            });
            console.log("Login response:", loginResponse);

            // Check if the login was successful and the token is present
            if (
              loginResponse.data.success &&
              loginResponse.data.result.accessToken
            ) {
              const token = loginResponse.data.result.accessToken;

              // Store the token in localStorage
              localStorage.setItem("token", token);

              // Fetch user details
              try {
                const userResponse = await api.get(
                  `api/User/by-email?email=${formData.get("email")}`
                );
                const userData = userResponse.data.data;

                // Store user data in localStorage
                localStorage.setItem("user", JSON.stringify(userData));
                console.log(userData);
                // Navigate to home page
                navigate("/");
              } catch (userError) {
                console.error("Error fetching user details:", userError);
                alert(
                  "Login successful, but failed to fetch user details. Please try again."
                );
              }
            } else {
              // Handle case where login was successful but no token was received
              alert(
                "Login successful, but no access token received. Please try again."
              );
            }
          } catch (error) {
            if (error.response && error.response.status === 401) {
              // Check the specific error message or code from the backend
              const errorMessage = error.response.data.message;
              if (
                errorMessage ===
                "Please verify your email. An OTP has been sent to your email."
              ) {
                setEmail(formData.get("email"));
                toggleAuthMode("verifyOTP");
              } else if (errorMessage === "Invalid password.") {
                alert("Invalid password. Please try again.");
              } else if (errorMessage === "Invalid email.") {
                alert("Invalid email. Please try again.");
              } else {
                // Handle other types of 401 errors
                alert("Authentication failed. Please try again.");
              }
            } else {
              // Handle other errors (server errors, network issues, etc.)
              console.error("Login error:", error);
              alert(
                error.response?.data?.message ||
                  "An error occurred during login. Please try again."
              );
            }
          }
          break;
        }

        case "signup": {
          const signupResponse = await api.post("api/Auth/Signup", {
            fullname: formData.get("fullName"),
            userName: formData.get("userName"),
            email: formData.get("email"),
            password: formData.get("password"),
            doB: formData.get("doB"),
            phone: formData.get("phone"),
            gender: formData.get("gender"),
            address: formData.get("address"),
          });
          if (signupResponse.data.status === "inactive") {
            setEmail(formData.get("email"));
            toggleAuthMode("verifyOTP");
          } else {
            toggleAuthMode("signin");
          }
          break;
        }

        case "forgotpassword": {
          await api.post("api/User/ForgotPassword", {
            email: formData.get("email"),
          });
          setEmail(formData.get("email"));
          toggleAuthMode("signin");
          break;
        }

        case "verifyOTP": {
          try {
            const otpResponse = await api.post("api/User/SubmitOTP", {
              email: email, // Use the email from state
              otp: formData.get("otp"),
            });

            if (otpResponse.data.success) {
              alert("Email verified successfully. You can now log in.");
              toggleAuthMode("signin");
            } else {
              alert("OTP verification failed. Please try again.");
            }
          } catch (error) {
            console.error("OTP verification error:", error);
            alert(
              "An error occurred during OTP verification. Please try again."
            );
          }
          break;
        }

        default:
          throw new Error("Invalid auth mode");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "An error occurred");
    }
  };
  const handleSendOTP = async () => {
    try {
      await api.post("api/Auth/ResendOTP", { email: email });
      alert("OTP sent successfully. Please check your email.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
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
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack sx={{ gap: 4, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                {(authMode === "forgotpassword" ||
                  authMode === "verifyOTP") && (
                  <IconButton
                    onClick={() => toggleAuthMode("signin")}
                    sx={{ alignSelf: "flex-start", mb: 1 }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                )}
                <Typography component="h1" level="h3">
                  {authMode === "signin"
                    ? "Sign in"
                    : authMode === "signup"
                    ? "Sign up"
                    : authMode === "forgotpassword"
                    ? "Forgot Password"
                    : authMode === "verifyOTP"
                    ? "Verify OTP"
                    : ""}
                </Typography>
                {authMode !== "forgotpassword" && authMode !== "verifyOTP" && (
                  <Typography level="body-sm">
                    {authMode === "signin"
                      ? "Don't have an account yet? "
                      : "Already have an account? "}
                    <Link
                      component="button"
                      level="title-sm"
                      onClick={() =>
                        toggleAuthMode(
                          authMode === "signin" ? "signup" : "signin"
                        )
                      }
                    >
                      {authMode === "signin" ? "Sign up!" : "Sign in!"}
                    </Link>
                  </Typography>
                )}
                {authMode === "forgotpassword" && (
                  <Typography level="body-sm">
                    Enter your email address and we'll send you a link to reset
                    your password.
                  </Typography>
                )}
                {authMode === "verifyOTP" && (
                  <Typography level="body-sm" sx={{ mb: 2 }}>
                    Enter the OTP sent to: {email}
                  </Typography>
                )}
              </Stack>
            </Stack>
            {authMode === "signin" && <Divider>or</Divider>}
            <Stack sx={{ gap: 4, mt: 2 }}>
              <form onSubmit={handleSubmit}>
                {authMode === "verifyOTP" && (
                  <FormControl required>
                    <FormLabel>Enter OTP</FormLabel>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Input type="text" name="otp" />
                      <Button onClick={handleSendOTP}>
                        {email ? "Resend OTP" : "Send OTP"}
                      </Button>
                    </Box>
                  </FormControl>
                )}

                {authMode === "signup" && (
                  <FormControl required>
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" name="fullName" />
                  </FormControl>
                )}
                {authMode === "signup" && (
                  <FormControl required>
                    <FormLabel>User Name</FormLabel>
                    <Input type="text" name="userName" />
                  </FormControl>
                )}

                {authMode !== "verifyOTP" && (
                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" />
                  </FormControl>
                )}

                {authMode !== "forgotpassword" && authMode !== "verifyOTP" && (
                  <FormControl required>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      endDecorator={
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      }
                    />
                  </FormControl>
                )}
                {authMode === "signup" && (
                  <FormControl required>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input type="date" name="doB" />
                  </FormControl>
                )}
                {authMode === "signup" && (
                  <FormControl required>
                    <FormLabel>Phone</FormLabel>
                    <Input type="text" name="phone" />
                  </FormControl>
                )}
                {authMode === "signup" && (
                  <FormControl required>
                    <FormLabel>Gender</FormLabel>
                    <Select defaultValue="gender" name="gender">
                      <Option value="male">Nam</Option>
                      <Option value="female">Nữ</Option>
                      <Option value="other">Khác</Option>
                    </Select>
                  </FormControl>
                )}
                {authMode === "signup" && (
                  <FormControl required>
                    <FormLabel>Address</FormLabel>
                    <Input type="text" name="address" />
                  </FormControl>
                )}
                <Stack sx={{ gap: 4, mt: 2 }}>
                  {authMode === "signin" && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        level="title-sm"
                        component="button"
                        onClick={() => toggleAuthMode("forgotpassword")}
                      >
                        Forgot your password?
                      </Link>
                    </Box>
                  )}

                  <Button type="submit" fullWidth>
                    {authMode === "signin"
                      ? "Sign in"
                      : authMode === "signup"
                      ? "Sign up"
                      : authMode === "forgotpassword"
                      ? "Reset Password"
                      : authMode === "verifyOTP"
                      ? "Verify OTP"
                      : "Confirm"}
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" sx={{ textAlign: "center" }}>
              © UNINEST {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={() => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://scontent.fsgn20-1.fna.fbcdn.net/v/t1.15752-9/460598464_534420082301265_6938301985852954232_n.png?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeG37PdF0oLrKQzcFnoE1ptvqbY7IRP2WlaptjshE_ZaVi3VGqdMSXszQV29VjqKKlF3bzi6mKGA0VvKwVnR4ZRM&_nc_ohc=mm0qeprZUxMQ7kNvgGX5iTV&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=AhhEhXd_XZ-VB48tNoTP19f&oh=03_Q7cD1QELVBYJq9nQMuFgkCCTsUBVMq7yuJxPfYrWu2ZuHXk9bQ&oe=6715B658)",
        })}
      />
    </CssVarsProvider>
  );
}
