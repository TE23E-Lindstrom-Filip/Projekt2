document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cart-button");
    const cartModal = document.getElementById("cart-modal");
    const closeCartButton = document.getElementById("close-cart");
    const cartItemsList = document.getElementById("cart-items");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const searchBar = document.querySelector(".search-bar");
    const products = document.querySelectorAll(".product");
    const notification = document.getElementById("notification");

    let cart = {};

    // 🔍 Sökfunktion för produkter
    searchBar.addEventListener("input", function () {
        const searchText = searchBar.value.toLowerCase();

        products.forEach(product => {
            const productName = product.getAttribute("data-name").toLowerCase(); // Hämta produktens namn från 'data-name'

            if (productName.includes(searchText)) {
                product.style.display = "block"; // Visa produkten om den matchar
            } else {
                product.style.display = "none"; // Dölj annars
            }
        });
    });

    // Öppna varukorgen
    cartButton.addEventListener("click", function () {
        cartModal.style.display = "flex";
        updateCartUI();
    });

    // Stäng varukorgen
    closeCartButton.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    // Lägg till i varukorgen
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = this.parentElement;
            const productName = product.getAttribute("data-name");
            const productPrice = parseFloat(product.getAttribute("data-price")); // Se till att priset är ett nummer

            if (cart[productName]) {
                cart[productName].quantity += 1;
            } else {
                cart[productName] = {
                    price: productPrice,
                    quantity: 1
                };
            }

            updateCartUI();
            showNotification(`${productName} har lagts till i varukorgen!`);
        });
    });

    // Funktion för att visa notis
    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = "block";
        notification.style.opacity = "1";


        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => {
                notification.style.display = "none";
            }, 500);
        }, 2000);
    }

    // Uppdatera varukorgens UI och räkna ut totalpris
    function updateCartUI() {
        cartItemsList.innerHTML = "";
        let totalPrice = 0; // Startvärde för totalt pris

        for (let item in cart) {
            let li = document.createElement("li");
            li.classList.add("cart-item");

            let text = document.createElement("span");

            let itemTotalPrice = cart[item].price * cart[item].quantity; // Beräkna totalpriset för produkten
            text.textContent = `${item} - ${cart[item].price} kr x${cart[item].quantity}`;

            totalPrice += itemTotalPrice; // Lägg till priset i totalsumman
            // Uppdatera totalpriset och visa det i varukorgen

            if (cart[item] == undefined) {
                PriceShow.innerHTML = 'Slut';
            }
            else {
                PriceShow = document.getElementById('Total-price');
                PriceShow.innerHTML = `Totalt: ${totalPrice} kr`;
            }

            let quantityControls = document.createElement("div");
            quantityControls.classList.add("quantity-controls");


            let minusButton = document.createElement("button");
            minusButton.textContent = "−";
            minusButton.classList.add("quantity-button");
            minusButton.addEventListener("click", function () {
                if (cart[item].quantity > 1) {
                    cart[item].quantity -= 1;
                } else {
                    delete cart[item];
                }
                updateCartUI();
            });

            let quantity = document.createElement("span");
            quantity.textContent = `x${cart[item].quantity}`;

            let plusButton = document.createElement("button");
            plusButton.textContent = "+";
            plusButton.classList.add("quantity-button");
            plusButton.addEventListener("click", function () {
                cart[item].quantity += 1;
                updateCartUI();
            });

            quantityControls.appendChild(minusButton);
            quantityControls.appendChild(quantity);
            quantityControls.appendChild(plusButton);

            li.appendChild(text);
            li.appendChild(quantityControls);
            cartItemsList.appendChild(li);
        }
    }

});