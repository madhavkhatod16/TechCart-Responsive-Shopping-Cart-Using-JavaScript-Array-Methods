var productData = [
    [1, "Laptop", 55000, "https://picsum.photos/300/200?random=1"],
    [2, "Mobile", 25000, "https://picsum.photos/300/200?random=2"],
    [3, "Headphones", 2000, "https://picsum.photos/300/200?random=3"],
    [4, "Keyboard", 1500, "https://picsum.photos/300/200?random=4"],
    [5, "Mouse", 700, "https://picsum.photos/300/200?random=5"],
    [6, "Monitor", 12000, "https://picsum.photos/300/200?random=6"],
    [7, "Printer", 8000, "https://picsum.photos/300/200?random=7"],
    [8, "Smart Watch", 3500, "https://picsum.photos/300/200?random=8"],
    [9, "Tablet", 18000, "https://picsum.photos/300/200?random=9"],
    [10, "Camera", 45000, "https://picsum.photos/300/200?random=10"],

    [11, "Speaker", 3000, "https://picsum.photos/300/200?random=11"],
    [12, "Power Bank", 1200, "https://picsum.photos/300/200?random=12"],
    [13, "Charger", 600, "https://picsum.photos/300/200?random=13"],
    [14, "USB Cable", 250, "https://picsum.photos/300/200?random=14"],
    [15, "Pendrive", 900, "https://picsum.photos/300/200?random=15"],
    [16, "Hard Disk", 4500, "https://picsum.photos/300/200?random=16"],
    [17, "SSD", 5500, "https://picsum.photos/300/200?random=17"],
    [18, "Router", 2200, "https://picsum.photos/300/200?random=18"],
    [19, "Webcam", 2800, "https://picsum.photos/300/200?random=19"],
    [20, "Mic", 1700, "https://picsum.photos/300/200?random=20"],

    [21, "Gaming Chair", 15000, "https://picsum.photos/300/200?random=21"],
    [22, "Desk Lamp", 1100, "https://picsum.photos/300/200?random=22"],
    [23, "Backpack", 1800, "https://picsum.photos/300/200?random=23"],
    [24, "Tripod", 1400, "https://picsum.photos/300/200?random=24"],
    [25, "Earbuds", 2300, "https://picsum.photos/300/200?random=25"],
    [26, "VR Box", 5000, "https://picsum.photos/300/200?random=26"],
    [27, "Projector", 30000, "https://picsum.photos/300/200?random=27"],
    [28, "Cooling Pad", 1300, "https://picsum.photos/300/200?random=28"],
    [29, "Graphics Card", 65000, "https://picsum.photos/300/200?random=29"],
    [30, "RAM", 3500, "https://picsum.photos/300/200?random=30"]
];

var displayedProducts = [];
var cartItems = [];

function displayProducts(productList) {
    var productBox = document.getElementById("productBox");
    productBox.innerHTML = "";

    productList.forEach(function(product) {
        productBox.innerHTML += `
            <div class="col-md-4 col-sm-6">
                <div class="card">
                    <img src="${product[3]}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${product[1]}</h5>
                        <p class="price">₹${product[2]}</p>
                        <button class="btn btn-primary w-100" onclick="addToCart(${product[0]})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function shuffleProducts() {
    var copiedProducts = productData.slice();

    copiedProducts.sort(function() {
        return Math.random();
    });

    displayedProducts = copiedProducts.slice(0, 10);

    document.getElementById("filterOption").value = "";
    displayProducts(displayedProducts);
}

function applyFilter() {
    var selectedFilter = document.getElementById("filterOption").value;

    if (selectedFilter === "low") {
        displayedProducts.sort(function(firstProduct, secondProduct) {
            return firstProduct[2] - secondProduct[2];
        });
    }
    else if (selectedFilter === "high") {
        displayedProducts.sort(function(firstProduct, secondProduct) {
            return secondProduct[2] - firstProduct[2];
        });
    }
    else if (selectedFilter === "under5000") {
        displayedProducts = productData.filter(function(product) {
            return product[2] < 5000;
        });
    }
    else if (selectedFilter === "above10000") {
        displayedProducts = productData.filter(function(product) {
            return product[2] > 10000;
        });
    }
    else {
        shuffleProducts();
        return;
    }

    displayProducts(displayedProducts);
}

function addToCart(productId) {
    var selectedProduct = productData.find(function(product) {
        return product[0] === productId;
    });

    cartItems.push(selectedProduct);
    showCart();
}

function showCart() {
    var cartCount = document.getElementById("cartCount");
    var cartList = document.getElementById("cartList");
    var totalPrice = document.getElementById("totalPrice");

    cartCount.innerText = cartItems.length;
    cartList.innerHTML = "";

    var totalAmount = 0;

    cartItems.forEach(function(product) {
        totalAmount = totalAmount + product[2];

        cartList.innerHTML += `
            <li class="list-group-item">
                ${product[1]} - ₹${product[2]}
            </li>
        `;
    });

    totalPrice.innerText = totalAmount;
}

document.getElementById("filterOption").addEventListener("change", applyFilter);

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key.toLowerCase() === "r") {
        event.preventDefault();
        shuffleProducts();
    }
});

shuffleProducts();
