import react from "react";
import FeedLayout from "../controls/FeedLayout";

export default function Feed(props) {
  return <FeedLayout children={props.children} />;
}
