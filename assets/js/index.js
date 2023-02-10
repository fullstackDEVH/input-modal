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



    const img = $(".popup-left-img img");
    const numOfLoad = $(".numOfLoad");
    const inputText = $(".popup-right-input input");

    // constant
    let ctrlDown = false;
    let codeEnter = 13;
    let codePre = 90;
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


    btn_setting.onclick = (e) => {
        modal.classList.add("show")
        isModal = true;
        // render modal
        renderModal()   
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

        if(!isModal) {
            console.log("chưa modal");
                if( e.keyCode === codeEnter && currentIndex < api.length - 1 ) {
                    if( !inputText.value) {
                        alert('please entered ')
                        inputText.focus();
                        return;
                    }
                    api[currentIndex].value = inputText.value;
                    currentIndex++; 
                    render(currentIndex);
                }

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
                    console.log(e.code);

                }
            }

    
    };


    const modal = $(".modal");
    const modal_sett = $(".modal_sett");
    const modal_sett__bar_contain = $(".modal_sett__bar_contain");
    const modal_sett__contr = $(".modal_sett__contr");

    modal_sett.onclick = (e) => {

        if(e.target.closest(".bar_item")) {
            console.log(12345);
        }

        if(e.target.closest(".contr__item__heading_close")) {
            modal.classList.remove("show")
            isModal = false;
        }

        if(e.target.closest(".child__icon")) {
            isEditShortCut.isEdit = true;
            $$(".child").forEach((e)=> {
                e.classList.remove("edit")
            })
            e.target.closest(".child__icon").classList.add("save");
            e.target.closest(".child__icon").parentElement.classList.add("edit")
        }

        if(e.target.closest(".child__icon.save")){
            console.log('edit');
        }

        

        if(e.target.closest(".child__shortcut_btns input")){

        }
    };

    // render

    const renderModal = () => {
        let bars = bar.map((nav, i) => (
            `             
                <div class="bar_item">
                    ${nav.name}   
                </div>           
            `
        ))

        let controll_remote = bar.map((item, ind) => (
            `   
                ${
                    item.name === "Shortcut" ? (
                        `
                           
                                <div class="contr__item">
                                    <div class="contr__item__heading">
                                        ${item.name}   
                                        <div class="contr__item__heading_close">
                                            <i class="fa-sharp fa-solid fa-delete-left"></i>
                                        </div>
                                    </div>
            
                                    <div class="contr__item_remote">
                                        <div class="remote__child">
                                            ${
                                                item.items.map((e, i)=>(
                                                    `
                                                        <div class="child">
                                                            <div class="child__name">
                                                                ${e.name_item}
                                                            </div>
                                                            <div class="child__shortcut_btns">
                                                                ${e.keyCodeName} 
                                                                <input type="text" value=${
                                                                        e.keyCode.reduce((pre, next) => (
                                                                            `${pre + next}`
                                                                        ))
                                                                    }
                                                                    name = ${e.keyCodeName}
                                                                    size="10"
                                                                />
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
   
    render(currentIndex);
});


