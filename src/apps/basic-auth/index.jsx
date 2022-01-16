import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
import Controlled from "./controlled";
import Custom from "./custom";

export default function Index() {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <ul
        style={{
          marginBottom: 40,
        }}
      >
        <li>
          <Link to={url + "/controlled"}>controlled example</Link>
        </li>
        <li>
          <Link to={url + "/custom"}>custom example</Link>
        </li>
      </ul>
      <Switch>
        <Route path={path + "/controlled"} component={Controlled} />
        <Route path={path + "/custom"} component={Custom} />
      </Switch>
    </div>
  );
}
