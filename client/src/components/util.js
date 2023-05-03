const parseCookie = (str) => {
  let flag = true;
  let str2 = "";
  try {
    // sometimes [1]
    str2 = str.split(";")[2].split("=")[1];
  } catch (e) {
    flag = false;
  }

  let data = {};

  if (flag) {
    try {
      data = JSON.parse(str2);
    } catch (e) {
      flag = false;
    }
  }

  return flag ? data : flag;
};

const CATEGORIES = ["All", "Office Supplies", "Office Furniture"];

export { parseCookie, CATEGORIES };
