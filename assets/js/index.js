
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

  let inputEdit = "";

  // define constant
  let currentIndex = 0;
  let isEditShortCut = {
    isEdit: false,
    index: null,
  };
  let isModal = false;

  // data image and value
  let dataCallApi = [];
  // data setting
  let dataSetting = [];


  const handleClickChangeImgAndValue = (indexValueChange) => {
    dataCallApi[currentIndex].value = inputText.value;

    currentIndex = +indexValueChange + currentIndex;
    renderCurrentImgAndValue(currentIndex, dataCallApi);
  };



  // btn next click
  btn_next.onclick = () => {
    if (currentIndex < dataCallApi.length - 1) {
      if (!inputText.value) {
        alert("please entered for input");
        return;
      }
 
      handleClickChangeImgAndValue(1);

      // push array when 60 90 percentay
      /*if (Math.floor(dataCallApi.length / 10) === currentIndex) {
        getFetch(url).then((data) => {
          dataCallApi = [...dataCallApi, ...data];
          renderCurrentImgAndValue(currentIndex, dataCallApi);
        });
      }*/
    }
  };

  // btn previous click
  btn_pre.onclick = (e) => {
    if (currentIndex > 0) {
      handleClickChangeImgAndValue(-1);
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

  let ondownCodes= [];

  const handleShortcut = (arrShortcutCodes, arrOnDownCodes) => {
    if(arrShortcutCodes[0] === arrOnDownCodes[ arrOnDownCodes.length - 2 ] && arrShortcutCodes[1] === arrOnDownCodes[ arrOnDownCodes.length - 1 ] ){
      console.log("match");

       // check nextCodes[1] empty


        /*if(nextCodes[1].length < 1) {
          // dùng 1 nút

        }*/
    }
  };
  
  // press keyboard
  document.onkeydown = (e) => {

    ondownCodes.push(e.keyCode);
    if (ondownCodes.length > 2) {
      ondownCodes.shift();
    }
    
    let t;
    clearTimeout(t);

    t = setTimeout(() => {
      ondownCodes = [];
    }, 1000);

    let nextCodes = [
      dataSetting[0].items[0].keysCode[0],
      dataSetting[0].items[0].keysCode[1],
    ];

    let preCodes = [
      dataSetting[0].items[1].keysCode[0],
      dataSetting[0].items[1].keysCode[1],
    ];

    if(!isModal) {
      // shortcut next
      // handleShortcut(dataSetting[0].items[0].keysCode, ondownCodes);
     
      if(+nextCodes[0] === ondownCodes[ ondownCodes.length -2 ] && +nextCodes[1] === ondownCodes[ ondownCodes.length - 1 ] ){
        if (!inputText.value) {
          alert("please entered ");
          inputText.focus();  
          return;
        }
        handleClickChangeImgAndValue(1);
      };

      // shortcut previous
      if (preCodes[0] === ondownCodes[0] && preCodes[1] === ondownCodes[1] ) {
        console.log("pre");
        if (currentIndex < 1) {
          alert("cannot back ");
          inputText.focus();
          return;
        }
        handleClickChangeImgAndValue(-1);
      };

    };

  /*  
     let codePre = dataSetting[2].items[1].keysCode;
    let codeSubmit = dataSetting[2].items[2].keysCode;

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
    }*/
 
  };


  // handle modal setting

  const modal = $(".modal");
  const modal_sett = $(".modal_sett");
  // const modal_sett__bar_contain = $(".modal_sett__bar_contain");
  // const modal_sett__contr = $(".modal_sett__contr");

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

    // click icon edit two input
    if (e.target.closest(".child__icon:not(.child__icon.save)")) {
      let indexSettingItem =
        $(".bar_item.active").getAttribute("data-nav-index");
      let indexParentNodeIconClick = e.target
        .closest(".child__icon:not(.child__icon.save)")
        .parentNode.getAttribute("data-index");

      let inputtsss = $$(
        `.input-${indexSettingItem}-${indexParentNodeIconClick}`
      );

      inputtsss.forEach((input, possition) => {
        input.classList.remove('active');

        input.onclick = () => {
          possition === 0 ? inputtsss[1].classList.remove('active') : inputtsss[0].classList.remove('active');
          inputtsss[possition].classList.add('active');

          // set value to input
          input.onkeydown = (k) => {
            let valueInput = k.key;
            let CodeInput = k.keyCode;

            if (k.keyCode === 17) {
              return alert("ctrl button should not be used as a shortcut !!")
            };

            if (k.keyCode === 32) {
              valueInput = "Space";
            };

            inputtsss[possition].value = valueInput;
            inputtsss[possition].setAttribute("data-input-code", CodeInput);
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

      // if (inputEdit.length < 1) {
      //   renderSettingAPI(nav_shortcut_name, shortcutSettingData);
      //   return;
      // }

      // if (e.target.closest("#cars")) {
      //   console.log(e.target.closest("#cars").value);
      // }
      // khi save nếu có hơn 2 ký tự thì dừng

      isEditShortCut.isEdit = false;
      // dataSetting[nav_shortcut_index].items[indexRemote].keyCodeName =
      //   "alt + " + inputEdit.toLowerCase();
      // dataSetting[nav_shortcut_index].items[indexRemote].keyCode = codeKeyEdit;

      let input_stress = $$(`.input-${nav_shortcut_index}-${indexRemote}`);

      // check input[0] 
        if(input_stress[0].value === "Backspace") {
          alert("first possition cannot be left blank!!")
          console.log(dataSetting[nav_shortcut_index].items[indexRemote].keysCode[0]);
          input_stress[0].value = dataSetting[nav_shortcut_index].items[indexRemote].keysCode[0];
          return;
        }

      // cannot using key ctrl for key[0]



      // code key down
      dataSetting[nav_shortcut_index].items[indexRemote].keys[0] =
        input_stress[0].value;

      dataSetting[nav_shortcut_index].items[indexRemote].keysCode[0] =
        input_stress[0].getAttribute("data-input-code");
      // value key down
      dataSetting[nav_shortcut_index].items[indexRemote].keys[1] =
        input_stress[1].value;

      dataSetting[nav_shortcut_index].items[indexRemote].keysCode[1] =
        input_stress[1].getAttribute("data-input-code");

      setCustomSettingLocalStorage(name_setting, dataSetting);
      renderSettingAPI(nav_shortcut_name, dataSetting);

      inputEdit = "";
    }
  };

  loading.classList.add("show");

  getFetch("https://63ec999932a08117239df65b.mockapi.io/api/v1/imgage").then(
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
