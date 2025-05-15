import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import GradeTable from "./components/GradeTable";
import CalculateTable from "./components/CalculateTable";
import { createRoot } from "react-dom/client";
import * as cheerio from "cheerio";

const App = () => {
  const [nonGPAKey, setNonGPAKey] = useState<any>([
    "OJS",
    "VOV",
    "GDQP",
    "LAB",
    "ENT",
    "SSS",
    "TMI",
    "TRS",
    "OTP",
  ]);
  const [data, setData] = useState<any[]>([]);
  const [rawData, setRawData] = useState<any[]>([]);
  const semesters = new Set<string>();
  const [showGPA, setShowGPA] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const header = document.getElementById("ctl00_mainContent_lblRollNumber");
    // if (!/\d/.test(header?.textContent || "") && header) {
    if (header) {
      const span = document.createElement("span");
      span.style.marginLeft = "8px";
      header.appendChild(span);
      const root = createRoot(span);
      root.render(
        <>
          -
          <span
            className="label label-warning margin-8"
            onClick={() => setShowGPA((prev) => !prev)}
          >
            Show GPA
          </span>
          -
          <span
            className="label label-info margin-8"
            onClick={() => setShowEdit((prev) => !prev)}
          >
            Edit GPA
          </span>
        </>,
      );
    }
  }, []);

  useEffect(() => {
    try {
      let tableData = crawlGPA();
      semesters.add("Studying");
      semesters.add("Not started");

      const hehe = [...semesters].map((data) => {
        const semester = data?.slice(0, data.length - 4) || "";
        const year = data?.slice(data.length - 4, data.length) || "";
        let subjects: any[] = [];
        if (data == "Not started") {
          subjects = tableData.filter((item) => item.status == "Not started");
        } else if (data == "Studying") {
          subjects = tableData.filter((item) => item.status == "Studying");
        } else {
          subjects = tableData.filter((item) => item.semester == data);
        }
        return { data, semester, year, subjects };
      });
      setData(hehe);
      setRawData(tableData);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const crawlGPA = () => {
    const targetTable = document.querySelector(
      "#ctl00_mainContent_divGrade > table",
    );
    const targetTRs = Array.from(
      targetTable?.querySelectorAll("tbody > tr") || [],
    );

    let test1: any[] = [];

    targetTRs.forEach((tr) => {
      const tds = Array.from(tr.querySelectorAll("td") || []);
      const semester = tds?.[2]?.innerText;
      if (semester) semesters.add(semester);

      const code = tds?.[3]?.innerText;
      const name = tds?.[6]?.innerText;
      const credit = tds?.[7]?.innerText;
      const grade = tds?.[8]?.innerText;
      const status = tds?.[9]?.innerText;

      if (code)
        test1.push({
          semester,
          credit,
          grade,
          code,
          name,
          status,
        });
    });
    return test1;
  };

  return (
    <>
      {showEdit && <CalculateTable rawData={rawData} nonGPAKey={nonGPAKey} />}
      {showGPA && (
        <>
          <Header nonGPAKey={nonGPAKey} setNonGPAKey={setNonGPAKey} />
          <GradeTable data={data} rawData={rawData} nonGPAKey={nonGPAKey} />
        </>
      )}
    </>
  );
};

export default App;
