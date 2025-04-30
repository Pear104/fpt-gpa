export const NonGPAKey = "NonGPAKey";

//ID
export const MainContentID = "ctl00_mainContent_divGrade";
export const HeaderID = "ctl00_mainContent_lblRollNumber";
export const GridID = "ctl00_mainContent_divGrade";

//DOM
export const gradeTablesDOM = document!
  .getElementById(MainContentID)!
  .querySelectorAll("table");
export const headerDOM = document.getElementById(HeaderID);
export const gridDom = document.getElementById(GridID);
export const SemIndex = {
  Spring: 0,
  Summer: 1,
  Fall: 2,
};

export const DefaultNonGPA = ["OJS", "VOV", "GDQP", "LAB", "ENT", "SSS", "TMI"];
