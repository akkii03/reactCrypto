import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import axios from "axios";
import {
  createTheme,
  LinearProgress,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {  Container } from "@mui/system";
import { numberWithCommas } from "../Components/Banner/Carousel";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList());
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter((coin) => {
      // return only seach input of coin name and symbol
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontFamily: "Montserrat",
          }}
        >
          CryptoCurrency Prices by Market Cap
        </Typography>

        <TextField
          variant="outlined"
          label="search a Crypto Currency..."
          style={{
            marginBottom: 20,
            width: "100%",
            color: "white",
            backgroundColor: "lightgrey",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["coin", "Price", "24 Change", "Market Cap"].map((head) => {
                    return (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        className="tableRow"
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{
                              marginBottom: 10,
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "upperCase",
                                fontSize: 22,
                                color: "white",
                              }}
                            >
                              {row.symbol}
                            </span>

                            <span
                              style={{
                                color: "darkgrey",
                              }}
                            >
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: "white",
                          }}
                        >
                          <span style={{ color: "gold" }}>INR</span>
                          {" " + numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right" style={{ color: "white" }}>
                          ₹
                          {/* slice function  remove last 6 digit from the api data */}
                          {" " +
                            numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            ) +
                            " "}
                          <span style={{ color: "gold" }}>M</span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "&:MuiPaginationItem-root": {
              color: "gold",
            },
          }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          variant="outlined"
          color="primary"
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
