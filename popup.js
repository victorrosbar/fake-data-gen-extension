

document.addEventListener("DOMContentLoaded", function () {
    loadSwitch();
    renderApplication();
    document.getElementById("activeSwitch").addEventListener("change", () => toggleActiveApplication());
    document.getElementById("cpf").addEventListener("click", () => copyToClipboard("cpf"));
    document.getElementById("cnpj").addEventListener("click", () => copyToClipboard("cnpj"));
    document.getElementById("phone").addEventListener("click", () => copyToClipboard("phone"));
    document.getElementById("email").addEventListener("click", () => copyToClipboard("email"));
});

function copyToClipboard(type) {
    let value = generateFakeData(type);
    navigator.clipboard.writeText(value).then(() => {
        let innerText = document.getElementById(type).innerText;
        document.getElementById(type).innerText = innerText + " ✅";
        setTimeout(() => {
            document.getElementById(type).innerText = innerText;
        }, 1000);
    }).catch(err => {
        console.error("Erro ao copiar:", err);
    });
}

function loadSwitch()
{
    var activeSwitch = document.getElementById("activeSwitch");
    chrome.storage.local.get(["key"], (result) => {
        const extensionState = result.key.extensionState;
        if(extensionState)
        {
            activeSwitch.checked = true;
        } else {
            activeSwitch.checked = false;
        }
    });
}

function renderApplication()
{
    var cpf = document.getElementById("cpf");
    var cnpj = document.getElementById("cnpj");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");

    chrome.storage.local.get(["key"], (result) => {
        const extensionState = result.key.extensionState;
        let displayStyle = extensionState ? "block" : "none";
        cpf.style.display = displayStyle;
        cnpj.style.display = displayStyle;
        phone.style.display = displayStyle;
        email.style.display = displayStyle;
    });

}

function toggleActiveApplication() {
    let activeSwitch = document.getElementById("activeSwitch");
    let newState = activeSwitch.checked;

    chrome.storage.local.set({ key: { extensionState: newState } }, () => {
        renderApplication();
    });
}

function generateFakeData(type) {
    if (type === "cpf") return generateCpf();
    if (type === "cnpj") return generateCnpj();
    if (type === "phone") return generatePhoneNumber();
    if (type === "email") return generateEmail();
}