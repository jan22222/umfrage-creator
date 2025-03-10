import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Stack,
  Link,
  Toolbar,
  Typography,
  Container,
  AppBar,
  Avatar,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { Switch, Badge } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
const pages = [];

const Header = (props) => {
  const theme = useTheme();
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  onAuthStateChanged(auth, (userx) => {
    if (typeof userx != "undefined" && userx != null) {
      setUser(userx);
    } else {
      setUser(null);
    }
  });

  function handleChange() {
    if (props.mode === "dark") {
      props.setMode("light");

      console.log("light");
    } else {
      props.setMode("dark");
      console.log("dark");
    }
    setChecked(!checked);
  }

  onAuthStateChanged(auth, (user) => {
    if (typeof user !== "undefined" && user != null) {
      setIsloggedIn(true);
      setEmail(user.email);
      console.log("hi");
    } else {
      setEmail("");
    }
  });

  return (
    <>
      <Stack
        bgcolor={theme.palette.primary.main}
        height="100px"
        direction="row"
        spacing={2}
        justifyContent="space-around"
        marginRight={5}
        alignItems="center"
        width="100vw"
      >
        <Typography variant="h6">Survey Master</Typography>
        <Stack direction="row" gap={3} alignItems="center">
          {pages.map((page) => (
            <Link
              key={page.id}
              sx={{
                color: "white",
                display: { xs: "none", sm: "block" },
              }}
            >
              {page.name}
            </Link>
          ))}
          <>{email !== "" ? <>{email}</> : <>Not logged in.</>}</>

          <Avatar
            sx={{ width: 60, height: 60 }}
            src={
              email == ""
                ? "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.waBCV1LgeoC450qlxrl2_wAAAA%26pid%3DApi&f=1&ipt=1da4c77c3617031d06de4a174f0598ee2bb00153e58f5bfd75048b214816d108&ipo=images"
                : "https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"
            }
          ></Avatar>

          <Brightness6Icon />
          <Switch
            color="secondary"
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>
      </Stack>
    </>
  );
};
export default Header;
