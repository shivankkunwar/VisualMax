const xlsx = require('xlsx');

exports.processData = (workbook) => {
  const sheetName = workbook.SheetNames[0];
  const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const offset = new Date(1899, 11, 30);
  return rawData.map(row => ({
    day: new Date(offset.getTime() + row.Day * 24 * 60 * 60 * 1000),
    age: row.Age,
    gender: row.Gender,
    features: {
      A: row.A,
      B: row.B,
      C: row.C,
      D: row.D,
      E: row.E,
      F: row.F,
    },
  }));
};