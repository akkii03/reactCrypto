import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import {Line} from 'react-chartjs-2'

export default function CoinInfo({ id }) {
  const [historicalData, setHistrocialData] = useState();
  const [days, setDays] = useState(1);
  const fetchApi = async () => {
    const { data } = await axios.get(HistoricalChart(id, days));
    setHistrocialData(data.prices);
  };
  useEffect(() => {
    fetchApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme} >
        <div className="containerCoinInfo">
            {/* charts */}
            {
                !historicalData ?(
                    <CircularProgress
                    style={{color:"gold",}}
                    size={250}
                    thickness={2}
                    >
                    </CircularProgress>
                ):(<Line
                data={{
                    labels:historicalData.map((coin)=>{
                      let date = new Date(coin[0]);
                      let time = date.getHours()>12?
                      `${date.getHours()-12} : ${date.getMinutes()}PM`:
                      `${date.getHours()}:${date.getMinutes()}AM`;  
                      return days===1?time:date.toLocaleDateString();
                    }),

                    datasets:[
                        {
                            data:historicalData.map((coin)=>coin[1]),
                            label:`Price( Past ${days} Days) in INR`,
                            borderColor:"#EEBC1D"
                        }

                    ]
                }}
                >

                </Line>)
            }
            {/* buttons to change the history of chart */}
        </div>
    </ThemeProvider>
  );
}
