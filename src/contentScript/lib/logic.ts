import {
  appendGPATable,
  buildGPATable,
  createMapSemester,
  parseGrade,
} from "./util";
import { gradeTablesDOM } from "./const";
import { getNonGPAList } from "./nonGPA";

const main = async () => {
  await getNonGPAList();
  const mainGrade = parseGrade(gradeTablesDOM[0]);
  const mapSemester = createMapSemester(mainGrade);

  const table = buildGPATable(mapSemester, mainGrade);
};
