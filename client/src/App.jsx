import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import { RestaurantContextProvider } from "./context/RestaurantContext";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetail from "./routes/RestaurantDetail";

const App = () => {
  return (
    <RestaurantContextProvider>
      <div className='container'>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/restaurants/:id/update'>
              <UpdatePage />
            </Route>
            <Route exact path='/restaurants/:id'>
              <RestaurantDetail />
            </Route>
          </Switch>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
};

export default App;
