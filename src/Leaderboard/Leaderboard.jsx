import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Avatar,
  Tooltip,
  IconButton,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import moment from "moment";

const Leaderboard = ({
  contestName,
  price,
  spreadsheetUrl,
  contestEndDate,
  contestStartDate,
}) => {
  const [betsData, setBetsData] = useState([]);
  const [filteredBets, setFilteredBets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(spreadsheetUrl);
      setBetsData(response.data);
      setFilteredBets(response.data); // Initial filter setup
    };
    fetchData();
  }, [spreadsheetUrl]);

  useEffect(() => {
    const contestStart = moment(contestStartDate);
    const filtered = betsData.filter((bet) => {
      const postedTime = moment(bet?.postedTime);
      return postedTime.isSameOrAfter(contestStart);
    });
    setFilteredBets(filtered);
  }, [betsData, contestStartDate]);

  const aggregateBets = (bets) => {
    const handicappers = {};

    bets.forEach((bet) => {
      if (bet.betResult === null) return;

      const odds = parseInt(bet.odds, 10);
      const username = bet.twitterUsername || "Anonymous";
      if (!handicappers[username]) {
        handicappers[username] = {
          potentialWins: 0,
        };
      }
      if (bet.betResult === "won") {
        // Adjust calculation based on the sign of the odds
        if (odds > 0) {
          handicappers[username].potentialWins += 100 * (odds / 100); // For positive odds
        } else {
          handicappers[username].potentialWins += 100 * (100 / Math.abs(odds)); // For negative odds
        }
      }
    });

    return Object.entries(handicappers)
      .map(([username, { potentialWins }]) => ({
        username,
        potentialWins,
      }))
      .sort((a, b) => b.potentialWins - a.potentialWins); // Sort by potentialWins
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "auto",
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 2,
          color: "#333",
        }}
      >
        {contestName}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "#555",
          marginBottom: 3,
        }}
      >
        Prize: <strong>{price}</strong>
      </Typography>

      {aggregateBets(filteredBets).length === 0 ? (
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#999",
          }}
        >
          Contest has not started or no bets have been resolved.
        </Typography>
      ) : (
        <TableContainer
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Table size="small" sx={{ tableLayout: "fixed", width: "100%" }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#007BFF",
                }}
              >
                <TableCell
                  sx={{
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "8px",
                  }}
                >
                  Participant
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "8px",
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    Wins
                    <Tooltip
                      title="Potential earnings based on a $100 bet for each winning bet, adjusted for the odds"
                      PopperProps={{
                        sx: {
                          zIndex: 2147483647, // Set a high z-index for the tooltip
                        },
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{ marginLeft: 0.5, color: "#fff" }}
                      >
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aggregateBets(filteredBets).map((handicapper, index) => (
                <TableRow key={handicapper.username}>
                  <TableCell
                    sx={{
                      fontSize: "12px",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {index + 1}.{" "}
                    <Avatar
                      src={`https://avatar.iran.liara.run/username?username=${handicapper.username}`}
                      alt={"Avatar"}
                      sx={{
                        width: 20,
                        height: 20,
                        marginLeft: 1,
                        marginRight: 1,
                      }}
                    />
                    {handicapper.username}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "12px",
                      padding: "8px",
                      textAlign: "right",
                      color: "#333",
                    }}
                  >
                    ${handicapper.potentialWins.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Leaderboard;
