import api, { shortcutSettingData } from "../constant/api.js";
import { checkLocalStorageIsAvaiable } from "./localStorage.js";
import { getFetch } from "./fetchApi.js";
import { renderSettingAPI } from "./renderShortcut.js";
import { renderCurrentImgAndValue } from "./renderImgValue.js";

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
  const loading = $(".loading");

  // define constant
  let inputEdit = "";
  let codeKeyEdit = 0;
  let currentIndex = 0;
  let isEditShortCut = {
    isEdit: false,
    index: null,
  };
  let dataCallApi = [];
  let isModal = false;

  // btn next click
  btn_next.onclick = () => {
    if (currentIndex < dataCallApi.length - 1) {
      if (!inputText.value) {
        alert("please entered for input");
        return;
      }
      currentIndex++;

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
      renderCurrentImgAndValue(currentIndex);
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
    renderSettingAPI("Preferences", shortcutSettingData);
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

  // press keyboard
  document.onkeydown = (e) => {
    let codeNext = shortcutSettingData[2].items[0].keyCode;
    let codePre = shortcutSettingData[2].items[1].keyCode;
    let codeSubmit = shortcutSettingData[2].items[2].keyCode;

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
        dataCallApi[currentIndex].value = inputText.value;
        currentIndex++;
        renderCurrentImgAndValue(currentIndex, dataCallApi);
      }
      // shortcut previous press
      if (e.keyCode === codePre && e.altKey) {
        if (currentIndex < 1) {
          alert("cannot back ");
          inputText.focus();
          return;
        }
        dataCallApi[currentIndex].value = inputText.value;
        currentIndex--;
        renderCurrentImgAndValue(currentIndex, dataCallApi);
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
      if (isEditShortCut.isEdit) {
        inputEdit = e.key;
        codeKeyEdit = e.keyCode;
      }
    }
  };

  // handle modal

  const modal = $(".modal");
  const modal_sett = $(".modal_sett");
  const modal_sett__bar_contain = $(".modal_sett__bar_contain");
  const modal_sett__contr = $(".modal_sett__contr");

  modal_sett.onclick = (e) => {
    // select navbar setting
    if (e.target.closest(".bar_item")) {
      renderSettingAPI(e.target.closest(".bar_item").getAttribute("data-nav"), shortcutSettingData);
    }

    // btn close modal
    if (e.target.closest(".contr__item__heading_close")) {
      modal.classList.remove("show");
      isModal = false;
    }

    // click
    if (e.target.closest(".child__icon:not(.child__icon.save)")) {
      isEditShortCut.isEdit = true;
      inputEdit = "";

      $$(".child").forEach((e) => {
        e.classList.remove("edit");
      });

      $$(".child__icon").forEach((e) => {
        if (e.classList.contains("save")) {
          e.innerHTML = `<i class="fa-solid fa-pen"></i>`;
        }
      });

      $$(".child__icon").forEach((e) => {
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

    // save shortcut
    if (e.target.closest(".child.edit")) {
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
      shortcutSettingData[nav_shortcut_index].items[indexRemote].keyCodeName =
        "alt + " + inputEdit.toLowerCase();
      shortcutSettingData[nav_shortcut_index].items[indexRemote].keyCode =
        codeKeyEdit;

      console.log(inputEdit);
      renderSettingAPI(nav_shortcut_name, shortcutSettingData);

      inputEdit = "";
    }
  };

 /* const renderSetting = (nav_item = "Preferences") => {
    let bars = shortcutSettingData.map(
      (nav, i) =>
        `             
                <div class="bar_item ${
                  nav.name === nav_item ? `active` : ""
                }" data-nav=${nav.name} >
                    ${nav.name}   
                </div>           
            `
    );

    let controll_remote = shortcutSettingData.map(
      (item, ind) =>
        `   
                ${
                  item.name === nav_item
                    ? `                
                                <div class="contr__item" data-nav-shortcut-name=${
                                  item.name
                                } data-nav-shortcut-index=${ind}>
                                    <div class="contr__item__heading">
                                        ${item.name}   
                                        <div class="contr__item__heading_close">
                                            <i class="fa-sharp fa-solid fa-delete-left"></i>
                                        </div>
                                    </div>

                                    <p class="p"></p>
            
                                    <div class="contr__item_remote">
                                        <div class="remote__child">
                                            ${item.items.map(
                                              (e, i) =>
                                                `
                                                        <div class="child" data-index=${i}>
                                                            <div class="child__name">
                                                                ${e.name_item}                                                            </div>
                                                            <div class="child__shortcut_btns">
                                                                <div class = "shortcut_names">${e.keyCodeName} </div>                                               
                                                            </div>
                                                            <div class="child__icon">
                                                                <i class="fa-solid fa-pen"></i>
                                                            </div>
                                                        </div>
                                                    `
                                            )}
                                        </div>
                                    </div>
            
                                </div>
                        
                        `
                    : ""
                }
                
                
            `
    );
    modal_sett__bar_contain.innerHTML = bars.join("");
    modal_sett__contr.innerHTML = controll_remote.join("");
  };*/

  loading.innerText = "loading.....";

  getFetch().then((data) => {
    loading.innerText = "";
    container.classList.add("show");
    dataCallApi = data;
    renderCurrentImgAndValue(currentIndex, data);
    renderSettingAPI("Preferences", shortcutSettingData);
  });

});
