import React, { useState } from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ima from '../../assets/desk.png';

const AuthPage = () => {
  const [page, setPage] = useState("login");

  const handleChange = (event, newPage) => {
    if (newPage !== null) {
      setPage(newPage);
    }
  };

  return (

    <div className="img"
    style={{
        // backgroundImage:`url(${ima})`
    }}
    >

<div className="card"
    style={{
        display:"flex",
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'aqua',
        width:750,
        height:450,
        marginLeft:380,
        marginTop:90,
    }}
    >


    <Box display="flex" height="100vh">
      {/* Left side with image */}
      <Box
        flex={1}
        sx={{
          backgroundImage: "url('/your-image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>

      {/* Right side with form */}
      <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <ToggleButtonGroup
          value={page}
          exclusive
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="login">LOGIN</ToggleButton>
          <ToggleButton value="register">REGISTER</ToggleButton>
        </ToggleButtonGroup>
        {page === "login" ? <LoginPage /> : <RegisterPage />}
      </Box>
    </Box>

    </div>

    </div>

  );
};

export default AuthPage;