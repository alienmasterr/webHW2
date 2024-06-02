const addProductInput = document.querySelector('#addProductInput');
const addButton = document.querySelector('#addButton');
const productsOnTheList = document.querySelectorAll('.productNames')
const form = document.querySelector("form");
const leftProducts = document.querySelectorAll(".left");

let productsNum = 2;
addButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (productsNum >= 0) {
        const newProductName = addProductInput.value;

        const productToBuy = document.querySelector('.productToBuy' + (productsNum + 1));
        const insideSpan = productToBuy.querySelector('.insideSpan');
        const oldInsideText = insideSpan.textContent; // старий вміст внутрішнього span
        productToBuy.textContent = newProductName;
        productToBuy.appendChild(insideSpan); // Додаємо внутрішній span знову
        insideSpan.textContent = oldInsideText; // старий вміст внутрішнього span

        productsOnTheList[productsNum].textContent = newProductName;
        productsNum--;
        addProductInput.focus();
        form.reset();
    } else {
        alert("Четвертий товар додати не можна")
    }
});

const buttonsX = document.querySelectorAll('#buttonX');
buttonsX.forEach(button => {
    button.addEventListener('click', function () {
        deleteProduct(this);
    });
});
const deleteProduct = function (button) {
    const productDiv = button.closest('.productDiv'); // Find the closest parent div with class 'productDiv'
    const p = productDiv.querySelector('p');
    const buy = productDiv.querySelector('.toBuy');
    const centerContainer = productDiv.querySelector(".centerContainer");
    centerContainer.classList.add("noDisplay");
    const productToDeleteName = p.textContent;
    p.textContent = 'Відсутній';
    p.classList.remove("crossed");
    buy.classList.add("noDisplay");

    for (let left of leftProducts) {
        let textOfLeft = left.textContent;
        if (textOfLeft.includes(productToDeleteName)) {
            left.classList.add("noDisplayReal");
        }
    }
};

const buttons = document.querySelectorAll(".roundB");
buttons.forEach(button => {
    button.addEventListener('click', function () {
        adjustProductQty(this);
    });
});

const adjustProductQty = function (button) {
    const productDiv = button.closest('.productDiv');
    const qtySpan = productDiv.querySelector(".qty");
    const operation = button.dataset.operation;
    const minusButton = productDiv.querySelector("#buttonMinus");
    const p = productDiv.querySelector('p');

    let currentQty = parseInt(qtySpan.innerText);

    if (operation === "plus") {
        currentQty += 1;
        if (currentQty > 1) {
            minusButton.classList.remove("noDisplay");
        }
    } else if (operation === "minus") {
        currentQty -= 1;
        if (currentQty <= 1) {
            minusButton.classList.add("noDisplay");
        }
    }

    qtySpan.textContent = currentQty;

    const productToBuyName = p.textContent;
    const leftProducts = document.querySelectorAll(".left");
    const boughtProducts = document.querySelectorAll(".bought");
    for (let left of leftProducts) {
        let textOfLeft = left.textContent;
        if (textOfLeft.includes(productToBuyName)) {
            const spanInside = left.querySelector(".insideSpan");
            spanInside.textContent = currentQty.toString();
        }
    }
    
    for (let bought of boughtProducts) {
        let textOfBought = bought.textContent;
        if (textOfBought.includes(productToBuyName)) {
            const spanInside = bought.querySelector(".insideSpan");
            spanInside.textContent = currentQty.toString();
        }
    }

};

const toBuyButtons = document.querySelectorAll('.toBuy');
toBuyButtons.forEach(button => {
    button.addEventListener('click', function () {
        toggleProductState(this);
    });
});

const toggleProductState = function (button) {
    const productDiv = button.closest('.productDiv');
    const p = productDiv.querySelector('p');
    const centerContainer = productDiv.querySelector(".centerContainer");
    const localX = productDiv.querySelector("#buttonX");
    const qtySpan = productDiv.querySelector(".qty");
    const textContentOfSpanInside = qtySpan.textContent; // Отримуємо кількість з елемента кількості

    const productToBuyName = p.textContent;
    const boughtProductList = document.querySelector(".boughtProductList");
    const notBoughtProductList = document.querySelector(".notBoughtProductList");

    const leftProducts = document.querySelectorAll(".left");
    const boughtItems = boughtProductList.querySelectorAll(".bought");
    if (button.classList.contains('toBuy')) {
        // Зміна на куплений
        // const productToBuyName = p.textContent;
        p.classList.add("crossed");
        centerContainer.classList.add("noDisplay");
        localX.classList.add("noDisplay");
        button.classList.remove("toBuy");
        button.classList.add("makeNotBought");
        button.textContent = "Скасувати";

        
        for (let left of leftProducts) {
            for (let item of boughtItems) {
                let textOfLeft = left.textContent;
                let textOfBought = item.textContent;
                if (textOfLeft.includes(productToBuyName)) {
                    left.classList.add("noDisplayReal");
                }
                if (textOfBought.includes(productToBuyName)) {
                    item.classList.remove("noDisplayReal");
                }
            }
        }
        p.removeEventListener('click', editProductName); // Забороняємо редагування
    } else if (button.classList.contains('makeNotBought')) {
        // Зміна на некоплений
        p.classList.remove("crossed");
        centerContainer.classList.remove("noDisplay");
        localX.classList.remove("noDisplay");
        button.classList.remove("makeNotBought");
        button.classList.add("toBuy");
        button.textContent = "Придбати";

        for (let left of leftProducts) {
            for (let item of boughtItems) {
                let textOfLeft = left.textContent;
                let textOfBought = item.textContent;
                if (textOfLeft.includes(productToBuyName)) {
                    left.classList.remove("noDisplayReal");
                }
                if (textOfBought.includes(productToBuyName)) {
                    item.classList.add("noDisplayReal");
                }
            }
        }

        // for (let item of boughtItems) {
        //     let textOfBought = item.textContent;
        //     if (textOfBought.includes(productToBuyName)) {
        //         item.classList.add("noDisplayReal");
        //     }
        // }

        // const newHTML = `<span class="graySpan left">${productToBuyName}<span class="insideSpan">${textContentOfSpanInside}</span></span>`;
        // notBoughtProductList.insertAdjacentHTML('beforeend', newHTML);

        p.addEventListener('click', editProductName); // Дозволяємо редагування


    }
};


const productNames = document.querySelectorAll('.productNames');
productNames.forEach(name => {
    name.addEventListener('click', function () {
        editProductName(this);
    });
});

const editProductName = function (element) {
    if (element.classList.contains('crossed')) {
        return;
    }

    // element.textContent = '';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = element.textContent;
    input.className = 'editInput';
    element.replaceWith(input);
    input.focus();

    input.addEventListener('blur', function () {
        const newText = input.value.trim();
        if (newText) {
            element.textContent = newText;
        }
        input.replaceWith(element);
    });
};

/*
натискаємо *купити* -- зникає червона кнопка х, міняємо текст на Зробити не купленим + міняємо клас, назву товару перекреслююємо, прибираємо кнопки + -
*/
/*
натискаємо х -- зникає назва товару, кількість на 0
*/