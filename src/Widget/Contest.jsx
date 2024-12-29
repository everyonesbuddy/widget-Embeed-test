import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Leaderboard from "../Leaderboard/Leaderboard";
import PostYourPicks from "../PostYourPicks/PostYourPicks";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabPanel from "../CustomTabPanel/CustomTabPanel";

const Contest = () => {
  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value, setValue] = React.useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {/* <h1>dhfhdhh</h1> */}
      <Box sx={{ width: "auto", textAlign: "center", p: 3 }}>
        <div className="contest-header">
          <div className="contest-header-left">
            <p>Welcome To The Sure Odds Pickem Contest</p>
            {/* {!isMobile && (
              <p>
                Participate and Win a free 2 months subscription to Doink Sports
              </p>
            )} */}
            {/* <button
              onClick={() => window.open(contestDetails.affiliateUrl, "_blank")}
              className="button-link"
            >
              {contestDetails.affiliateCopy}
            </button> */}
          </div>
          {/* <div className="contest-header-right">
            <img
              src="https://i.ibb.co/C8Cb5BF/Po6-QETC5-400x400.jpg"
              alt="Prize Picks"
            />
          </div> */}
        </div>
        <Box
          sx={{
            zIndex: 1100,
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#fff",
              },
            }}
          >
            <Tab
              label="Post Your Picks🥇"
              {...a11yProps(0)}
              sx={{
                color: "#4F46E5",
                fontSize: "8px",
              }}
            />
            <Tab
              label="Leaderboard 🏆"
              {...a11yProps(1)}
              sx={{
                color: "#4F46E5",
                fontSize: "8px",
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {/* <PostYourPicks
            contestName="Doink Sports"
            primaryImageUrl="https://i.ibb.co/xzk85XK/0k0-A7-Ib3-400x400.jpg"
            price="Win a free 2 months subscription to Doink Sports"
            spreadsheetUrl="https://i.ibb.co/C8Cb5BF/Po6-QETC5-400x400.jpg"
            sponsored={false}
            contestEndDate="1/31/2025"
            contestStartDate="12/8/2024"
            affiliateUrl="https://doinksports.com/?via=Sure-Odds"
            affiliateCopy="Try Doink Sports Research Platform For Free"
            contestLeague={[
              "americanfootball_nfl",
              "basketball_nba",
              "soccer_epl",
            ]}
          /> */}
          <p>Hello world</p>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Leaderboard
            contestName="Doink Sports"
            primaryImageUrl="https://i.ibb.co/xzk85XK/0k0-A7-Ib3-400x400.jpg"
            price="Win a free 2 months subscription to Doink Sports"
            spreadsheetUrl="https://sheet.best/api/sheets/b9c7054b-1a70-4afb-9a14-c49967e8faf8"
            sponsored={false}
            contestEndDate="1/31/2025"
            contestStartDate="9/8/2024"
            affiliateUrl="https://doinksports.com/?via=Sure-Odds"
            affiliateCopy="Try Doink Sports Research Platform For Free"
            contestLeague={[
              "americanfootball_nfl",
              "basketball_nba",
              "soccer_epl",
            ]}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Contest;
