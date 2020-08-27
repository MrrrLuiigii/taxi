import "./styles.css";
import "./views/ritten-view.js";
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
      component: "ritten-view",
    },
    {
      path: "/add",
      component: "rit-toevoegen-view",
      action: () =>
        import(
          /* webpackChunkName: "rit-toevoegen-view" */ "./views/rit-toevoegen-view"
        ),
    },
    {
      path: "(.*)",
      component: "not-found-view",
      action: () =>
        import(
          /* webpackChunkName: "not-found-view" */ "./views/not-found-view"
        ),
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
