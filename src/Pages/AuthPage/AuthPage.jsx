// MainLoginPage.js
import React, { useState } from "react";
import { Box, Card, CardContent, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const MainLoginPage = () => {
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
        backgroundImage: "url('../../../src/assets/desk.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card sx={{ display: "flex", boxShadow: 3, borderRadius: 3, padding: 4, bgcolor: "rgba(255, 255, 255, 0.8)", width: 950, height: 600 }}>
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          {/* Left Side - Image Section */}
          <Box flex={1} sx={{ marginRight: 5 }}>
            <img src="../../../src/assets/desk.png" alt="Desk" style={{ width: "500px", height: "650px", borderRadius: "10px" }} />
          </Box>

          {/* Right Side - Form Section */}
          <Box flex={1} display="flex" flexDirection="column" alignItems="center" sx={{ px: 4 }}>
            <ToggleButtonGroup
              value={page}
              exclusive
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <ToggleButton value="login" sx={{ width: 100, borderRadius: 20, fontSize: 18 }}>
                LOGIN
              </ToggleButton>
              <ToggleButton value="register" sx={{ width: 100, borderRadius: 20, fontSize: 18 }}>
                REGISTER
              </ToggleButton>
            </ToggleButtonGroup>

            {page === "login" ? <LoginPage /> : <RegisterPage />}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MainLoginPage;
