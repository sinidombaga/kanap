
const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()


function getOrderId() { 
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const orderId = urlParams.get("orderId")
return orderId
}

function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

function removeAllCache() {
    localStorage.clear();
}

