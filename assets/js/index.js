import api, { shortcutSettingData } from "../constant/api.js";
import {
  checkLocalStorageIsAvaiable,
  name_setting,
  setCustomSettingLocalStorage,
} from "./localStorage.js";
import { getFetch } from "./fetchApi.js";
import { renderSettingAPI } from "./renderShortcut.js";
import { renderCurrentImgAndValue } from "./renderImgValue.js";

let url = "https://63ec999932a08117239df65b.mockapi.io/api/v1/imgs";
let url2 = "https://63ec999932a08117239df65b.mockapi.io/api/v1/imgage";

document.addEventListener("DOMContentLoaded", () => {
  // bind to document
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  // dom
  const container = $(".container");
  const btn_next = $("#btn-next");
  const btn_pre = $("#btn-previos");
  const btn_submit = $("#btn-submit");
  const btn_setting = $("#btn-setting");

  const inputText = $(".popup-right-input #text");
  const loading = $(".container-loader");

  // define constant
  let isFetch = false;

  let inputEdit = "";
  let codeKeyEdit = 0;
  let currentIndex = 0;
  let isEditShortCut = {
    isEdit: false,
    index: null,
  };
  let isModal = false;

  let dataCallApi = [];
  let dataSetting = [];

  // btn next click
  btn_next.onclick = () => {
    if (currentIndex < dataCallApi.length - 1) {
      if (!inputText.value) {
        alert("please entered for input");
        return;
      }
      currentIndex++;

      if (Math.floor(dataCallApi.length / 10) === currentIndex) {
        getFetch(url).then((data) => {
          dataCallApi = [...dataCallApi, ...data];
          renderCurrentImgAndValue(currentIndex, dataCallApi);
        });
      }

      if (currentIndex === 3) {
        dataCallApi = [...dataCallApi];
      }
      renderCurrentImgAndValue(currentIndex, dataCallApi);
    }
  };

  // btn previous click
  btn_pre.onclick = (e) => {
    if (currentIndex > 0) {
      currentIndex--;
      renderCurrentImgAndValue(currentIndex, dataCallApi);
    } else {
      alert("đây là vị trí đầu tiên! Cann't back.");
    }
  };

  // func submit
  const handleSubmit = () => {
    dataCallApi[currentIndex].value = inputText.value;
    console.log(dataCallApi);
  };

  // btn submit click
  btn_submit.onclick = (e) => {
    handleSubmit();
  };

  // btn setting click
  btn_setting.onclick = (e) => {
    modal.classList.add("show");
    isModal = true;
    // render modal
    dataSetting = checkLocalStorageIsAvaiable(name_setting);
    // console.log(dataSetting);
    renderSettingAPI("Shortcut", dataSetting);
  };

  inputText.oninput = (e) => {
    if (currentIndex < 0) {
      btn_pre.disabled = true;
    } else {
      btn_pre.disabled = false;
    }

    if (currentIndex === dataCallApi.length - 1 && e.target.value) {
      btn_submit.disabled = false;
    } else {
      btn_submit.disabled = true;
    }
  };

  const handleClickChangeImgAndValue = (indexValueChange) => {
    dataCallApi[currentIndex].value = inputText.value;
    currentIndex = +indexValueChange + currentIndex;
    renderCurrentImgAndValue(currentIndex, dataCallApi);
  };

  // press keyboard
  document.onkeydown = (e) => {
    let codeNext = dataSetting[2].items[0].keyCode;
    let codePre = dataSetting[2].items[1].keyCode;
    let codeSubmit = dataSetting[2].items[2].keyCode;

    // console.log("so sánh với key được lưu trong bars");
    if (!isModal) {
      // shortcut next press
      if (
        e.altKey &&
        e.keyCode === codeNext &&
        currentIndex < dataCallApi.length - 1
      ) {
        if (!inputText.value) {
          alert("please entered ");
          inputText.focus();
          return;
        }
        handleClickChangeImgAndValue(1);
      }
      // shortcut previous press
      if (e.keyCode === codePre && e.altKey) {
        if (currentIndex < 1) {
          alert("cannot back ");
          inputText.focus();
          return;
        }
        handleClickChangeImgAndValue(-1);
      }
      if (e.keyCode === codeSubmit && e.altKey) {
        dataCallApi[currentIndex].value = inputText.value;
        let check = false;

        // check then missing text value some where
        dataCallApi.forEach((item) => {
          if (item.value.length < 1) {
            check = true;
            return;
          }
        });

        if (check) {
          alert("missing text somewhere");
          inputText.focus();
          return;
        }

        if (currentIndex === dataCallApi.length - 1) {
          if (inputText.value.length < 1) {
            alert("missing text somewhere");
            inputText.focus();
            return;
          }
        }
        handleSubmit();
      }
    } else {
    }
  };
  // handle modal setting

  const modal = $(".modal");
  const modal_sett = $(".modal_sett");
  const modal_sett__bar_contain = $(".modal_sett__bar_contain");
  const modal_sett__contr = $(".modal_sett__contr");

  modal_sett.onclick = (e) => {
    // select navbar setting

    if (e.target.closest(".bar_item")) {
      renderSettingAPI(
        e.target.closest(".bar_item").getAttribute("data-nav"),
        dataSetting
      );
    }

    // btn close modal
    if (e.target.closest(".contr__item__heading_close")) {
      modal.classList.remove("show");
      isModal = false;
    }

    // click icon edit
    if (e.target.closest(".child__icon:not(.child__icon.save)")) {
      let indexSettingItem =
        $(".bar_item.active").getAttribute("data-nav-index");
      let indexParentNodeIconClick = e.target
        .closest(".child__icon:not(.child__icon.save)")
        .parentNode.getAttribute("data-index");

      // console.log( $$(`.input-${indexSettingItem}-${indexParentNodeIconClick}`));

      // handle subsetting input

      let inputtsss = $$(
        `.input-${indexSettingItem}-${indexParentNodeIconClick}`
      );

      inputtsss.forEach((input, possition) => {
        input.onclick = () => {
          input.onkeydown = (k) => {
            inputtsss[possition].value = k.key;
          };
        };
      });

      /*$$(`.input-${indexSettingItem}-${indexParentNodeIconClick}`)[0].onclick = (v) => {
        v.target.onkeydown = (k) => {
          console.log(k.key);
          v.target.value = k.key;
        }
        
      }*/

      isEditShortCut.isEdit = true;
      inputEdit = "";

      $$(".child").forEach((e) => {
        e.classList.remove("edit");
      });

      // $$(".child__icon").forEach((e) => {
      //   if (e.classList.contains("save")) {
      //     e.innerHTML = `<i class="fa-solid fa-pen"></i>`;
      //   }
      // });

      $$(".child__icon").forEach((e) => {
        if (e.classList.contains("save")) {
          e.innerHTML = `<i class="fa-solid fa-pen"></i>`;
        }
        e.classList.remove("save");
      });
      e.target.closest(".child__icon").parentElement.classList.add("edit");
      e.target.closest(".child__icon").classList.add("save");
      e.target.closest(
        ".child__icon"
      ).innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`;

      // chỉ nên lấy 2 key board
      inputEdit = "";
    }

    // click icon save
    if (e.target.closest(".child__icon.save")) {
      let nav_shortcut_name = $(".contr__item").getAttribute(
        "data-nav-shortcut-name"
      );
      let nav_shortcut_index = $(".contr__item").getAttribute(
        "data-nav-shortcut-index"
      );
      let indexRemote = e.target.closest(".child").getAttribute("data-index");

      if (inputEdit.length < 1) {
        renderSettingAPI(nav_shortcut_name, shortcutSettingData);
        return;
      }
      if (e.target.closest("#cars")) {
        console.log(e.target.closest("#cars").value);
      }
      // khi save nếu có hơn 2 ký tự thì dừng

      isEditShortCut.isEdit = false;
      dataSetting[nav_shortcut_index].items[indexRemote].keyCodeName =
        "alt + " + inputEdit.toLowerCase();
      dataSetting[nav_shortcut_index].items[indexRemote].keyCode = codeKeyEdit;

      let input_stress = $$(
        `.input-${indexSettingItem}-${indexParentNodeIconClick}`
      );

      dataSetting[nav_shortcut_index].items[indexRemote].keys[0] =
        input_stress[0].value;
      dataSetting[nav_shortcut_index].items[indexRemote].keys[1] =
        input_stress[1].value;

      setCustomSettingLocalStorage(name_setting, dataSetting);
      renderSettingAPI(nav_shortcut_name, dataSetting);

      inputEdit = "";
    }
  };

  // handle then call api
  loading.classList.add("show");

  getFetch("https://63ec999932a08117239df65b.mockapi.io/api/v1/imgs").then(
    (data) => {
      container.classList.add("show");
      loading.classList.remove("show");
      dataCallApi = data;
      renderSettingAPI("Preferences", dataSetting);
      renderCurrentImgAndValue(currentIndex, dataCallApi);
    }
  );

  dataSetting = checkLocalStorageIsAvaiable(name_setting);
});
