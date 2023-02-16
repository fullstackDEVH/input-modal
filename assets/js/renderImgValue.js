import { aspectRatioImg } from "./computed.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const img = $(".popup-left-img img");
const numOfLoad = $(".numOfLoad");
const inputText = $(".popup-right-input #text");
const img_container = $(".popup-left-img");

export const renderCurrentImgAndValue = (index, dataCall) => {
  new Promise((resolve) => {
    img.src = dataCall[index]?.urlImg || "";

    img.onload = function () {
      resolve();
    };
  }).then(() => {
    aspectRatioImg(img, img_container);
    inputText.value = dataCall[index].value;
    numOfLoad.innerText = index + 1 + "/" + dataCall.length;
    inputText.focus();
  });
};
