document.addEventListener("focusin", (event) => {
    chrome.storage.local.get(["key"], (result) => {
        const extensionState = result.key.extensionState;
        if (extensionState && (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA")) {
            addGenerateButton(event.target);
        }
    });
});

document.addEventListener("input", (event) => {
    removeGenerateButton(event.target);
});

document.addEventListener("focusout", (event) => {
    setTimeout(() => {
        if (!event.target.parentNode.contains(document.activeElement)) {
            removeGenerateButton(event.target);
        }
    }, 100);
});

function addGenerateButton(target) {
    let wrapper = target.parentNode;
    wrapper.style.position = "relative";

    let button = document.createElement("button");
    button.classList.add("generative-button");
    button.innerText = "📋";
    button.type = "button";

    wrapper.appendChild(button);

    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        showPopup(target, button);
    });
}

function removeGenerateButton(target) {
    let button = target.parentNode.querySelector(".generate-button");
    if (button) {
        button.remove();
    }
}

function showPopup(target, button) {
    let popup = document.createElement("div");
    popup.classList.add("popup-container");
    popup.style.position = "absolute";
    popup.style.top = `${button.getBoundingClientRect().bottom + window.scrollY}px`;
    popup.style.left = `${button.getBoundingClientRect().left}px`;
    popup.style.padding = "5px";
    popup.style.boxShadow = "0px 2px 5px rgba(0,0,0,0.2)";

    const options = [{
            type: "cpf",
            label: "CPF"
        },
        {
            type: "cnpj",
            label: "CNPJ"
        },
        {
            type: "phone",
            label: "Telefone"
        },
        {
            type: "email",
            label: "Email"
        }
    ];

    options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option.label;
        btn.style.display = "block";
        btn.style.width = "100%";
        btn.style.margin = "2px 0";
        btn.style.padding = "5px";
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "5px";
        btn.type = "button";

        btn.addEventListener("click", (event) => fillInput(event, target, option.type));
        popup.appendChild(btn);
    });

    document.body.appendChild(popup);

    document.addEventListener("click", (e) => {
        if (!popup.contains(e.target) && e.target !== button) {
            popup.remove();
        }
    }, {
        once: true
    });
}

function fillInput(event, target, type) {
    let value = generateFakeData(type);
    target.value = value;
    document.querySelectorAll(".popup-container").forEach(popup => popup.remove());
    event.stopPropagation();
}

function generateFakeData(type) {
    if (type === "cpf") return generateCpf();
    if (type === "cnpj") return generateCnpj();
    if (type === "phone") return generatePhoneNumber();
    if (type === "email") return generateEmail();
}