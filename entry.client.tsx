import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import routes from "./app/routes.tsx";
import { createBrowserRouter } from "react-router";
import "./app/index.css";

const router = createBrowserRouter(routes, {
  // need to ensure this script runs AFTER <StaticRouterProvider> in
  // entry.server.tsx so that window.__staticRouterHydrationData is available
  // @ts-ignore: https://reactrouter.com/start/data/custom#4-hydrate-in-the-browser
  hydrationData: globalThis.__staticRouterHydrationData,
});

hydrateRoot(
  document,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
