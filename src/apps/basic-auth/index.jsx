import { useRouteMatch, Switch, Route } from "react-router-dom";
import Profile from "./profile";
import Nav from "./nav";

export default function Index() {
  let { path } = useRouteMatch();
  return (
    <div>
      <Nav />
      <Switch>
        <Route path={path + "/profile"} component={Profile} />
      </Switch>
    </div>
  );
}
