import "./styles.css";
import "./views/map-view.js";
import { Router } from "@vaadin/router";

window.addEventListener("load", () => {
  initRouter();
  registerSW();
});

function initRouter() {
  const router = new Router(document.querySelector("main"));

  router.setRoutes([
    {
      path: "/",
      component: "map-view",
      action: () =>
        import(/* webpackChunkName: "map-view" */ "./views/map-view"),
    },
  ]);
}

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (e) {
      console.log("ServiceWorker registration failed. Sorry about that.", e);
    }
  } else {
    console.log("Your browser does not support ServiceWorker.");
  }
}
