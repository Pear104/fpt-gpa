import React, { useEffect, useState } from "react";
import { mapGPALabel, mapSemesterLabel } from "../utils";

const GradeTable = ({
  nonGPAKey,
  data,
  rawData,
}: {
  nonGPAKey: any[];
  data: any;
  rawData: any;
}) => {
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

  const totalCredit = rawData?.reduce((acc: any, curr: any) => {
    if (nonGPAKey.includes(curr.code?.slice(0, 3))) return acc;
    return acc + Number(curr.credit);
  }, 0);

  const totalGrade = rawData?.reduce((acc: any, curr: any) => {
    if (nonGPAKey.includes(curr?.code?.slice(0, 3))) return acc;
    return acc + Number(curr?.grade) * Number(curr?.credit);
  }, 0);

  const totalGPA = totalGrade / totalCredit;

  console.log("totalGPA", rawData);

  return (
    <table id="gpa-table" className="table table-hover">
      <thead>
        <tr
          style={{
            color: "white",
            fontWeight: "bolder",
          }}
        >
          <th>
            <b>SEMESTER</b>
          </th>
          <th>
            <b>YEAR</b>
          </th>
          <th>
            <b>SUBJECTS</b>
          </th>
          <th>
            <b>GPA</b>
          </th>
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
            </h4>
          </td>
        </tr>
      </tbody>
    </table>
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

  const GPA = (totalGrade / totalCredit).toFixed(3);

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
                    <span className={`label point ${mapGPALabel(subject)}`}>
                      {subject.grade} x {subject.credit}
                    </span>
                  )}
              </div>
            </>
          ))}
        </div>
      </td>
      <td>
        <span className={`label ${mapGPALabel(null, +GPA)}`}>
          {GPA == "NaN" ? "No Data" : GPA}
        </span>
      </td>
    </tr>
  );
};

export default GradeTable;
