const userID = 25801;
let CART_URL = CART_INFO_URL + "/" + userID + EXT_TYPE;

let imgCamp = document.getElementById("image");
let nameCamp = document.getElementById("name");
let costCamp = document.getElementById("cost");
let countCamp = document.getElementById("count");
let subtotalCamp = document.getElementById("subtotal");

function addProduct(data) {
    const {
        articles: [{ name, count, unitCost, currency, image }],
    } = data;

    imgCamp.setAttribute("src", image);
    nameCamp.innerText = name;
    costCamp.innerText = currency + " " + unitCost;
    countCamp.value = count;
    subtotalCamp.innerText = currency + " " + unitCost;

    countCamp.addEventListener('input', () => {
        let cantidad = countCamp.value;
        let nuevoCosto = unitCost * cantidad;
        subtotalCamp.innerText = currency + " " + nuevoCosto;
    })
}

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(CART_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let userCart = resultObj.data;
            addProduct(userCart);
        }
    })
})