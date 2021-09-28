import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/global.module.css";
import ChatHome from "./pages/newChatRoom";
import { useDispatch } from "react-redux";
import { handleGetRooms } from "./Redux/Actions/dmActions";
import { handleGetMembers } from "./Redux/Actions/Members";

const App = () => {
  const dispatch = useDispatch();

  let location = useLocation();

  let org_id =
    location.pathname.split("/")[location.pathname.split("/").length - 3];

  let room_id =
    location.pathname.split("/")[location.pathname.split("/").length - 2];

  let loggedInUser_id =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  useEffect(() => {
    dispatch(handleGetRooms(org_id, loggedInUser_id));
    dispatch(handleGetMembers(org_id));
  }, [location, org_id, room_id, loggedInUser_id]);

  return (
    <Router basename="/dm">
      <Switch>
        <Route
          exact
          path={`/${org_id}/${room_id}/${loggedInUser_id}`}
          render={() => (
            <ChatHome
              org_id={org_id}
              loggedInUser_id={loggedInUser_id}
              room_id={room_id}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
