import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Store } from "@eduardoac-skimlinks/webext-redux";

import App from "./containers/app/App";
import { OptionsProvider } from "./contexts/OptionsContext";

const proxyStore = new Store();

const anchor = document.createElement("div");
anchor.id = "rcr-anchor";

if (document.querySelectorAll('[aria-label="Loading"]').length === 0) {
  mount();
} else {
  let intervalId = null;
  intervalId = setInterval(() => {
    if (document.querySelectorAll('[aria-label="Loading"]').length === 0) {
      clearInterval(intervalId);
      mount();
    }
  }, 500);
}

const mount = () => {
  if (document.querySelector(".layout-page") !== null) {
    document
      .querySelector(".layout-page")
      .insertBefore(
        anchor,
        document.querySelector(".layout-page").childNodes[0],
      );
    proxyStore.ready().then(() => {
      render(
        <Provider store={proxyStore}>
          <OptionsProvider>
            <App />
          </OptionsProvider>
        </Provider>,
        document.getElementById("rcr-anchor"),
      );
    });
  }
};

export default proxyStore;
