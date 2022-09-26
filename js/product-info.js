let prodDesc = [];

const prodID = localStorage.getItem("prodID");
let PROD_INFO_URL = PRODUCT_INFO_URL + prodID + EXT_TYPE;
let PROD_COMMENTS = PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE;

function showTitle(array) {
    let prodName = array.name;

    document.getElementById("prod-title").innerHTML = `
        <div class="p-4">
            <h3>${prodName}</h3>
            <hr>
        </div>
        `
}

function showInfoList(array) {
    let htmlContentToAppend = "";

    htmlContentToAppend += `
        <div class="col">
            <h6><b>Precio</b></h6>
            <p>${array.currency} ${array.cost}</p>
            <h6><b>Descripción</b></h6>
            <p>${array.description}</p>
            <h6><b>Categoría</b></h6>
            <p>${array.category}</p>
            <h6><b>Cantidad de vendidos</b></h6>
            <p>${array.soldCount}</p>
            <h6><b>Imágenes ilustrativas</b></h6>
        </div>
        `
    for (let image of array.images) {
        htmlContentToAppend += `
            <img src="${image}" class="img-thumbnail col-2">
        `
    }
    document.getElementById("info").innerHTML = htmlContentToAppend;
}

function showStars(score) {
    let checked = `<span class="fa fa-star checked"></span>`;
    let notChecked = `<span class="fa fa-star"></span>`;
    let stars = checked.repeat(score);
    if (score < 5) {
        stars += notChecked.repeat(5-score);
    }
    return stars;
}

function showComments(array) {
    let htmlContentToAppend = "";

    for (comment of array) {
        let score = comment.score
        htmlContentToAppend += `
        <div class="p">
            <div class="list-group-item">
                <div class="row">
                    <div class="d-flex w-100 justify-content-between">
                        <small class="mb-1"><b>${comment.user}</b> - ${comment.dateTime} - </small>
                        <div>
                        ${showStars(score)}
                        </div>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <small class="text-muted">${comment.description}</small>
                    </div>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById("comments").innerHTML = htmlContentToAppend;
}

//Entrega 4 - Productos relacionados

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showRelatedProducts(array) {
    let htmlContentToAppend = "";
    let relProds = array.relatedProducts;
    for (product of relProds) {
        htmlContentToAppend += `
        <div class="col-md-4">
            <div onclick="setProdID(${product.id})" class="card mb-4 custom-card cursor-active">
                <img class="bd-placeholder-img card-img-top" src="${product.image}">
                <h6>${product.name}</h6>
            </div>
        </div>
        `
    }
    document.getElementById("related").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PROD_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let infoArray = resultObj.data;
            showTitle(infoArray);
            showInfoList(infoArray);
            showRelatedProducts(infoArray);
        }
    });

    getJSONData(PROD_COMMENTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let commentsArray = resultObj.data;
            showComments(commentsArray);
        }
    });
});