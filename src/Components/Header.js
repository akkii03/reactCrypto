import { 
    AppBar, createTheme , Select, Toolbar, Typography,
    ThemeProvider
 } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import {useNavigate} from "react-router-dom";




export default function Header() {

  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette:{
        primary:{
            main:"#fff",
        },

        type:"dark",
    },
  });



  return (
    <ThemeProvider theme={darkTheme}>
    {/* // this is the material ui component and its properties */}
    <AppBar color="transparent" position="static">
      {/* container  helps for responsiveness */}
      <Container>
        <Toolbar>
          {/* Typography helps to give title or 
                logo to navbar means appbar component */}
          <Typography style={{
            flex: 1,
            color: "gold",
            fontFamily: "Montserrat",
            fontWight: "bold",
            cursor: "Pointer",
            variant:'h5'
          }} onClick={()=>{
            navigate('/');
          }}>CryptoVerse</Typography>
          <Select
            variant="outlined"
            style={{
              width: 100,
              height: 40,
              marginRight: 15,
            }}
            
          >
            
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
