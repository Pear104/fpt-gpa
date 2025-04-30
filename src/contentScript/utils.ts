export const mapSemesterLabel = (semester: string) => {
  if (semester == "Summer") return "label-warning";
  if (semester == "Spring") return "label-success";
  if (semester == "Fall") return "label-info";
  return "label-default";
};

export const mapGPALabel = (grade: number) => {
  if (grade >= 9) return "label-primary";
  else if (grade >= 8) return "label-info";
  else if (grade >= 0) return "label-warning";
  return "label-default";
};
