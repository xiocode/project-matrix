import type { RapidPage } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "home",
  name: "首页",
  title: "首页",
  view: [
    {
      $type: "htmlElement",
      htmlTag: "iframe",
      style: {
        outline: "none",
        border: "none",
        width: "100%",
        height: "100vh",
      },
      attributes: {
        src: "http://192.168.1.10:8100/#/de-link/KejLoYpS",
      },
    },
  ],
};

export default page;
