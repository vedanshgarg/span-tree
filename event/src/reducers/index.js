import { combineReducers } from "redux";

import count from "./count";
import opened from "./UI/opened";
import pinned from "./UI/pinned";
import tree from "./API/tree";

export default combineReducers({
  count,
  opened,
  pinned,
  tree,
});
