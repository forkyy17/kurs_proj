// Функция для получения корзины из localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Функция для сохранения корзины в localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция для добавления билета в корзину
function addToCart(name, price) {
    const cart = getCart();
    
    // Проверяем, есть ли уже такой билет в корзине
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: parseInt(price),
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartDisplay();
}

// Функция для удаления билета из корзины
function removeFromCart(name) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.name !== name);
    saveCart(updatedCart);
    updateCartDisplay();
}

// Функция для изменения количества билетов
function updateQuantity(name, delta) {
    const cart = getCart();
    const item = cart.find(item => item.name === name);
    
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            saveCart(cart);
            updateCartDisplay();
        }
    }
}

// Функция для очистки корзины
function clearCart() {
    localStorage.removeItem('cart');
    updateCartDisplay();
}

// Функция для обновления отображения корзины
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.querySelector('.total-amount');
    
    if (!cartItems) return; // Если мы не на странице корзины
    
    const cart = getCart();
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Пусто</div>';
        totalAmount.textContent = '0р';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">${item.price}р</span>
                </div>
                <div class="item-controls">
                    <span class="quantity-value">${item.quantity}</span>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.name}')">✕</button>
                </div>
            </div>
        `;
    }).join('');
    
    totalAmount.textContent = total + 'р';
}

// Инициализация обработчика кнопки оформления заказа
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', clearCart);
    }
}); 