/*jslint browser */

// Базовые цены, надбавки применяются к стоимости одной услуги.
const prices = {
    types: {
        "1": 1000,
        "2": 10000,
        "3": 500
    },
    property: 1000
};

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const quantityInput = document.getElementById("quantity");
    const optionSelect = document.getElementById("option");
    const propertyCheckbox = document.getElementById("property");
    const optionBlock = document.getElementById("option-block");
    const propertyBlock = document.getElementById("property-block");
    const result = document.getElementById("result");
    const serviceRadios = document.querySelectorAll("input[name='service']");

    function getSelectedService() {
        const selectedRadio = document.querySelector(
            "input[name='service']:checked"
        );
        return selectedRadio ? selectedRadio.value : "1";
    }

    function updateResult() {
        const quantity = Number(quantityInput.value);

        if (!Number.isInteger(quantity) || quantity < 1) {
            result.textContent = "Введите целое количество от 1.";
            result.classList.add("error");
            return;
        }

        const service = getSelectedService();
        let unitPrice = prices.types[service];

        if (service === "2") {
            unitPrice += Number(optionSelect.value);
        } else if (service === "3" && propertyCheckbox.checked) {
            unitPrice += prices.property;
        }

        result.textContent = `Стоимость: ${(unitPrice * quantity).toLocaleString("ru-RU")} ₽`;
        result.classList.remove("error");
    }

    function updateFields() {
        const service = getSelectedService();
        optionBlock.hidden = service !== "2";
        propertyBlock.hidden = service !== "3";

        // Скрытая опция не должна влиять на итоговую цену.
        if (service !== "2") {
            optionSelect.selectedIndex = 0;
        }
        if (service !== "3") {
            propertyCheckbox.checked = false;
        }

        updateResult();
    }

    quantityInput.addEventListener("input", updateResult);
    optionSelect.addEventListener("change", updateResult);
    propertyCheckbox.addEventListener("change", updateResult);
    serviceRadios.forEach(function (radio) {
        radio.addEventListener("change", updateFields);
    });

    updateFields();
});
