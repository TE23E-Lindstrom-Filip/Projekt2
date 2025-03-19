document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cart-button");
    const cartModal = document.getElementById("cart-modal");
    const closeCartButton = document.getElementById("close-cart");
    const searchBar = document.querySelector(".search-bar");
    const products = document.querySelectorAll(".product");

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

    

});