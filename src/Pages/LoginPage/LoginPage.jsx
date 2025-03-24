import { Avatar, Box, Button, TextField, Typography, Card, CardContent, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function LoginPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="700px"
      sx={{
        backgroundImage: "url('../../../src/assets/desk.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card sx={{ display: "flex", boxShadow: 3, borderRadius: 3, padding: 3, bgcolor: "rgba(255, 255, 255, 0.8)" }}>
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          {/* Left Side - Image Section */}
          <Box flex={1} sx={{ marginRight: 5 }}>
            <Avatar
              src="../../../src/assets/desk.png"
              sx={{ width: "450px", height: "550px", borderRadius: 2 }}
            />
          </Box>

          {/* Right Side - Form Section */}
          <Box flex={1} display="flex" flexDirection="column" alignItems="center" sx={{ px: 4 }}>
            <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <ToggleButtonGroup sx={{ mb: 2 }}>
                <ToggleButton
                  value="login"
                  sx={{
                    width: 100,
                    borderRadius: 20,
                    bgcolor: "rgba(242, 186, 29, 1)",
                    color: "black",
                    padding: 0,
                    fontSize: 18,
                    fontFamily: "Bebas Neue",
                    fontWeight: 400,
                  }}
                >
                  LOGIN
                </ToggleButton>

                <ToggleButton
                  value="register"
                  sx={{
                    width: 100,
                    borderRadius: 20,
                    border: "2px solid rgba(242, 186, 29, 1)",
                    color: "black",
                    padding: 0,
                    fontSize: 17,
                    fontFamily: "Bebas Neue",
                    fontWeight: 400,
                  }}
                >
                  REGISTER
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
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

            <TextField label="Email" variant="outlined" sx={{ mb: 2, width: 398, marginLeft: -6, marginBottom: 10 }} />
            <TextField label="Password" variant="outlined" type="password" sx={{ mb: 2, width: 398, marginLeft: -6 }} />
            <Button
              variant="contained"
              sx={{
                mb: 2,
                marginTop: 6,
                borderRadius: 8,
                bgcolor: "white",
                color: "black",
                border: "2px solid rgba(242, 186, 29, 1)",
                width: 150,
                marginLeft: 25,
              }}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
