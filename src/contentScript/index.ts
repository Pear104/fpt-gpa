import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";

//ID
const NonGPAKey = "NonGPAKey";
const MainContentID = "#ctl00_mainContent_divGrade";
const HeaderID = "#ctl00_mainContent_lblRollNumber";
const GridID = "#ctl00_mainContent_divGrade";

const container = document.createElement("div");
container.id = "gpa-panel-new";
document.querySelector(GridID)?.prepend(container);
ReactDOM.createRoot(container).render(React.createElement(App));
