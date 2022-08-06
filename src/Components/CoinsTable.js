import React, { useEffect, useState } from 'react';
import {CoinList} from '../config/api';
import axios from 'axios';
import { createTheme, TextField, ThemeProvider, Typography } from '@mui/material';
import { color, Container } from '@mui/system';

export default function CoinsTable() {

    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const [search,setSearch] = useState("");

    const fetchCoins = async ()=>{
        setLoading(true);
        const {data} = await axios.get(CoinList());
        setCoins(data);
        setLoading(false);
    }

    useEffect(()=>{
        fetchCoins();
    },[])

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
      <Container style={{textAlign:"center"}}>

        <Typography
        variant='h4'
            style={{
                margin:18,
                fontFamily:"Montserrat"
            }}
        >
            CryptoCurrency Prices by Market Cap
        </Typography>

        <TextField variant='outlined' label="search a Crypto Currency..."
            style={{
                marginBottom:20,
                width:"100%",
                color:"white",
                backgroundColor:"lightgrey",
            }}
            onChange={(e)=> setSearch(e.target.value)}
        />

      </Container>
    </ThemeProvider>
  )
}
