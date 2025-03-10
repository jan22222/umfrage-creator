import react from "react";
import { Stack } from "@mui/material";

export default function Feed(props) {
  return (
    <Stack
      direction="row"
      width="100%"
      height="100%"
      justifyContent="center"
      alignContent="center"
    >
      {props.children}
    </Stack>
  );
}
