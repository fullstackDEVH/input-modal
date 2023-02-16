const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const modal_sett__bar_contain = $(".modal_sett__bar_contain");
const modal_sett__contr = $(".modal_sett__contr");

export const renderSettingAPI = (
  nav_item = "Preferences",
  settingCustomApi
) => {  
  // có hai đối số cần truyền để 

  let nav_settings = settingCustomApi.map(
    (nav, i) =>
      `             
                <div class="bar_item ${
                  nav.name === nav_item ? `active` : ""
                }" data-nav=${nav.name} >
                    ${nav.name}   
                </div>           
            `
  );
  let sub_nav_setting = settingCustomApi.map(
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
  modal_sett__bar_contain.innerHTML = nav_settings.join("");
  modal_sett__contr.innerHTML = sub_nav_setting.join("");
};
