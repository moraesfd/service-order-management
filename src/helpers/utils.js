import { v4 as uuidv4 } from "uuid";

export const generateHashId = () => {
  const myuuid = uuidv4();
  return myuuid;
};

export const formatDate = (date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
};

export const formatMoney = (money) => {
  const res = money.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  return res;
};
