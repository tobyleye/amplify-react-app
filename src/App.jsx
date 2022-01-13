import { BrowserRouter, Switch, Route, Link,Redirect } from "react-router-dom";
import CoinsApp from "./apps/coins";
import "./app.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="root">
          <nav>
            <h3>Apps</h3>
            <ul>
              <li>
                <Link to="/coins">Coins</Link>
              </li>
            </ul>
          </nav>

          <main>
            <Switch>
              <Route path="/coins">
                <CoinsApp />
              </Route>
              <Route path="/" exact> 
                <div className="select-app">
                    <p>No app selected. <br />Click on any link on the side nav to view</p>
                </div>
              </Route>
              <Redirect from="*" to="/" />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
