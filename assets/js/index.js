import api, {bar} from "../constant/api.js";
// import modal from "./modal.js";


document.addEventListener("DOMContentLoaded", () => {

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // dom
    const btn_next = $("#btn-next");
    const btn_pre = $("#btn_pre");
    const btn_submit = $("#btn-submit");
    const btn_setting = $("#btn-setting");

    let inputEdit = ""

    const img = $(".popup-left-img img");
    const numOfLoad = $(".numOfLoad");
    const inputText = $(".popup-right-input input");

    // constant
    
    let codeKeyEdit = 0;
    let currentIndex = 0;
    let isEditShortCut = {
        isEdit : false,
        index : null
    };

    let isModal = false;

    const render = (index) => {

        img.src= api[index].src;
        inputText.value = api[index].value;
        numOfLoad.innerText = index + 1 +"/10";
        inputText.focus();
    };

    btn_next.onclick  = () => {
        if(currentIndex < api.length - 1){
            if( !inputText.value) {
                alert('please entered for input')
                return;
            }
            currentIndex++;
            render(currentIndex);
        }
    };

    btn_pre.onclick = (e) => {
        if(currentIndex > 0){
            currentIndex--;
            render(currentIndex);
        }
    };

    btn_submit.onclick = (e) => {
        api[currentIndex].value = inputText.value
        console.log(api);
    };

    var a;
    btn_setting.onclick = (e) => {
        modal.classList.add("show")
        isModal = true;
        // render modal
        renderModal()   

        a = $$(".child__shortcut_btns input");

    };

    inputText.oninput = (e) => {
        if(currentIndex === api.length - 1 && e.target.value) {
            btn_submit.disabled  = false;
        }else {
            btn_submit.disabled  = true;
        }
    }

    // press keyboard
    
    document.onkeydown = (e) => {   
        let codeNext = bar[0].items[0].keyCode;
        let codePre = bar[0].items[1].keyCode;

        // console.log("so sánh với key được lưu trong bars");
        if(!isModal) {

            // click next
                if( e.altKey &&e.keyCode === codeNext && currentIndex < api.length - 1 ) {
                    if( !inputText.value) {
                        alert('please entered ')
                        inputText.focus();
                        return;
                    }
                    api[currentIndex].value = inputText.value;
                    currentIndex++; 
                    render(currentIndex);
                }
            // click previos

                if( e.keyCode === codePre && e.altKey ) {
                    if( currentIndex < 1 ) {
                        alert('cannot back ')
                        inputText.focus();
                        return;
                    }
                    api[currentIndex].value = inputText.value;
                    currentIndex--; 
                    render(currentIndex);
                }    
            }else {
                if(isEditShortCut.isEdit) {
                    inputEdit = e.key;
                    codeKeyEdit = e.keyCode;
                }
            }

    
    };


    const modal = $(".modal");
    const modal_sett = $(".modal_sett");
    const modal_sett__bar_contain = $(".modal_sett__bar_contain");
    const modal_sett__contr = $(".modal_sett__contr");

    modal_sett.onclick = (e) => {
        /*if(e.target.closest(".child__icon")) {
            
            e.target.closest(".child").onkeydown = (e) => {
                console.log(e);
            }
        }*/

        if(e.target.closest(".bar_item")) {
            renderModal(e.target.closest(".bar_item").getAttribute("data-nav"))
        }

        if(e.target.closest(".contr__item__heading_close")) {
            modal.classList.remove("show")
            isModal = false;
        }

        if(e.target.closest(".child__icon:not(.child__icon.save)")) {
            isEditShortCut.isEdit = true;
            inputEdit = "";

            $$(".child").forEach((e)=> {
                e.classList.remove("edit")
            })

            $$(".child__icon").forEach((e)=> {
                if(e.classList.contains(".child__icon.save")){
                    console.log("change icon");
                    e.innerHTML = `<i class="fa-sharp fa-solid fa-delete-left"></i>`
                }
                e.classList.remove("save")

            })
            e.target.closest(".child__icon").parentElement.classList.add("edit")
            e.target.closest(".child__icon").classList.add("save");
            e.target.closest(".child__icon").innerHTML =  `<i class="fa-solid fa-floppy-disk"></i>`;

            // chỉ nên lấy 2 key board
            inputEdit="";

        }
        if(e.target.closest(".child__icon.save")){
            let nav_shortcut_name = $(".contr__item").getAttribute("data-nav-shortcut-name");
            let nav_shortcut_index = $(".contr__item").getAttribute("data-nav-shortcut-index");
            let indexRemote = e.target.closest(".child").getAttribute("data-index");

            if(inputEdit.length <1 ) {
                renderModal(nav_shortcut_name);
                return
            };
            if(e.target.closest("#cars")) {
                console.log(e.target.closest("#cars").value);
            }
            // khi save nếu có hơn 2 ký tự thì dừng
           
            
            isEditShortCut.isEdit = false;
            bar[nav_shortcut_index].items[indexRemote].keyCodeName = "alt + " +  inputEdit;
            bar[nav_shortcut_index].items[indexRemote].keyCode = codeKeyEdit;


            console.log(inputEdit);
            renderModal(nav_shortcut_name);

            inputEdit="";
        }       

        
        if(e.target.closest(".child__shortcut_btns input")){
            e.target.closest(".child__shortcut_btns input").onkeydown = (e)=>{
               
                
                // inputEdit= e.key;
                
            }
        }
    };
    var c;
    // render

    const renderModal = (nav_item = "Shortcut") => {
        let bars = bar.map((nav, i) => (
            `             
                <div class="bar_item ${nav.name === nav_item ? `active` : ""}" data-nav=${nav.name} >
                    ${nav.name}   
                </div>           
            `
        ))

        let controll_remote = bar.map((item, ind) => (
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
                                                                ${e.name_item}
                                                            </div>
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
        c= $$(".child__shortcut_btns input")
    };
    renderModal()
    render(currentIndex);
});

