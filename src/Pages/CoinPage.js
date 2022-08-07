import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import CoinInfo from "../Components/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
// import ReactHtmlParser from 'html-react-parser';
import { numberWithCommas } from "../Components/Banner/Carousel";

export default function Coinpage() {
  const { id } = useParams(); // this helps to take data from url
  // we take id because we pass id variable  in the url
  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin)
    return (
      <LinearProgress style={{ backgroundColor: "gold" }}></LinearProgress>
    );

  return (
    <div className="container">
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{
            marginBottom: 20,
            marginTop: 10,
          }}
        />
        <Typography variant="h3" className="heading">
          {coin?.name}
        </Typography>

        {/* <Typography variant='subtitle1' className='description'>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography> */}

        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Rank:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{ fontFamily: "Montserrat", color: "gold" }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Current Price:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {Symbol} <span style={{ color: "gold" }}>₹</span>{" "}
              {numberWithCommas(coin?.market_data.current_price["inr"])}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{ fontFamily: "Montserrat", color: "gold" }}
            >
              {Symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap["inr"].toString().slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>

      {/* char component */}

      <CoinInfo coin={id} />
    </div>
  );
}
