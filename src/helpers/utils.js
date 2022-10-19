import { v4 as uuidv4 } from "uuid";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateHashId = () => {
  const myuuid = uuidv4();
  return myuuid;
};

export const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

export const convertUSToBRDate = (date) => {
  const [year, month, day] = date.split("-");
  const result = [padTo2Digits(day), padTo2Digits(month), year].join("/");
  return result;
};

export const formatUSDate = (date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
};

export const formatMoney = (money) => {
  const res = money.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  return res;
};

export const getSumArrayByKey = (arr, key) => {
  return arr.reduce(
    (accumulator, current) => accumulator + Number(current[key]),
    0
  );
};

export const exportPdf = (title, headers, data, filename) => {
  const unit = "pt";
  const size = "A4";
  const orientation = "portrait";
  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);

  let content = {
    startY: 50,
    head: headers,
    body: data,
  };

  doc.text(title, marginLeft, 40);
  doc.autoTable(content);
  doc.save(filename);
};
