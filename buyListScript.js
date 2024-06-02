const addProductInput = document.querySelector('#addProductInput');
const addButton = document.querySelector('#addButton');
const productsOnTheList = document.querySelectorAll('.productNames')
const form = document.querySelector("form");
// const deleteProductButton1 = document.querySelector('.buttonX1');
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

// const buttons = document.querySelectorAll(".roundB");
// buttons.forEach(button => {
//     button.addEventListener('click', function () {
//         adjustProductQty(this);
//     });
// });

// const adjustProductQty = function (button) {
//     const productDiv = button.closest('.productDiv');
//     const qtySpan = productDiv.querySelector(".qty");
//     const operation = button.dataset.operation;
//     const minusButton = productDiv.querySelector("#buttonMinus");
//     const p = productDiv.querySelector('p');

//     // const centerContainer = productDiv.querySelector(".centerContainer");
//     // const spanInside = centerContainer.querySelector("span"); // або ".insideSpan", якщо клас вказаний у спані
//     // const textContentOfSpanInside = parseInt(spanInside.textContent);

//     let currentQty = parseInt(qtySpan.innerText);


//     if (operation === "plus") {
//         currentQty += 1;
//         if (currentQty > 1) {
//             minusButton.classList.remove("noDisplay")
//         }
//     } else if (operation === "minus") {
//         currentQty -= 1;
//         if (currentQty <= 1) {
//             minusButton.classList.add("noDisplay")
//         }
//     }

//     qtySpan.textContent = currentQty;
//     const productToBuyName = p.textContent;

//     for (let left of leftProducts) {
//         let textOfLeft = left.textContent;
//         if (textOfLeft.includes(productToBuyName)) {
//             //міняємо внутрішній спан
//             const spanInside = left.querySelector(".insideSpan");
//             spanInside.textContent = currentQty.toString();
//         }
//     }
// };

// const toBuyButtons = document.querySelectorAll('.toBuy');
// toBuyButtons.forEach(button => {
//     button.addEventListener('click', function () {
//         toggleProductState(this);
//     });
// });
// const toggleProductState = function (button) {
//     const productDiv = button.closest('.productDiv'); // Find the closest parent div with class 'productDiv'
//     const p = productDiv.querySelector('p');
//     const centerContainer = productDiv.querySelector(".centerContainer");
//     const localX = productDiv.querySelector("#buttonX");
//     const spanInside = centerContainer.querySelector("span"); // або ".insideSpan", якщо клас вказаний у спані
//     const textContentOfSpanInside = parseInt(spanInside.textContent);

//     if (button.classList.contains('toBuy')) {
//         // Change to bought
//         const productToBuyName = p.textContent;
//         p.classList.add("crossed");
//         centerContainer.classList.add("noDisplay");

//         localX.classList.add("noDisplay");
//         button.classList.remove("toBuy");
//         button.classList.add("makeNotBought");
//         button.textContent = "Скасувати";

//         for (let left of leftProducts) {
//             let textOfLeft = left.textContent;
//             if (textOfLeft.includes(productToBuyName)) {
//                 const boughtProductList = document.querySelector(".boughtProductList");
//                 const newHTML = `<span id="crossS" class="graySpan">${productToBuyName}<span id="lastSpan" class="insideSpan">${textContentOfSpanInside}</span></span>`;
//                 boughtProductList.insertAdjacentHTML('beforeend', newHTML);
//                 left.classList.add("noDisplayReal");
//             }
//         }
//         // Disable editing
//         p.removeEventListener('click', editProductName);
//     } else if (button.classList.contains('makeNotBought')) {
//         // Change to not bought
//         p.classList.remove("crossed");
//         centerContainer.classList.remove("noDisplay");
//         localX.classList.remove("noDisplay");
//         button.classList.remove("makeNotBought");
//         button.classList.add("toBuy");
//         button.textContent = "Придбати";

//         // Enable editing
//         p.addEventListener('click', editProductName);
//     }

// };

// Додаємо обробники подій до кнопок зміни кількості
const buttons = document.querySelectorAll(".roundB");
buttons.forEach(button => {
    button.addEventListener('click', function () {
        adjustProductQty(this);
    });
});

// Функція для зміни кількості товару
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

    // Оновлюємо кількість у відповідному елементі списку
    const productToBuyName = p.textContent;
    const leftProducts = document.querySelectorAll(".left");
    for (let left of leftProducts) {
        let textOfLeft = left.textContent;
        if (textOfLeft.includes(productToBuyName)) {
            const spanInside = left.querySelector(".insideSpan");
            spanInside.textContent = currentQty.toString();
        }
    }
};

// Додаємо обробники подій до кнопок зміни стану товару
const toBuyButtons = document.querySelectorAll('.toBuy');
toBuyButtons.forEach(button => {
    button.addEventListener('click', function () {
        toggleProductState(this);
    });
});

// Функція для зміни стану товару (куплений/некуплений)
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

    if (button.classList.contains('toBuy')) {
        // Зміна на куплений
        // const productToBuyName = p.textContent;
        p.classList.add("crossed");
        centerContainer.classList.add("noDisplay");
        localX.classList.add("noDisplay");
        button.classList.remove("toBuy");
        button.classList.add("makeNotBought");
        button.textContent = "Скасувати";

        const leftProducts = document.querySelectorAll(".left");
        for (let left of leftProducts) {
            let textOfLeft = left.textContent;
            if (textOfLeft.includes(productToBuyName)) {
                
                const boughtProductList = document.querySelector(".boughtProductList");
                const newHTML = `<span id="crossS" class="graySpan">${productToBuyName}<span id="lastSpan" class="insideSpan">${textContentOfSpanInside}</span></span>`;
                boughtProductList.insertAdjacentHTML('beforeend', newHTML);
                left.classList.add("noDisplayReal");
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

        // Знаходимо відповідний елемент у списку куплених продуктів та видаляємо його
        const boughtItems = boughtProductList.querySelectorAll(".graySpan");
        for (let item of boughtItems) {
            if (item.textContent.includes(productToBuyName)) {
                item.remove();
                break;
            }
        }

        // Додаємо елемент назад до списку продуктів, які потрібно купити
        const newHTML = `<span class="graySpan left">${productToBuyName}<span class="insideSpan">${textContentOfSpanInside}</span></span>`;
        notBoughtProductList.insertAdjacentHTML('beforeend', newHTML);
        
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