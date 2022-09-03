let productsArray = [];

function showTitle(array) {
    let catName = array.catName;

    document.getElementById("cat-title").innerHTML = `
        <div class="text-center p-4">
            <h2>Productos</h2>
            <p class="lead">Verás aquí todos los productos de la categoría ${catName}</p>
        </div>
    `;
}

function showProductsList(array) {
    let htmlContentToAppend = "";

    for (let product of array) {
        htmlContentToAppend += `
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                        <small class="text-muted">${product.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        `
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}


const catID = localStorage.getItem("catID"); //Pauta 2, obtener el listado de la categoría ingresada
let PRODUCT_URL = PRODUCTS_URL + "/" + catID + EXT_TYPE;

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let productsArray = resultObj.data;
            showTitle(productsArray);
            showProductsList(productsArray.products);
        }
    });
});

// Filtros

// Ordenar por precio ascendente y descentente 
// Ordenar por relevancia descendente en función de artículos vendidos
// Filtro a partir de rango de precio definido

const ORDER_ASC_BY_PRICE = "AscPrice";
const ORDER_DESC_BY_PRICE = "DesPrice";
const ORDER_BY_PROD_REL = "Rel.";
let minPrice = undefined;
let maxPrice = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_REL) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }

    return result;
}

document.addEventListener("DOMContentLoaded", () => {

    getJSONData(PRODUCT_URL).then(function (resultObj) {

        let productsArray = resultObj.data;
        let prodsArray = productsArray.products;

        document.getElementById("sortAsc").addEventListener("click", function () {
            sortProducts(ORDER_ASC_BY_PRICE, prodsArray);
            showProductsList(prodsArray);
        });

        document.getElementById("sortDesc").addEventListener("click", function () {
            sortProducts(ORDER_DESC_BY_PRICE, prodsArray);
            showProductsList(prodsArray);
        });

        document.getElementById("sortByRel").addEventListener("click", function () {
            sortProducts(ORDER_BY_PROD_REL, prodsArray);
            showProductsList(prodsArray);
        });

        document.getElementById("clearRangeFilter").addEventListener("click", function () {
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";

            minCount = undefined;
            maxCount = undefined;

            showProductsList(prodsArray);
        });

        document.getElementById("rangeFilterCount").addEventListener("click", function () {
            minPrice = document.getElementById("rangeFilterCountMin").value;
            maxPrice = document.getElementById("rangeFilterCountMax").value;

            let filteredArray = prodsArray.filter((value) =>
                (value.cost <= maxPrice) && (value.cost >= minPrice)
            )
            showProductsList(filteredArray);
        });
    });
})