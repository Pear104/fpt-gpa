import { DefaultNonGPA, NonGPAKey } from "./const";
import { createHTML } from "./util";

export let nonGPAList: string[] = [];

export const getNonGPAList = (): Promise<string[]> => {
  return new Promise((res, rej) => {
    chrome.storage.sync.get([NonGPAKey], (list) => {
      list = list[NonGPAKey];
      if (!Array.isArray(list)) {
        list = DefaultNonGPA as string[];
        setNonGPAList(list as string[]);
      }
      console.log("GET NON_GPA", list);
      nonGPAList = list as string[];
      res(nonGPAList);
    });
  });
};

const setNonGPAList = async (list: string[]) => {
  await chrome.storage.sync.set(
    {
      [NonGPAKey]: list,
    },
    function () {
      console.log("SET NON_GPA", list);
      location.reload();
    },
  );
};

const renderList = (listSubjCell: HTMLElement) => {
  listSubjCell.innerHTML = "";
  nonGPAList.forEach((subj) => {
    const removeBtn = createHTML(
      `<a href="#" class="non-gpa non-gpa-delete label label-danger">x</a>`,
    ) as HTMLElement;
    removeBtn.onclick = async () => {
      nonGPAList = nonGPAList.filter((e) => e != subj);
      console.log(nonGPAList);
      renderList(listSubjCell);
    };
    const block = createHTML(`<div class="inline-block"/>`) as HTMLElement;
    block.append(
      createHTML(
        `<span class="non-gpa label label-primary">${subj}</span>`,
      ) as HTMLElement,
      removeBtn,
    );
    listSubjCell.append(block);
  });
};

const inputNonGPARow = (
  listSubjCell: HTMLElement,
  addSubjRow: HTMLTableRowElement,
) => {
  addSubjRow.insertCell().outerHTML = "<th>Thêm môn vào danh sách:</th>";

  const addSubjCell = createHTML(
    `<div class="input-group"></div>`,
  ) as HTMLElement;
  const input = createHTML(
    `<input class="form-control" placeholder="Nhập mã môn ( không cần số )"/>`,
  ) as HTMLInputElement;
  const submitBtn = createHTML(
    `<div class="input-group-btn"><span class="btn btn-success">Thêm vào danh sách</span></div>`,
  ) as HTMLElement;
  submitBtn.onclick = () => {
    const subject = input.value;
    if (!subject) return;
    console.log(subject);
    nonGPAList.push(subject);
    renderList(listSubjCell);
    input.value = "";
  };

  addSubjCell.append(input, submitBtn);
  addSubjRow.insertCell().append(addSubjCell);
};

const showNonGPARow = (listSubjRow: HTMLTableRowElement) => {
  const listSubjCell = createHTML('<td class="w-50"/>') as HTMLTableCellElement;

  renderList(listSubjCell);

  // Submit / reset default
  const submitCell = createHTML(
    `<th rowspan="2" class="w-25 buttons"/>`,
  ) as HTMLTableCellElement;

  const defaultBtn = createHTML(
    `<span class="btn btn-warning w-100">Mặc định</span>`,
  ) as HTMLElement;
  defaultBtn.onclick = () => {
    nonGPAList = DefaultNonGPA;
    setNonGPAList(nonGPAList);
    renderList(listSubjCell);
  };

  const saveBtn = createHTML(
    `<span class="btn btn-primary w-100">Lưu</span>`,
  ) as HTMLElement;
  saveBtn.onclick = () => {
    console.log(nonGPAList);
    setNonGPAList(nonGPAList);
  };

  submitCell.append(
    defaultBtn,
    createHTML(`<div class="spacing-h"/>`) as HTMLElement,
    saveBtn,
  );

  listSubjRow.append(
    createHTML(
      '<th class="w-25"><b>Các môn không tính vào GPA: </b></th>',
    ) as HTMLElement,
    listSubjCell,
    submitCell,
  );
  return listSubjCell;
};

export const renderNonGPAEditor = () => {
  const root = createHTML(`<div class="table-responsive"/>`) as HTMLElement;
  const table = createHTML(`<table class="table" />`) as HTMLTableElement;
  root.append(table);
  const thead = table.createTHead();

  // List non gpa subject
  const listSubjRow = thead.insertRow();
  const listSubjCell = showNonGPARow(listSubjRow);

  const addSubjRow = thead.insertRow();
  inputNonGPARow(listSubjCell, addSubjRow);

  return root;
};
