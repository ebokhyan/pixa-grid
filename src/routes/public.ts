import { IRoute } from "types/router";
import Home from "pages/home";
import Photo from "pages/photo";

const pages: IRoute[] = [
  {
    pathname: "/",
    element: Home,
  },
  {
    pathname: "/photos/:id",
    element: Photo,
  },
];

export default pages;
