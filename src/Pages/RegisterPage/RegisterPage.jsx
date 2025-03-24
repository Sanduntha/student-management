import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

export default function RegisterPage() {
  return (
    <Box display="flex" height="450px" marginTop="120px" marginLeft="50px">
      <Box
        flex={1}
        sx={{
          marginLeft: 40
        }}
      >
        <Avatar
          src="../../../src/assets/desk.png"
          sx={{ width: "450px", height: "500px", borderRadius: 0 }}
        />
      </Box>

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ px: 4 }}
      >
        <Typography gutterBottom sx={{
          marginRight: 75,
          fontFamily: 'Bebas Neue',
          fontSize: 64,
          fontWeight: 400,
        }}>
          Welcome Reg
        </Typography>
        <Typography variant="h6" gutterBottom sx={{
          marginRight: 103,
          fontFamily: 'Bebas Neue',
          fontSize: 24,
          fontWeight: 400,
          marginTop: -5,
          marginBottom: 10,
        }}>
          ACPT Institute
        </Typography>

        <TextField label="Email" variant="outlined" sx={{ mb: 2, marginRight: 75, width: 398, marginBottom: 6, }} />
        <TextField

          label="Password"
          variant="outlined"
          type="password"
          sx={{ mb: 2, marginRight: 75, width: 398 }}
        />
        <Button
          variant="contained"
          sx={{
            mb: 2,
            marginRight: 43,
            marginTop: 5,
            borderRadius: 8,
            bgcolor: "white",
            color: "black",
            border: "2px solid rgba(242, 186, 29, 1)",
            width: 150,
          }}
        >
          Login
        </Button>

      </Box>
    </Box>
  );
}
