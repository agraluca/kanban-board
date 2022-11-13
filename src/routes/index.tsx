import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";

import UseHomeProvider from "pages/Home/useHome";

import Home from "pages/Home";

import Header from "components/Header";
import { Container } from "components/Container";

import * as paths from "./paths";

export default function Routes() {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Switch>
          <Route
            path={paths.home}
            element={
              <UseHomeProvider>
                <Home />
              </UseHomeProvider>
            }
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
