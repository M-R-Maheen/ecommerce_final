 // Product search using search box

 $("#btnsearch").on('click', function () {
    alert('hello');
    var searchText = $("#searchinput").val();

    $("#product-grid").empty();
    var tx = db.transaction(["Details"], "readonly");
    var req = tx.objectStore("Details").openCursor();
    req.onsuccess = function (e) {
        var cursor = e.target.result;
        if (!cursor) return;
        if (cursor.value.ProductTitle.toLowerCase().includes(searchText.toLowerCase())) {
            $("#product-grid").append(

    `<div class="card-container">
        <div class="card">
            <img src="Images/${cursor.value.ProductImage}" alt="" />
        </div>
        <div class="card-info">
            <h3 class="product-title">${cursor.value.ProductName}</h3>
            <p class="product-price">TK.${cursor.value.Price}</p>
            <button class="add-to-cart" data-product-id="${cursor.key}">Add to cart</button>
        </div>
    </div >`
            );
        }
        cursor.continue();
    }
    req.onerror = function (err) {
        console.log(err);
    }

});

function loadProducts() {
    $("#product-grid").empty();
    var tx = db.transaction(["Details"], "readonly");
    var req = tx.objectStore("Details").openCursor();
    req.onsuccess = function (e) {
        var cursor = e.target.result;
        if (!cursor) return;
        $("#product-grid").append(

            `<div class="card-container" >
        <div class="card">
            <img src="Images/${cursor.value.ProductImage}" alt="" />
        </div>
        <div class="card-info">
            <h3 class="product-title">${cursor.value.ProductName}</h3>
            <p class="product-price">TK.${cursor.value.Price}</p>
            <button class="add-to-cart" data-product-id="${cursor.key}">Add to cart</button>
        </div>
    </div >`

        );
        cursor.continue();
    }
    req.onerror = function (err) {
        console.log(err);
    }
}
});

