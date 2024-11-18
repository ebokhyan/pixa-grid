import { lazy } from "react";
import { type IRoute } from "types/router";

const Home = lazy(() => import("pages/home"));
const Photo = lazy(() => import("pages/photo"));

const pages: IRoute[] = [
  {
    pathname: "/",
    element: Home,
    fallback: null,
  },
  {
    pathname: "/photos/:id",
    element: Photo,
    fallback: null,
  },
];

export default pages;
