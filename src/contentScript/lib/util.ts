import { gridDom, headerDOM, SemIndex } from "./const";
import { GPATable, Semester, Subject } from "./define";
import { renderNonGPAEditor } from "./nonGPA";

export const extractText = (node: HTMLElement | null): string => {
  if (node?.childElementCount === 0) {
    return node.innerHTML;
  }
  return node?.textContent || "";
};

export const createHTML = (content: string): Node => {
  const template = document.createElement("template");
  template.innerHTML = content.trim();
  return template.content.firstChild as Node;
};

export const createElement = (root: string, ...elems: Node[]): HTMLElement => {
  const div = document.createElement(root);
  elems.forEach((e) => {
    div.append(e);
  });
  return div;
};

export const rankLabel = (grade: number): string => {
  if (grade >= 9) return "label-primary";
  if (grade >= 8) return "label-info";
  if (grade >= 5) return "label-warning";
  return "label-danger";
};

export const round = (num: number): number => Math.round(num * 100) / 100;

export const parseGrade = (doms: HTMLElement): Subject[] => {
  return [...doms.querySelectorAll("tbody>tr")].map((tr) => {
    let tds = tr.querySelectorAll("td");
    const args = [2, 3, 6, 7, 8, 9].map((e: any) => extractText(tds[e] as any));
    return new Subject(
      args[0],
      args[1],
      args[2],
      args[3] as any,
      args[4] as any,
      args[5] as any,
    );
  });
};

export const showButtonDOM = (): Node => {
  const dom = createHTML(
    `<button class="label label-success" style="border: none;" id="gpa-btn" type="button">Hide GPA</button>`,
  );

  return dom;
};

export const helpBtnRender = (): Node => {
  return createHTML(
    `<a href="https://github.com/qwerty22121998/fpt-gpa/blob/master/README.md" class="label label-info" target="_blank" id="help-btn">Help</a>`,
  );
};

export const renderShowButton = (headerDOM: HTMLElement): void => {
  headerDOM.append(" - ", showButtonDOM());
};

export const getGPAInfo = (
  mainGrade: Subject[],
): { sum: number; total: number } => {
  let gpa = mainGrade.reduce(
    (avg, sub) => {
      if (sub.includeInGPA() && sub.status === "Passed")
        return {
          sum: avg.sum + sub.grade * sub.credit,
          total: avg.total + sub.credit,
        };
      return avg;
    },
    {
      sum: 0,
      total: 0,
    },
  );
  return gpa;
};

export const createMapSemester = (
  mainGrade: Subject[],
): { [key: string]: Semester } => {
  let mapSemester: { [key: string]: Semester } = {};

  mainGrade.forEach((subj) => {
    if (!subj.semester) subj.semester = subj.status;
    if (!mapSemester[subj.semester]) {
      mapSemester[subj.semester] = new Semester(subj.semester);
    }
    mapSemester[subj.semester].subjects.push(subj);
  });

  return mapSemester;
};

interface GPATableData {
  semester: string;
  year: string;
  subjects: string;
  gpa: string;
}

export const buildGPATable = (
  mapSemester: { [key: string]: Semester },
  mainGrade: Subject[],
): GPATableData[] => {
  const tableData: GPATableData[] = [];
  const report = Object.values(mapSemester).sort((a: any, b: any) => {
    if (a.year !== b.year) return a.year - b.year;
    return (
      SemIndex[a.semester as keyof typeof SemIndex] -
      SemIndex[b.semester as keyof typeof SemIndex]
    );
  });
  report.forEach((sem) => {
    tableData.push({
      semester: sem.SemesterDOM.textContent || "",
      year: sem.Year,
      subjects: sem.SubjectsDOM.textContent || "",
      gpa: sem.GpaDOM.textContent || "",
    });
  });
  let gpaInfo = getGPAInfo(mainGrade);
  let gpa = gpaInfo.sum / gpaInfo.total;
  tableData.push({
    semester: "",
    year: "",
    subjects: "Total avg",
    gpa: gpa.toString(),
  });
  return tableData;
};

export const appendGPATable = (table: GPATable): void => {
  const container = createHTML(`<div id="gpa-panel">`) as HTMLElement;
  const showBtnDOM = showButtonDOM() as HTMLElement;
  const helpBtn = helpBtnRender() as HTMLElement;

  console.log(container.style.maxHeight);
  showBtnDOM.onclick = () => {
    if (container.style.maxHeight !== "0px") {
      container.style.maxHeight = "0px";
      showBtnDOM.innerText = "Show GPA";
    } else {
      container.style.maxHeight = container.scrollHeight + 30 + "px";
      showBtnDOM.innerText = "Hide GPA";
    }
  };

  headerDOM!.append(" - ", showBtnDOM);
  headerDOM!.append(" - ", helpBtn);
  container.append(renderNonGPAEditor(), table.DOM() as Node);
  gridDom!.prepend(container);
  console.log("container.scrollHeight:", container.scrollHeight);
  container.style.maxHeight = container.scrollHeight + "px";

  // Inject root element for React
  const rootElement = document.createElement("div");
  rootElement.id = "root";
  container.prepend(rootElement);
};
