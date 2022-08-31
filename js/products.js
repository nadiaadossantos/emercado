let productsArray = [];

function showProductsList(array){
    let htmlContentToAppend = "";
    let catName = array.catName;
    
    document.getElementById("cat-title").innerHTML = `
        <div class="text-center p-4">
            <h2>Productos</h2>
            <p class="lead">Verás aquí todos los productos de la categoría ${catName}</p>
        </div>
    `

    let products = array.products;

    for(let i = 0; i < products.length; i++){
        let product = products[i];
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

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
});