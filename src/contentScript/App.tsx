import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import GradeTable from "./components/GradeTable";

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
  useEffect(() => {
    const key = localStorage.getItem("NonGPAKey");
    if (key) setNonGPAKey(key);
  });
  return (
    <>
      <Header nonGPAKey={nonGPAKey} setNonGPAKey={setNonGPAKey} />
      <GradeTable nonGPAKey={nonGPAKey} />
    </>
  );
};

export default App;
