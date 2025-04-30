import React, { useEffect, useState } from "react";
import { mapGPALabel, mapSemesterLabel } from "../utils";

const GradeTable = ({ nonGPAKey }: { nonGPAKey: any }) => {
  const semesters = new Set<string>();
  const [data, setData] = useState<any[]>([]);
  const [rawData, setRawData] = useState<any[]>([]);
  const test = [
    {
      semester: "Spring2023",
      subjects: [
        {
          name: "Vovinam 1",
          grade: "Passed",
          credit: 2,
          gpa: 8.8,
        },
        {
          name: "Vovinam 2",
          grade: "Passed",
          credit: 2,
          gpa: 6.2,
        },
      ],
    },
  ];

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
        return {
          data,
          semester,
          year,
          subjects,
        };
      });
      console.log("hehe", hehe);

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

  const totalCredit = rawData?.reduce((acc: any, curr: any) => {
    if (nonGPAKey.includes(curr.code?.slice(0, 3))) return acc;
    return acc + Number(curr.credit);
  }, 0);

  const totalGrade = data?.reduce((acc: any, curr: any) => {
    if (nonGPAKey.includes(curr?.code?.slice(0, 3))) return acc;
    return acc + Number(curr?.grade) * Number(curr?.credit);
  }, 0);

  const totalGPA = (totalGrade / totalCredit).toFixed(2);

  return (
    <div>
      <table id="gpa-table" className="table table-hover">
        <thead>
          <tr>
            <th>SEMESTER</th>
            <th>YEAR</th>
            <th>SUBJECTS</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: any) => (
            <Row key={index} data={item} nonGPAKey={nonGPAKey} />
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
              <h4>
                <b>Total avg</b>
              </h4>
            </td>
            <td>
              <h4
                style={{
                  textAlign: "start",
                }}
              >
                <span className="label label-info">{totalGPA}</span>
                <div>
                  {totalGrade} x {totalCredit}
                </div>
                {/* <span className="label label-info">8.427000000000001</span> */}
              </h4>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Row = ({ nonGPAKey, data }: { nonGPAKey: any[]; data: any }) => {
  const totalCredit = data?.subjects?.reduce((acc: any, curr: any) => {
    if (nonGPAKey.includes(curr.code?.slice(0, 3))) return acc;
    return acc + Number(curr.credit);
  }, 0);

  const totalGrade = data?.subjects?.reduce((acc: any, curr: any) => {
    if (nonGPAKey.includes(curr.code?.slice(0, 3))) return acc;
    return acc + Number(curr.grade) * Number(curr.credit);
  }, 0);

  const GPA = (totalGrade / totalCredit).toFixed(2);

  return (
    <tr>
      <td>
        <span className={`label ${mapSemesterLabel(data?.semester)}`}>
          {["Not started", "Studying"].includes(data?.data)
            ? data?.data
            : data?.semester}
        </span>
      </td>
      <td>{!["Not started", "Studying"].includes(data?.data) && data?.year}</td>
      <td>
        <div>
          {data?.subjects?.map((subject: any, index: any) => (
            <>
              <div className="subject-block">
                <span
                  className={`code label ${nonGPAKey.includes(subject.code?.slice(0, 3)) || ["Not started", "Studying"].includes(data?.data) ? "label-default" : "label-success"}`}
                  title={`Name: ${subject.name}\nStatus: ${subject.status}\nCredit: ${subject.credit}\nGrade: ${subject.grade} \n${nonGPAKey.includes(subject.code?.slice(0, 3))}`}
                >
                  {subject.code}
                </span>
                {!nonGPAKey.includes(subject.code?.slice(0, 3)) &&
                  !["Not started", "Studying"].includes(data?.data) && (
                    <span
                      className={`label point ${mapGPALabel(+subject.grade)}`}
                    >
                      {subject.grade} x {subject.credit}
                    </span>
                  )}
              </div>
            </>
          ))}
        </div>
      </td>
      <td>
        <span className={`label ${mapGPALabel(+GPA)}`}>
          {GPA == "NaN" ? "No Data" : GPA}
        </span>
      </td>
    </tr>
  );
};

export default GradeTable;
