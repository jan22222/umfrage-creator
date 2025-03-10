import React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const StyledStack = styled("Stack")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "max(5%, 20px)",
}));

const FeedLayout = (props) => {
  return <StyledStack>{props.children}</StyledStack>;
};

export default FeedLayout;
