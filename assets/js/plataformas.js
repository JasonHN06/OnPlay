let carProducts = []; // Arreglo para almacenar los productos
let tableP = document.getElementById("list-products"); // Tabla de productos
let tableDetailP = document.getElementById("detailProducts"); // Detalles de la compra

function main() {
    let titleP = document.getElementsByClassName("title-product");
    let descripP = document.getElementsByClassName("descrip-product");
    let btnP = document.getElementsByClassName("btn-producto"); // Botón para agregar productos
    let priceP = document.getElementsByClassName("price-product");
    let imgP = document.getElementsByClassName("img-product");
    let btnCarP = document.getElementById("car-products");

    for (let i = 0; i < btnP.length; i++) {
        btnP[i].onclick = function () {
            if (!validateExistProduct(titleP[i].textContent)) {
                let objt = {
                    img: imgP[i].src,
                    title: titleP[i].textContent,
                    descript: descripP[i].textContent,
                    price: Number(priceP[i].textContent),
                    count: 1, // Cantidad inicial
                };
                carProducts.push(objt);
            }
        };
    }

    btnCarP.onclick = function () {
        showProducts();
    };
}

function showProducts() {
    if (carProducts.length > 0) {
        validateCarProducts(false);
        let html = "";
        let subt = 0;
        for (let i = 0; i < carProducts.length; i++) {
            let item = carProducts[i];
            let subtotal = item.price * item.count;
            subt += subtotal;
            html += `
                <tr>
                    <td>${i + 1}</td>
                    <td><img class='img-list-products' src='${item.img}' alt='${item.title}'></td>
                    <td>${item.title}</td>
                    <td>L. ${item.price.toFixed(2)}</td>
                    <td>
                        <div class="domain-updown">
                            <button class="btn-up" onclick="updateCount(${i}, 'up')">▲</button>
                            <input type="text" readonly value="${item.count}">
                            <button class="btn-down" onclick="updateCount(${i}, 'down')">▼</button>
                        </div>
                    </td>
                    <td>L. ${subtotal.toFixed(2)}</td>
                    <td><button class='btn btn-danger btn-small' onclick='deleteProduct(${i})'>X</button></td>
                </tr>`;
        }
        tableP.innerHTML = html;
        showDetailProducts(subt);
    } else {
        validateCarProducts(true);
    }
}

function updateCount(index, action) {
    if (action === "up") {
        carProducts[index].count += 1; // Incrementa la cantidad
    } else if (action === "down" && carProducts[index].count > 1) {
        carProducts[index].count -= 1; // Decrementa la cantidad, pero no permite valores menores a 1
    }
    showProducts(); // Actualiza la tabla y los totales
}

function validateExistProduct(text) {
    let existFlag = false;
    for (let i = 0; i < carProducts.length; i++) {
        if (text === carProducts[i].title) {
            carProducts[i].count += 1;
            existFlag = true;
            showModalAddProduct();
        }
    }
    return existFlag;
}

function showDetailProducts(subtotal) {
    let html = "";
    let isv = subtotal * 0.15; // Impuesto
    let total = subtotal + isv; // Total
    html = `
        <tr><td>Subtotal:</td><td>L. ${subtotal.toFixed(2)}</td></tr>
        <tr><td>Impuesto:</td><td>L. ${isv.toFixed(2)}</td></tr>
        <tr><td>Total:</td><td>L. ${total.toFixed(2)}</td></tr>`;
    tableDetailP.innerHTML = html;
}

function deleteProduct(position) {
    carProducts.splice(position, 1); // Elimina el producto del arreglo
    showProducts(); // Actualiza la tabla
}

function validateCarProducts(flag) {
    let tablesHidden = document.querySelector(".validate-car");
    let messageValidate = document.querySelector(".validate-message");
    if (flag === true) {
        tablesHidden.setAttribute("hidden", true);
        messageValidate.removeAttribute("hidden");
    } else {
        tablesHidden.removeAttribute("hidden");
        messageValidate.setAttribute("hidden", true);
    }
}

function showModalAddProduct() {
    let modalConfirm = document.getElementById("add-product-confirm");
    let modalBootsConfirm = new bootstrap.Modal(modalConfirm);
    modalBootsConfirm.show();
}

main();