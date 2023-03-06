import { aspectRatioImg } from "./computed.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const img = $(".popup-left-img img");
const numOfLoad = $(".numOfLoad");
const inputText = $(".popup-right-input #text");
const img_container = $(".popup-left-img");

const btn_next = $("#btn-next");
const btn_pre = $("#btn-previos");
const loading = $(".container-loader");

export const renderCurrentImgAndValue = (index, dataCall) => {

  btn_next.disabled = true;
  btn_pre.disabled = true;

  loading.classList.add("show");

  new Promise((resolve) => {
    img.src = dataCall[index]?.urlImg || "";

    img.onload = function () {
      resolve();
    };
  }).then(() => {
    btn_next.disabled = false;
    btn_pre.disabled = false;



    loading.classList.remove("show");
    aspectRatioImg(img, img_container);
    inputText.value = dataCall[index].value;
    numOfLoad.innerText = index + 1 + "/" + dataCall.length;
    inputText.focus();
  });
};
