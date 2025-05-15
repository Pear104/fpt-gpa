import React, { useEffect, useState } from "react";

const Header = ({
  nonGPAKey,
  setNonGPAKey,
}: {
  nonGPAKey: any;
  setNonGPAKey: any;
}) => {
  return (
    <div id="gpa-header" className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="w-25">
              <b>Các môn không tính vào GPA: </b>
            </th>
            <td className="w-50">
              {nonGPAKey.map((item: any, index: any) => (
                <div className="inline-block" key={item}>
                  <span className="non-gpa label label-primary">{item}</span>
                  <a
                    href="#"
                    className="non-gpa non-gpa-delete label label-danger"
                    onClick={() =>
                      setNonGPAKey(
                        nonGPAKey.filter((_: any, i: any) => i !== index),
                      )
                    }
                  >
                    x
                  </a>
                </div>
              ))}

              <div className="inline-block">
                <span className="non-gpa label label-primary">TMI</span>
                <span className="non-gpa non-gpa-delete label label-danger">
                  x
                </span>
              </div>
            </td>
            <th rowSpan={2} className="w-25 buttons">
              <span className="btn btn-warning w-100">Mặc định</span>
              <div className="spacing-h"></div>
              <span className="btn btn-primary w-100">Lưu</span>
            </th>
          </tr>
          <tr>
            <th>Thêm môn vào danh sách:</th>
            <td>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Nhập mã môn ( không cần số )"
                />
                <div className="input-group-btn">
                  <span className="btn btn-success">Thêm vào danh sách</span>
                </div>
              </div>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Header;
