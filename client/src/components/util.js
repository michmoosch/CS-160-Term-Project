import stapler from "../assets/products/stapler.jpg";
import pen from "../assets/products/pen.jpg";
import chair from "../assets/products/chair.jpg";
import desk from "../assets/products/desk.jpg";
import paper from "../assets/products/paper.jpg";
import lamp from "../assets/products/lamp.jpg";
import tape from "../assets/products/tape.jpg";
import whiteboard from "../assets/products/whiteboard.jpg";
import trashcan from "../assets/products/trashcan.jpg";

// const imageImports = [stapler, pen, chair, desk, paper, lamp, tape, whiteboard]

const imageImports = {"stapler.jpg": stapler, "pen.jpg": pen, "chair.jpg": chair, "desk.jpg": desk, "paper.jpg": paper, "lamp.jpg": lamp, "tape.jpg": tape, "whiteboard.jpg": whiteboard, "trashcan.jpg": trashcan}

const parseCookie = (str) => {
  let flag = true;
  let str2 = "";
  try {
    // sometimes [1]
    str2 = str.split(";")[1].split("=")[1];
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

export { parseCookie, CATEGORIES, imageImports};
