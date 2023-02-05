import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        price: 14,
        emoji: "🍕",
        uuid: '78c1e187-485c-43a8-b4e8-72f844e98ab5'
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        emoji: "🍔",
        uuid: 'd349a140-354a-4b65-882a-9bcdd4bbf757'
    },
        {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        emoji: "🍺",
        uuid: 'f71096f7-871a-4efc-8060-d42fc5d13e65'
    }
]

let orderArr = []
let sumOrderPrice = 0
const addedItemsList = document.getElementById('added-items-list')
const totalPriceEl = document.getElementById('total-price-el')
const checkOutContainerInner = document.getElementById('checkout-container-inner')
const cardDetailsModal = document.getElementById('card-details-modal')
const cardDetailsForm = document.getElementById('card-details-form')
const fullName = document.getElementById('fullName')

document.addEventListener('click', function(e){
    if(e.target.dataset.addItem) {
        handleAddItemBtn(e.target.dataset.addItem) 
    }

    else if(e.target.dataset.removeItemBtn) {   
        handleRemoveBtn(e.target.dataset.removeItemBtn)
        renderOrderItems()
    }

    else if(e.target.id === 'complete-order-btn') {
        showCardDetailsModal()
    }
})

// add order items and sum total price 
function handleAddItemBtn(menuItemId) {
    checkOutContainerInner.style.display = 'flex'
    
    const targetItemObj = menuArray.filter(function(item) {
        return item.uuid === menuItemId
    })[0]

    orderArr.push(
        {
            name: targetItemObj.name,
            ingredients: [targetItemObj.ingredients],
            price: targetItemObj.price,
            emoji: targetItemObj.emoji,
            uuid: uuidv4()
        }
    )

    sumOrderPrice += targetItemObj.price
    renderOrderItems()
}

// render added menu items  
function renderOrderItems() {
    let renderOrderStr = ' '
    orderArr.forEach(function(item) {  
        renderOrderStr += `
        <div class="added-item">    
            <div class="added-item-line">
                <h2 class="added-item-title">${item.name}</h2>
                <button class="remove-item-btn" id="remove-item-btn" data-remove-item-btn="${item.uuid}">remove</button>
            </div>
            <div>
                <p class="menu-item-price">$${item.price}</p>
            </div> 
        </div>  
        `    
        addedItemsList.innerHTML = renderOrderStr
        totalPriceEl.innerHTML = `$${sumOrderPrice}`
    })
}

// if remove button is clicked, remove item from orderlist
function handleRemoveBtn(menuItemId) {
    const targetRemoveObj = orderArr.filter(function(item){
        return item.uuid === menuItemId
    })[0]

    orderArr.splice(orderArr.indexOf(targetRemoveObj), 1)
    
    if(orderArr.length < 1) {
        checkOutContainerInner.style.display = 'none'
        sumOrderPrice = 0
    }
    else {
        sumOrderPrice -= targetRemoveObj.price       
    }   
}

// show modal to complete payment
function showCardDetailsModal() {
    cardDetailsModal.style.display = 'block'
    cardDetailsModal.style.filter = 'drop-shadow(-2px 4px 100px #000)'
}
 
// when pay btn is clicked hide modal & show thank you message
cardDetailsForm.addEventListener('submit', function(e) {
    e.preventDefault()
    cardDetailsModal.style.display = 'none' 
    checkOutContainerInner.innerHTML = `
        <p class="order-complete-message">Thanks ${fullName.value}! Your order is on its way!</p>
    `
})  

// render restaurant menu on start page 
function renderMenuItems() {
    let menuContainerStr = ''
    
    menuArray.forEach(function(menuItem) {
        menuContainerStr += `
            <div class="menu-item">    
                <p class="menu-icon">${menuItem.emoji}</p>    
                <div class="menu-item-container container">
                    <div>
                        <h2 class="menu-item-name">${menuItem.name}</h2>
                        <p class="menu-item-descr">${menuItem.ingredients}</p>
                        <h3 class="menu-item-price">$${menuItem.price}</h3>
                    </div>    
                    <button class="add-item-btn" data-add-item="${menuItem.uuid}">+</button>
                </div>      
            </div>  
        `   
    });

    document.getElementById('menu-container').innerHTML = menuContainerStr 
}

renderMenuItems()

/*  STRETCH GOALS
    Change the theme
    Offer a 'meal deal' discount
    Allow users to rate their experience
*/