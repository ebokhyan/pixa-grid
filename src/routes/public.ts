import { lazy } from "react";
import { IRoute } from "@types/router";

const Home = lazy(() => import("@pages/home"));
const Details = lazy(() => import("@pages/details"));

const pages: IRoute[] = [
  {
    pathname: "/",
    element: Home,
  },
  {
    pathname: "/details",
    element: Details,
  },
];

export default pages;
