import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import CoinsApp from "./apps/coins";
import NotesApp from "./apps/notes";
import BasicAuth from "./apps/basic-auth/controlled";
import "./app.css";
import S3trigger from "./apps/s3trigger";
import EcommerceApp from "./apps/ecommerce";

function App() {
  return (
    <div className="App">
      <AppRouter
        apps={[
          { appName: "Notes", appRoute: "/notes", appComponent: NotesApp },
          {
            appName: "AuthExample",
            appRoute: "/basic-auth",
            appComponent: BasicAuth,
          },
          { appName: "Coins", appRoute: "/coins", appComponent: CoinsApp },
          {
            appName: "S3 trigger example",
            appRoute: "/s3-trigger",
            appComponent: S3trigger,
          },
          {
            appName: "Ecommerce",
            appRoute: "/ecommerce",
            appComponent: EcommerceApp,
          },
        ]}
      />
    </div>
  );
}


function AppRouter({ apps }) {
  return (
    <BrowserRouter>
      <div className="root">
        <nav>
          <h3>Apps</h3>
          <ul>
            {apps.map((app, index) => (
              <li>
                <Link key={`list-item-${app.appName}`} to={app.appRoute}>{app.appName}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <main>
          <Switch>
            {apps.map((app, index) => (
              <Route
                key={`route-${app.appName}`}
                path={app.appRoute}
                component={app.appComponent}
              />
            ))}

            <Route path="/" exact>
              <div className="select-app">
                <p>
                  No app selected. <br />
                  Click on any link on the side nav to view
                </p>
              </div>
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
