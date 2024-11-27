SiteNameInput = document.getElementById("exampleInputSiteName");
SiteUrlInput = document.getElementById("exampleInputSiteUrl");
SubmitButton = document.getElementById("btn");
VisitedButton = document.getElementById("btn-visit");
DeletedButton = document.getElementById("btn-delete");
arrSiteList = [];

if (localStorage.getItem("SiteListeContainer")) {
    arrSiteList = JSON.parse(localStorage.getItem("SiteListeContainer"));
    displaySite();
}else{
    arrSiteList = [];
}


function addSite() {
if(validateSiteName() && validateUrl()){
    var SiteList = {
        name:SiteNameInput.value.trim(),
        url:SiteUrlInput.value.trim()
    };
    arrSiteList.push(SiteList);
    window.localStorage.setItem("SiteListeContainer",JSON.stringify(arrSiteList))
    displaySite();
    clearSite();
    clearValidationSign();
}else{
    var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
    clearSite();
    clearValidationSign();
}
}

function clearSite() {
    SiteNameInput.value = "";
    SiteUrlInput.value = "";
}


function displaySite() {
    var cartona = ``;
    for(var i = 0 ; i < arrSiteList.length ; i++){
        cartona += `<tr>
                    <th scope="row">${i+1}</th>
                    <td>${arrSiteList[i].name}</td>
                    <td>
                        <button class="btn btn-visit" data-index="0" id="btn-visit" onclick="visitSite('${arrSiteList[i].url}');">
                            <i class="fa-solid fa-eye pe-2"></i>Visit
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-delete" data-index="0" id="btn-delete" onclick="deleteSite(${i});">
                            <i class="fa-solid fa-trash-can pe-2"></i>Delete
                        </button>
                    </td>
                </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function deleteSite(index){
    arrSiteList.splice(index,1);
    window.localStorage.setItem("SiteListeContainer",JSON.stringify(arrSiteList))
    displaySite();
}

function visitSite(link){
    window.open(link, "_blank");
    window.localStorage.setItem("SiteListeContainer",JSON.stringify(arrSiteList))
    displaySite()
}


function validateUrl(){
    var text = SiteUrlInput.value;
    var regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/;
    if(regex.test(text) == true){
        SiteUrlInput.classList.add("is-valid");
        SiteUrlInput.classList.remove("is-invalid");
        document.getElementById("valid-feedback-url").classList.add("d-block");
        document.getElementById("invalid-feedback-url").classList.remove("d-block");
        return true;
    }else{
        SiteUrlInput.classList.add("is-invalid");
        SiteUrlInput.classList.remove("is-valid");
        document.getElementById("valid-feedback-url").classList.remove("d-block");
        document.getElementById("invalid-feedback-url").classList.add("d-block");
        return false;
    }
}

function validateSiteName(){
    var text = SiteNameInput.value;
    var regex = /^\w{3,}(\s+\w+)*$/;
    if(regex.test(text) == true){
        SiteNameInput.classList.add("is-valid");
        SiteNameInput.classList.remove("is-invalid");
        document.getElementById("valid-feedback-site-name").classList.add("d-block");
        document.getElementById("invalid-feedback-site-name").classList.remove("d-block");
        return true;
    }else{
        SiteNameInput.classList.add("is-invalid");
        SiteNameInput.classList.remove("is-valid");
        document.getElementById("valid-feedback-site-name").classList.remove("d-block");
        document.getElementById("invalid-feedback-site-name").classList.add("d-block");
        return false;
    }
}


function clearValidationSign(){
    SiteNameInput.classList.remove("is-valid");
    SiteUrlInput.classList.remove("is-valid");
    document.getElementById("valid-feedback-url").classList.remove("d-block");
    document.getElementById("valid-feedback-site-name").classList.remove("d-block");
}