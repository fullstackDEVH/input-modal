const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const modal = $(".modal");
const modal_sett = $(".modal_sett");
const modal_sett__bar_contain = $(".modal_sett__bar_contain");
const modal_sett__contr = $(".modal_sett__contr");

modal_sett.onclick = (e) => {
  // select navbar setting
  if (e.target.closest(".bar_item")) {
    renderSettingAPI(
      e.target.closest(".bar_item").getAttribute("data-nav"),
      shortcutSettingData
    );
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
