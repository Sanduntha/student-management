import React, { useState } from "react"; // Import useState
import { Avatar, Box, Button, TextField, Typography, Card, CardContent, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function LoginPage() {

  const [page, setPage] = useState("login");

  const handleChange = (event, newPage) => {
    if (newPage !== null) {
      setPage(newPage);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="695px"
      sx={{
        backgroundImage: "url('../../../src/assets/desk.png')", // Ensure this path is correct
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card sx={{
        display: "flex", boxShadow: 3, borderRadius: 3, padding: 4,
        bgcolor: "rgba(255, 255, 255, 0.8)",
        width: 950,
        height: 600,
        marginLeft: -20,
      }}>
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          {/* Left Side - Image Section */}
          <Box flex={1} sx={{ marginRight: 5 }}>
            <Avatar
              src="../../../src/assets/desk.png" // Ensure this path is correct
              sx={{ width: "500px", height: "650px", borderRadius: 2, marginLeft: -5, marginBottom: -3, marginTop: -2 }}
            />
          </Box>

          {/* Right Side - Form Section */}
          <Box flex={1} display="flex" flexDirection="column" alignItems="center" sx={{ px: 4 }}>
            <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <ToggleButtonGroup
                value={page}
                exclusive
                onChange={handleChange}
                sx={{ mb: 2 }}
              >
                <ToggleButton
                  value="login"
                  sx={{
                    width: 100,
                    borderRadius: 20,
                    padding: 0,
                    bgcolor: page === "register" ? "rgba(242, 186, 29, 1)" : "transparent", // Orange background when on register page
                    color: page === "register" ? "black" : "rgba(242, 186, 29, 1)", // Black text when on register page, orange when inactive
                    fontSize: 18,
                    fontFamily: "Bebas Neue",
                    fontWeight: 400,
                    // bgcolor: "rgba(242, 186, 29, 1)",
                    // color: "black",
                  }}
                >
                  LOGIN
                </ToggleButton>

                <ToggleButton
                  value="register"
                  sx={{
                    width: 100,
                    borderRadius: 20,
                    bgcolor: page === "login" ? "rgba(242, 186, 29, 1)" : "transparent", // Orange background when on login page
                    color: page === "register" ? "black" : "rgba(242, 186, 29, 1)", // Black text when on register page, orange when inactive
                    padding: 0,
                    fontSize: 17,
                    fontFamily: "Bebas Neue",
                    fontWeight: 400,
                    // border: "2px solid rgba(242, 186, 29, 1)",
                      // bgcolor: "rgba(242, 186, 29, 1)",
                      color: "black",
                  }}
                >
                  REGISTER
                </ToggleButton>
              </ToggleButtonGroup>


            </Box>



            {page === "login" ? (
              <>
                <Typography
                  gutterBottom
                  sx={{
                    fontFamily: "Bebas Neue",
                    fontSize: 64,
                    fontWeight: 400,
                    marginLeft: -8,
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: "Bebas Neue",
                    fontSize: 24,
                    fontWeight: 400,
                    marginTop: -5,
                    marginBottom: 10,
                    marginLeft: -35,
                  }}
                >
                  ACPT Institute
                </Typography>
                <TextField label="Email" variant="outlined" sx={{ mb: 2, width: 398, marginLeft: -6, marginBottom: 6 }} />
                <TextField label="Password" variant="outlined" type="password" sx={{ mb: 2, width: 398, marginLeft: -6, marginBottom: 3 }} />
                <Button
                  variant="outlined"
                  sx={{
                    mb: 2,
                    marginTop: 6,
                    borderRadius: 8,
                    color: "black",
                    border: "2px solid rgba(242, 186, 29, 1)",
                    width: 150,
                    marginLeft: 25,
                  }}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <Typography
                  gutterBottom
                  sx={{
                    fontFamily: "Bebas Neue",
                    fontSize: 64,
                    fontWeight: 400,
                    marginLeft: -25,
                  }}
                >
                  Welcome
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: "Bebas Neue",
                    fontSize: 24,
                    fontWeight: 400,
                    marginTop: -5,
                    marginBottom: 4,
                    marginLeft: -35,
                  }}
                >
                  ACPT Institute
                </Typography>
                <TextField label="Name" variant="outlined" sx={{ mb: 2, width: 398, marginLeft: -6, marginBottom: 3 }} />
                <TextField label="Email" variant="outlined" sx={{ mb: 2, width: 398, marginLeft: -6, marginBottom: 3 }} />
                <TextField label="Password" variant="outlined" type="password" sx={{ mb: 2, width: 398, marginLeft: -6, marginBottom: 3 }} />
                <TextField label="Re-Enter Password" variant="outlined" type="password" sx={{ mb: 2, width: 398, marginLeft: -6, marginBottom: 1 }} />

                <Button
                  variant="outlined"
                  sx={{
                    mb: 2,
                    marginTop: 6,
                    borderRadius: 8,
                    color: "black",
                    border: "2px solid rgba(242, 186, 29, 1)",
                    width: 150,
                    marginLeft: 25,
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
