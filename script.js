let cart = [];

const addedToCartModal = document.getElementById('added-to-cart-modal');
const shoppingCartModal = document.getElementById('shopping-cart-modal');
const purchaseThanksModal = document.getElementById('purchase-thanks-modal');
const modalProductName = document.getElementById('modal-product-name');
const cartIconLink = document.getElementById('cart-icon-link');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');
const purchaseBtn = document.getElementById('purchase-btn');
const allCloseButtons = document.querySelectorAll('.modal-close-btn');

function addToCart(name, price) {
    const item = { name, price };
    cart.push(item);
    updateCartUI();
    openAddedToCartModal(name);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    cartCount.textContent = cart.length;
    cartItemsList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)} 
                <button class="remove-item-btn" onclick="removeFromCart(${index})">X</button></span>
            `;
            cartItemsList.appendChild(li);
        });
    }

    cartTotal.textContent = total.toFixed(2);
}

function handlePurchase() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    cart = [];
    updateCartUI();
    closeAllModals();
    purchaseThanksModal.style.display = 'flex';
}

function openAddedToCartModal(productName) {
    modalProductName.textContent = productName;
    addedToCartModal.style.display = 'flex';
}

function openCartModal() {
    updateCartUI();
    shoppingCartModal.style.display = 'flex';
}

function closeAllModals() {
    addedToCartModal.style.display = 'none';
    shoppingCartModal.style.display = 'none';
    purchaseThanksModal.style.display = 'none';
}

cartIconLink.addEventListener('click', openCartModal);
purchaseBtn.addEventListener('click', handlePurchase);

allCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal-id');
        document.getElementById(modalId).style.display = 'none';
    });
});

[addedToCartModal, shoppingCartModal, purchaseThanksModal].forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeAllModals();
        }
    });
});
