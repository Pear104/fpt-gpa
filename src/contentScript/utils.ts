export const mapSemesterLabel = (semester: string) => {
  if (semester == "Summer") return "label-warning";
  if (semester == "Spring") return "label-success";
  if (semester == "Fall") return "label-info";
  return "label-default";
};

export const mapGPALabel = (subject?: any, grade?: number) => {
  if (subject?.status) {
    if (subject.status == "Passed") {
      if (subject.grade >= 9) return "label-primary";
      else if (subject.grade >= 8) return "label-info";
      else if (subject.grade >= 0) return "label-warning";
    }
    if (subject.status == "Not passed") return "label-danger";
  } else if (grade) {
    if (grade >= 9) return "label-primary";
    else if (grade >= 8) return "label-info";
    else if (grade >= 0) return "label-warning";
    return "label-default";
  }
};
