
    const renderSetting = (nav_item = "Device", settingCustomApi) => {
        let nav_setting = settingCustomApi.map((nav, i) => (
            `             
                <div class="bar_item ${nav.name === nav_item ? `active` : ""}" data-nav=${nav.name} >
                    ${nav.name}   
                </div>           
            `
        ))

        let controll_remote = nav_setting.map((item, ind) => (
            `   
                ${
                    item.name === nav_item ? (
                        `                
                                <div class="contr__item" data-nav-shortcut-name=${item.name} data-nav-shortcut-index=${ind}>
                                    <div class="contr__item__heading">
                                        ${item.name}   
                                        <div class="contr__item__heading_close">
                                            <i class="fa-sharp fa-solid fa-delete-left"></i>
                                        </div>
                                    </div>

                                    <p class="p"></p>
            
                                    <div class="contr__item_remote">
                                        <div class="remote__child">
                                            ${
                                                item.items.map((e, i)=>(
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
                                                ))
                                            }
                                        </div>
                                    </div>
            
                                </div>
                        
                        `
                    ) : ""
                }
                
                
            `
        ))
        modal_sett__bar_contain.innerHTML = bars.join("");
        modal_sett__contr.innerHTML = controll_remote.join("")
    };

