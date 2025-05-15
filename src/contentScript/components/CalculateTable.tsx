import React, { useEffect, useState } from "react";
import { mapGPALabel } from "../utils";

const CalculateTable = ({
  rawData,
  nonGPAKey,
}: {
  rawData: any;
  nonGPAKey: any[];
}) => {
  const [editData, setEditData] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>("");

  useEffect(() => {
    setEditData(rawData);
  }, [rawData]);

  const handleSave = () => {
    const creditInput: HTMLFormElement = document.querySelector(
      ".edit[name='credit']",
    )!;
    const gradeInput: HTMLFormElement = document.querySelector(
      ".edit[name='grade']",
    )!;
    const credit = creditInput?.value;
    const grade = gradeInput?.value;

    setEditData((prevData) => {
      return prevData.map((item: any) => {
        if (item.code == editing) {
          return { ...item, credit, grade };
        }
        return item;
      });
    });

    setEditing("");
    console.log("editData", editData);
  };

  const totalCredit = editData?.reduce((acc: any, curr: any) => {
    if (nonGPAKey.includes(curr.code?.slice(0, 3))) return acc;
    return acc + Number(curr.credit);
  }, 0);

  const totalGrade = editData?.reduce((acc: any, curr: any) => {
    if (nonGPAKey.includes(curr?.code?.slice(0, 3))) return acc;
    return acc + Number(curr?.grade) * Number(curr?.credit);
  }, 0);

  const totalGPA = totalGrade / totalCredit;

  return (
    <div id="edit-gpa">
      <div
        style={{
          marginBottom: "12px",
          fontSize: "12px",
        }}
      >
        Search credit:{" "}
        <a
          target="_blank"
          href="https://fap.fpt.edu.vn/FrontOffice/SubjectFees.aspx"
          style={{
            marginLeft: "8px",
          }}
        >
          HERE
        </a>
      </div>
      <table className="table table-hover">
        <thead
          style={{
            position: "sticky",
            top: 0,
          }}
        >
          <tr
            style={{
              color: "white",
              fontWeight: "bolder",
            }}
          >
            <th>
              <b>NO</b>
            </th>
            <th>
              <b>SUBJECT</b>
            </th>
            <th>
              <b>CREDIT</b>
            </th>
            <th>
              <b>GRADE</b>
            </th>
          </tr>
          <tr>
            <td></td>
            <td>
              <h4>
                <b>Total avg</b>
              </h4>
            </td>
            <td></td>
            <td>
              <h4 style={{ textAlign: "start" }}>
                <span className="label label-info">{totalGPA}</span>
                <span
                  onClick={() => setEditData(rawData)}
                  className="label-warning label margin-8 reset-btn"
                >
                  Reset
                </span>
              </h4>
            </td>
          </tr>
        </thead>
        <tbody>
          {editData
            .filter((item) => !nonGPAKey.includes(item.code.slice(0, 3)))
            ?.map((item: any, index: any) => (
              <tr
                key={index}
                style={{
                  backgroundColor: nonGPAKey.includes(item.code.slice(0, 3))
                    ? "#cfcfcffa"
                    : "white",
                }}
              >
                <td>{index + 1}</td>
                <td>{item.code}</td>
                <td>
                  {editing == item.code ? (
                    <input
                      className="edit"
                      name={"credit"}
                      type="number"
                      defaultValue={item.credit}
                    />
                  ) : (
                    item.credit
                  )}
                </td>
                <td>
                  {editing == item.code ? (
                    <input
                      className="edit"
                      name={"grade"}
                      type="number"
                      defaultValue={item.grade}
                    />
                  ) : (
                    <span className={`label point label-primary`}>
                      {item.grade}
                    </span>
                  )}
                  {editing == item.code ? (
                    <a
                      type="submit"
                      onClick={handleSave}
                      style={{
                        cursor: "pointer",
                        marginLeft: "12px",
                        textDecoration: "underline",
                      }}
                    >
                      Save
                    </a>
                  ) : (
                    <a
                      onClick={() => setEditing(item.code)}
                      style={{
                        cursor: "pointer",
                        marginLeft: item.grade && "12px",
                        textDecoration: "underline",
                      }}
                    >
                      Edit
                    </a>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalculateTable;
